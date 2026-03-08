
import { GeneratedImage, AspectRatioOption, ModelOption, GenerationChannel } from "../types";
import { generateUUID, getSystemPromptContent, FIXED_SYSTEM_PROMPT_SUFFIX, getVideoSettings, fetchBlob } from "./utils";
import { fetchCloudBlob } from "./storageService";
import { API_MODEL_MAP } from "../constants";
import { useAppStore } from "../store/appStore";

const ZIMAGE_TURBO_BASE_API_URL = "https://luca115-z-image-turbo.hf.space";
const ZIMAGE_TURBO_AZURE99_BASE_API_URL = "https://azure99-z-image-turbo.hf.space";
const ZIMAGE_MODEL_BASE_API_URL = "https://mrfakename-z-image.hf.space";
const QWEN_IMAGE_BASE_API_URL = "https://mcp-tools-qwen-image-fast.hf.space";
const OVIS_IMAGE_BASE_API_URL = "https://aidc-ai-ovis-image-7b.hf.space";
const FLUX_SCHNELL_BASE_API_URL = "https://black-forest-labs-flux-1-schnell.hf.space";
const UPSCALER_BASE_API_URL = "https://tuan2308-upscaler.hf.space";
const POLLINATIONS_API_URL = "https://text.pollinations.ai/openai";
const WAN2_VIDEO_API_URL = "https://fradeck619-wan2-2-fp8da-aoti-faster.hf.space";
export const QWEN_IMAGE_EDIT_BASE_API_URL = "https://linoyts-qwen-image-edit-2509-fast.hf.space";

const Z_IMAGE_NEGATIVE_PROMPT = "worst quality, low quality, JPEG compression artifacts, ugly, incomplete, extra fingers, poorly drawn hands, poorly drawn face, deformed, disfigured, malformed limbs, fused fingers, cluttered background, three legs";

// --- Token Management System (Refactored to Store) ---

const QUOTA_ERROR_KEY = "error_quota_exhausted";

type ZImageTurboChannelId = 'A' | 'B' | 'C';
export type ZImageTurboRouteStrategy = 'auto' | 'manual';
export type ZImageTurboManualChannel = ZImageTurboChannelId | GenerationChannel;

export interface ZImageTurboRoutingOptions {
  routeStrategy?: ZImageTurboRouteStrategy;
  manualChannel?: ZImageTurboManualChannel;
}

interface ZImageTurboChannel {
  id: ZImageTurboChannelId;
  baseUrl: string;
  priority: number;
}

const DEFAULT_ZIMAGE_TURBO_CHANNEL_C_BASE_API_URL = ZIMAGE_TURBO_BASE_API_URL;
const ZIMAGE_TURBO_ROUTE_STRATEGY_STORAGE_KEY = 'zimage_turbo_route_strategy';
const ZIMAGE_TURBO_MANUAL_CHANNEL_STORAGE_KEY = 'zimage_turbo_manual_channel';
const ZIMAGE_TURBO_CHANNEL_C_URL_STORAGE_KEY = 'zimage_turbo_channel_c_url';
const ZIMAGE_TURBO_CHANNEL_COOLDOWN_STORAGE_KEY = 'zimage_turbo_channel_cooldown_seconds';
const ZIMAGE_TURBO_COOLDOWN_MIN_SECONDS = 120;
const ZIMAGE_TURBO_COOLDOWN_MAX_SECONDS = 600;
const ZIMAGE_TURBO_COOLDOWN_DEFAULT_SECONDS = 300;

const zImageTurboChannelCooldownUntil: Partial<Record<ZImageTurboChannelId, number>> = {};

const getSafeLocalStorageValue = (key: string): string | null => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const getZImageTurboRouteStrategy = (): ZImageTurboRouteStrategy => {
  const value = getSafeLocalStorageValue(ZIMAGE_TURBO_ROUTE_STRATEGY_STORAGE_KEY)?.trim().toLowerCase();
  return value === 'manual' ? 'manual' : 'auto';
};

const getZImageTurboManualChannelId = (): ZImageTurboChannelId => {
  const value = getSafeLocalStorageValue(ZIMAGE_TURBO_MANUAL_CHANNEL_STORAGE_KEY)?.trim().toUpperCase();
  if (value === 'B' || value === 'C') return value;
  return 'A';
};

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const getZImageTurboCooldownSeconds = (): number => {
  const raw = getSafeLocalStorageValue(ZIMAGE_TURBO_CHANNEL_COOLDOWN_STORAGE_KEY);
  const parsed = raw === null ? NaN : Number(raw);
  if (!Number.isFinite(parsed)) return ZIMAGE_TURBO_COOLDOWN_DEFAULT_SECONDS;
  return clamp(Math.floor(parsed), ZIMAGE_TURBO_COOLDOWN_MIN_SECONDS, ZIMAGE_TURBO_COOLDOWN_MAX_SECONDS);
};

const resolveZImageTurboChannels = (): ZImageTurboChannel[] => {
  const channelCUrl = getSafeLocalStorageValue(ZIMAGE_TURBO_CHANNEL_C_URL_STORAGE_KEY)?.trim();
  const resolvedChannelCUrl = channelCUrl && /^https?:\/\//i.test(channelCUrl)
    ? channelCUrl
    : DEFAULT_ZIMAGE_TURBO_CHANNEL_C_BASE_API_URL;

  return [
    { id: 'A', baseUrl: ZIMAGE_TURBO_BASE_API_URL, priority: 1 },
    { id: 'B', baseUrl: ZIMAGE_TURBO_AZURE99_BASE_API_URL, priority: 2 },
    { id: 'C', baseUrl: resolvedChannelCUrl, priority: 3 }
  ];
};

const isZImageTurboChannelCoolingDown = (channelId: ZImageTurboChannelId): boolean =>
  (zImageTurboChannelCooldownUntil[channelId] || 0) > Date.now();

const markZImageTurboChannelCooldown = (channelId: ZImageTurboChannelId) => {
  const cooldownMs = getZImageTurboCooldownSeconds() * 1000;
  zImageTurboChannelCooldownUntil[channelId] = Date.now() + cooldownMs;
};

const getZImageTurboCandidateChannels = (
  channels: ZImageTurboChannel[],
  routeStrategy: ZImageTurboRouteStrategy,
  manualChannelId: ZImageTurboChannelId
): ZImageTurboChannel[] => {
  if (routeStrategy === 'manual') {
    const manualChannel = channels.find(channel => channel.id === manualChannelId);
    return manualChannel ? [manualChannel] : [channels[0]];
  }

  const ordered = [...channels].sort((a, b) => a.priority - b.priority);
  const nonCooling = ordered.filter(channel => !isZImageTurboChannelCoolingDown(channel.id));

  // Fail-open: if all channels are cooling down, try ordered list to avoid hard block.
  return nonCooling.length > 0 ? nonCooling : ordered;
};

const extractErrorStatusCode = (error: any): number | null => {
  if (typeof error?.status === 'number' && Number.isFinite(error.status)) {
    return error.status;
  }

  const message = typeof error?.message === 'string' ? error.message : '';
  const explicitStatusMatch = message.match(/(?:Gradio\s+(?:Join|SSE)\s+Error:\s*)(\d{3})/i);
  if (explicitStatusMatch) {
    return Number(explicitStatusMatch[1]);
  }

  const genericStatusMatch = message.match(/\bstatus(?:\s*code)?\s*[:=]?\s*(\d{3})\b/i);
  if (genericStatusMatch) {
    return Number(genericStatusMatch[1]);
  }

  return null;
};

const isRetryableZImageTurboChannelError = (error: any): boolean => {
  if (!error) return false;
  if (error.name === 'AbortError') return false;

  const message = typeof error.message === 'string' ? error.message : '';
  const lower = message.toLowerCase();
  const statusCode = extractErrorStatusCode(error);

  const isQuotaError =
    error.message === QUOTA_ERROR_KEY ||
    error.status === 429 ||
    lower.includes('429') ||
    lower.includes('quota');

  const isServerError = statusCode !== null && statusCode >= 500 && statusCode < 600;
  const isNetworkError =
    lower.includes('failed to fetch') ||
    lower.includes('fetch failed') ||
    lower.includes('networkerror') ||
    lower.includes('network request failed') ||
    lower.includes('load failed');

  return isQuotaError || isServerError || isNetworkError;
};

const getNextAvailableToken = (): string | null => {
  const store = useAppStore.getState();
  // Ensure we are using today's status
  store.resetDailyStatus('huggingface');
  
  const tokens = store.tokens.huggingface || [];
  const status = store.tokenStatus.huggingface;
  
  // Return the first token that is NOT marked as exhausted
  return tokens.find(t => !status.exhausted[t]) || null;
};

const markTokenExhausted = (token: string) => {
  useAppStore.getState().markTokenExhausted('huggingface', token);
};

// --- API Execution Wrapper ---

const runWithTokenRetry = async <T>(operation: (token: string | null) => Promise<T>): Promise<T> => {
  const tokens = useAppStore.getState().tokens.huggingface || [];

  // If no tokens configured, run once with no token (public quota)
  if (tokens.length === 0) {
    return operation(null);
  }

  let lastError: any;
  let attempts = 0;
  // Limit loops to number of tokens
  const maxAttempts = tokens.length + 1;

  while (attempts < maxAttempts) {
    attempts++;
    const token = getNextAvailableToken();

    // If we have tokens configured but all are exhausted
    if (!token) {
      throw new Error(QUOTA_ERROR_KEY);
    }

    try {
      return await operation(token);
    } catch (error: any) {
      lastError = error;

      // Don't retry if aborted by user
      if (error.name === 'AbortError') {
        throw error;
      }

      const isQuotaError =
        error.message === QUOTA_ERROR_KEY ||
        error.message?.includes("429") ||
        error.status === 429 ||
        error.message?.includes("You have exceeded your free GPU quota");

      if (isQuotaError && token) {
        console.warn(`Token ${token.substring(0, 8)}... exhausted. Switching to next token.`);
        markTokenExhausted(token);
        continue; // Retry loop with next token
      }

      // If it's not a quota error, or we are not using a token, rethrow immediately
      throw error;
    }
  }

  throw lastError || new Error("error_api_connection");
};

// --- Gradio File Upload Helper ---

export const uploadToGradio = async (baseUrl: string, image: string | Blob, token: string | null, signal?: AbortSignal): Promise<string> => {
    const formData = new FormData();
    formData.append('files', image);
    
    const headers: Record<string, string> = {};
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${baseUrl}/gradio_api/upload`, {
        method: 'POST',
        headers,
        body: formData,
        signal
    });

    if (!response.ok) {
        throw new Error(`Failed to upload image to Gradio: ${response.statusText}`);
    }

    const result = await response.json();
    if (!result || !result[0]) {
        throw new Error('Invalid upload response from Gradio');
    }

    return result[0]; // Returns the filename/path relative to the Gradio space
};

// --- Gradio Queue Helper (New Logic) ---

interface GradioPayload {
    data: any[];
    fn_index: number;
    trigger_id: number;
    session_hash: string;
    event_data: null;
}

export type GradioStreamMessageType = 'progress' | 'heartbeat' | 'process_completed' | 'close_stream';

export interface GradioProgressEvent {
    type: GradioStreamMessageType;
    index: number | null;
    length: number | null;
    percent: number | null;
    desc: string | null;
    success: boolean | null;
    raw: any;
}

const toFiniteNumber = (value: unknown): number | null => {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string') {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) return parsed;
    }
    return null;
};

const parseProgressEvent = (msg: any): GradioProgressEvent | null => {
    const msgType = msg?.msg as GradioStreamMessageType | undefined;
    if (!msgType || !['progress', 'heartbeat', 'process_completed', 'close_stream'].includes(msgType)) {
        return null;
    }

    const firstProgress = Array.isArray(msg?.progress_data) && msg.progress_data.length > 0
        ? msg.progress_data[0]
        : null;
    const index = toFiniteNumber(firstProgress?.index);
    const length = toFiniteNumber(firstProgress?.length);
    const desc = typeof firstProgress?.desc === 'string' && firstProgress.desc.length > 0
        ? firstProgress.desc
        : null;

    let percent: number | null = null;
    if (index !== null && length !== null && length > 0) {
        const rawPercent = (index / length) * 100;
        percent = Math.max(0, Math.min(100, Math.round(rawPercent)));
    } else if (msgType === 'process_completed' && msg?.success) {
        percent = 100;
    }

    return {
        type: msgType,
        index,
        length,
        percent,
        desc,
        success: typeof msg?.success === 'boolean' ? msg.success : null,
        raw: msg
    };
};

export const parseGradioProgressMessage = (msg: any): GradioProgressEvent | null => parseProgressEvent(msg);

const extractSSEDataBlocks = (buffer: string): { blocks: string[], rest: string } => {
    const parts = buffer.split(/\r?\n\r?\n/);
    if (parts.length <= 1) {
        return { blocks: [], rest: buffer };
    }
    return {
        blocks: parts.slice(0, -1),
        rest: parts[parts.length - 1]
    };
};

const extractEventDataFromBlock = (block: string): string | null => {
    const lines = block.split(/\r?\n/);
    const dataLines: string[] = [];
    for (const rawLine of lines) {
        const line = rawLine.trimEnd();
        if (line.startsWith('data:')) {
            dataLines.push(line.slice(5).trimStart());
        }
    }
    if (dataLines.length === 0) return null;
    return dataLines.join('\n').trim();
};

const runGradioTask = async <T>(
    baseUrl: string,
    data: any[],
    fn_index: number,
    trigger_id: number,
    token: string | null,
    signal?: AbortSignal,
    onProgress?: (event: GradioProgressEvent) => void
): Promise<T> => {
    const session_hash = Date.now().toString(16);
    
    // 1. Join Queue
    const payload: GradioPayload = {
        data,
        fn_index,
        trigger_id,
        session_hash,
        event_data: null
    };

    const joinResponse = await fetch(`${baseUrl}/gradio_api/queue/join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload),
        signal
    });

    if (!joinResponse.ok) {
        // Handle 429 or other errors as quota exhausted if applicable
        if (joinResponse.status === 429) throw new Error(QUOTA_ERROR_KEY);
        throw new Error(`Gradio Join Error: ${joinResponse.status}`);
    }

    // 2. Listen for Result via SSE
    const sseResponse = await fetch(`${baseUrl}/gradio_api/queue/data?session_hash=${session_hash}`, {
        headers: {
            'Accept': 'text/event-stream',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        signal
    });

    if (!sseResponse.ok) {
        if (sseResponse.status === 429) throw new Error(QUOTA_ERROR_KEY);
        throw new Error(`Gradio SSE Error: ${sseResponse.status}`);
    }

    const reader = sseResponse.body?.getReader();
    if (!reader) throw new Error("No response body from Gradio stream");

    const decoder = new TextDecoder();
    let buffer = '';
    let lastProgressSignature = '';

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            const { blocks, rest } = extractSSEDataBlocks(buffer);
            buffer = rest; // Keep partial block for next chunk

            for (const block of blocks) {
                const jsonStr = extractEventDataFromBlock(block);
                if (!jsonStr || jsonStr === '[DONE]') continue;

                try {
                    const msg = JSON.parse(jsonStr);
                    const progressEvent = parseProgressEvent(msg);
                    if (progressEvent && onProgress) {
                        if (progressEvent.type === 'progress') {
                            const signature = `${progressEvent.index ?? ''}:${progressEvent.length ?? ''}:${progressEvent.desc ?? ''}:${progressEvent.percent ?? ''}`;
                            if (signature !== lastProgressSignature) {
                                lastProgressSignature = signature;
                                onProgress(progressEvent);
                            }
                        } else {
                            onProgress(progressEvent);
                        }
                    }
                    
                    if (msg.msg === 'process_completed') {
                        if (msg.success) {
                            return msg.output as T;
                        } else {
                            // Enhanced Error Handling based on HF Data Structure
                            const output = msg.output || {};
                            // HF typical error detail key is " ", or "error"
                            const detail = output[" "] || output.error || "";
                            const title = msg.title || output.title || 'Gradio task process failed';
                            
                            const fullMessage = detail ? `${title}: ${detail}` : title;

                            // Check if this is a quota error to trigger token rotation
                            if (fullMessage.includes("You have exceeded your free GPU quota")) {
                                throw new Error(QUOTA_ERROR_KEY);
                            }
                            
                            throw new Error(fullMessage);
                        }
                    }
                    
                    if (msg.msg === 'close_stream') {
                        // Stream closed, loop will terminate naturally or we throw if no result found
                    }
                } catch (e) {
                    // If it's our own error or the quota key, rethrow to be caught by runWithTokenRetry
                    if (e instanceof Error && (e.message === QUOTA_ERROR_KEY || e.message.includes(':') || e.message.includes('failed'))) {
                        throw e;
                    }
                    // Otherwise ignore parse errors or irrelevant messages
                }
            }
        }
    } finally {
        reader.releaseLock();
    }

    throw new Error("Gradio stream closed without result");
};

// --- Service Logic ---

const getBaseDimensions = (ratio: AspectRatioOption) => {
  switch (ratio) {
    case "16:9": return { width: 1024, height: 576 };
    case "4:3": return { width: 1024, height: 768 };
    case "3:2": return { width: 960, height: 640 };
    case "9:16": return { width: 576, height: 1024 };
    case "3:4": return { width: 768, height: 1024 };
    case "2:3": return { width: 640, height: 960 };
    case "1:1": default: return { width: 1024, height: 1024 };
  }
}

const getDimensions = (ratio: AspectRatioOption, enableHD: boolean): { width: number; height: number } => {
  const base = getBaseDimensions(ratio);

  if (enableHD) {
    // Both Z-Image Turbo and Flux models use 2x multiplier for HD
    return {
      width: Math.round(base.width * 2),
      height: Math.round(base.height * 2)
    };
  }

  return base;
}

const generateZImageModel = async (
  prompt: string,
  aspectRatio: AspectRatioOption,
  seed: number = Math.round(Math.random() * 2147483647),
  steps: number = 30,
  guidanceScale: number = 4,
  enableHD: boolean = false,
  resolution?: { width: number; height: number },
  onProgress?: (event: GradioProgressEvent) => void
): Promise<GeneratedImage> => {
  const { width, height } = resolution || getDimensions(aspectRatio, false);

  return runWithTokenRetry(async (token) => {
    try {
      const output: any = await runGradioTask(
          ZIMAGE_MODEL_BASE_API_URL,
          [
            prompt,
            Z_IMAGE_NEGATIVE_PROMPT,
            height,
            width,
            steps,
            guidanceScale,
            seed,
            false
          ],
          2, // fn_index
          18, // trigger_id
          token,
          undefined,
          onProgress
      );

      const data = output.data;
      if (!data || !data[0] || !data[0].url) throw new Error("error_invalid_response");

      return {
        id: generateUUID(),
        url: data[0].url,
        model: 'z-image',
        prompt,
        aspectRatio,
        timestamp: Date.now(),
        seed,
        steps,
        guidanceScale
      };
    } catch (error) {
      console.error("Z-Image Generation Error:", error);
      throw error;
    }
  });
};

const generateZImage = async (
  prompt: string,
  aspectRatio: AspectRatioOption,
  seed: number = Math.round(Math.random() * 2147483647),
  enableHD: boolean = false,
  steps: number = 9,
  resolution?: { width: number; height: number },
  onProgress?: (event: GradioProgressEvent) => void,
  routing?: ZImageTurboRoutingOptions
): Promise<GeneratedImage> => {
  const { width, height } = resolution || getDimensions(aspectRatio, enableHD);
  const strategy: ZImageTurboRouteStrategy = routing?.routeStrategy || getZImageTurboRouteStrategy();
  const manualChannelInput = routing?.manualChannel;
  const manualChannelIdFromInput: ZImageTurboChannelId | null =
    manualChannelInput === 'B' || manualChannelInput === 'C'
      ? manualChannelInput
      : manualChannelInput === 'A' || manualChannelInput === 'public'
        ? 'A'
        : manualChannelInput === 'hf_token'
          ? 'B'
          : null;
  const manualChannelId = manualChannelIdFromInput || getZImageTurboManualChannelId();

  return runWithTokenRetry(async (token) => {
    const channels = getZImageTurboCandidateChannels(
      resolveZImageTurboChannels(),
      strategy,
      manualChannelId
    );

    let lastError: any = null;

    for (const channel of channels) {
      try {
        const output: any = await runGradioTask(
          channel.baseUrl,
          [prompt, height, width, steps, seed, false],
          1, // fn_index
          16, // trigger_id
          token,
          undefined,
          onProgress
        );

        const data = output?.data;
        if (!data || !data[0] || !data[0].url) throw new Error("error_invalid_response");

        return {
          id: generateUUID(),
          url: data[0].url,
          model: 'z-image-turbo',
          prompt,
          aspectRatio,
          timestamp: Date.now(),
          seed,
          steps
        };
      } catch (error) {
        lastError = error;
        if (strategy === 'auto' && isRetryableZImageTurboChannelError(error)) {
          markZImageTurboChannelCooldown(channel.id);
          console.warn(
            `[z-image-turbo][channel-${channel.id}] failed; cooling down ${getZImageTurboCooldownSeconds()}s and switching.`,
            error
          );
          continue;
        }

        console.error(`Z-Image Turbo Generation Error (channel-${channel.id}):`, error);
        throw error;
      }
    }

    throw lastError || new Error("error_api_connection");
  });
};

const generateFluxSchnellImage = async (
  prompt: string,
  aspectRatio: AspectRatioOption,
  seed: number = Math.round(Math.random() * 2147483647),
  enableHD: boolean = false,
  steps: number = 4,
  resolution?: { width: number; height: number },
  onProgress?: (event: GradioProgressEvent) => void
): Promise<GeneratedImage> => {
  let { width, height } = resolution || getDimensions(aspectRatio, enableHD);

  return runWithTokenRetry(async (token) => {
    try {
      // Data: ["Prompt", Seed, Randomize seed (false), Width, Height, steps]
      const output: any = await runGradioTask(
          FLUX_SCHNELL_BASE_API_URL,
          [prompt, seed, false, width, height, steps],
          2, // fn_index
          5, // trigger_id
          token,
          undefined,
          onProgress
      );

      const data = output.data;
      if (!data || !data[0] || !data[0].url) throw new Error("error_invalid_response");

      return {
        id: generateUUID(),
        url: data[0].url,
        model: 'flux-1-schnell',
        prompt,
        aspectRatio,
        timestamp: Date.now(),
        seed,
        steps
      };
    } catch (error) {
      console.error("Flux Schnell Generation Error:", error);
      throw error;
    }
  });
};

const generateQwenImage = async (
  prompt: string,
  aspectRatio: AspectRatioOption,
  seed?: number,
  steps: number = 8,
  onProgress?: (event: GradioProgressEvent) => void
): Promise<GeneratedImage> => {

  return runWithTokenRetry(async (token) => {
    try {
      // Logic from legacy: [prompt, seed || 42, seed === undefined, aspectRatio, 3, steps]
      const finalSeed = seed ?? 42;
      const randomize = seed === undefined;
      
      const output: any = await runGradioTask(
          QWEN_IMAGE_BASE_API_URL,
          [prompt, finalSeed, randomize, aspectRatio, 3, steps],
          1, // fn_index
          6, // trigger_id
          token,
          undefined,
          onProgress
      );

      const data = output.data;
      if (!data || !data[0] || !data[0].url) throw new Error("error_invalid_response");

      // Extract actual seed if returned in message (legacy did string parsing)
      // New format usually returns clean data, let's try to parse if available or fallback
      let returnedSeed = finalSeed;
      if (typeof data[1] === 'string' && data[1].includes('Seed')) {
          returnedSeed = parseInt(data[1].replace('Seed used for generation: ', ''));
      }

      return {
        id: generateUUID(),
        url: data[0].url,
        model: 'qwen-image',
        prompt,
        aspectRatio,
        timestamp: Date.now(),
        seed: isNaN(returnedSeed) ? finalSeed : returnedSeed,
        steps
      };
    } catch (error) {
      console.error("Qwen Image Fast Generation Error:", error);
      throw error;
    }
  });
};

const generateOvisImage = async (
  prompt: string,
  aspectRatio: AspectRatioOption,
  seed: number = Math.round(Math.random() * 2147483647),
  enableHD: boolean = false,
  steps: number = 24,
  resolution?: { width: number; height: number },
  onProgress?: (event: GradioProgressEvent) => void
): Promise<GeneratedImage> => {
  let { width, height } = resolution || getDimensions(aspectRatio, enableHD);

  return runWithTokenRetry(async (token) => {
    try {
      const output: any = await runGradioTask(
          OVIS_IMAGE_BASE_API_URL,
          [prompt, height, width, seed, steps, 4],
          2, // fn_index
          5, // trigger_id
          token,
          undefined,
          onProgress
      );

      const data = output.data;
      if (!data || !data[0] || !data[0].url) throw new Error("error_invalid_response");

      return {
        id: generateUUID(),
        url: data[0].url,
        model: 'ovis-image',
        prompt,
        aspectRatio,
        timestamp: Date.now(),
        seed,
        steps
      };
    } catch (error) {
      console.error("Ovis Image Generation Error:", error);
      throw error;
    }
  });
};

export const editImageQwen = async (
  imageBlobs: (Blob | string)[],
  prompt: string,
  width: number,
  height: number,
  steps: number = 4,
  guidanceScale: number = 1,
  signal?: AbortSignal
): Promise<GeneratedImage> => {
  return runWithTokenRetry(async (token) => {
    try {
      const seed = Math.round(Math.random() * 2147483647);

      // 1. Upload all Blobs to Gradio first to get temporary paths
      const imagePayloadPromises = imageBlobs.map(async (item) => {
          let blob: Blob;
          if (typeof item === 'string') {
              if (item.startsWith('opfs://')) {
                  blob = await fetchCloudBlob(item);
              } else {
                  blob = await fetchBlob(item);
              }
          } else {
              blob = item;
          }
          const path = await uploadToGradio(QWEN_IMAGE_EDIT_BASE_API_URL, blob, token, signal);
          // Need to include caption: null per spec, inside the nested structure
          return { image: { path, meta: { _type: "gradio.FileData" } }, caption: null };
      });
      
      const imagePayload = await Promise.all(imagePayloadPromises);

      // 2. Call Inference
      const output: any = await runGradioTask(
          QWEN_IMAGE_EDIT_BASE_API_URL,
          [
            imagePayload,
            prompt,
            seed,
            false, // Randomize seed
            guidanceScale,
            steps,
            height,
            width,
            true // Rewrite prompt
          ],
          0, // fn_index
          12, // trigger_id
          token,
          signal
      );

      const data = output.data;
      // Output format: [[{image:{url...}}]] (List of images)
      if (!data || !data[0] || !data[0][0]?.image?.url) {
          throw new Error("error_invalid_response");
      }

      return {
        id: generateUUID(),
        url: data[0][0].image.url,
        model: 'qwen-image-edit',
        prompt,
        aspectRatio: 'custom',
        timestamp: Date.now(),
        seed,
        steps,
        provider: 'huggingface'
      };
    } catch (error) {
      console.error("Qwen Image Edit Error:", error);
      throw error;
    }
  });
};

export const generateImage = async (
  model: ModelOption,
  prompt: string,
  aspectRatio: AspectRatioOption,
  seed?: number,
  enableHD: boolean = false,
  steps?: number,
  guidanceScale?: number,
  resolution?: { width: number; height: number },
  onProgress?: (event: GradioProgressEvent) => void,
  zImageTurboRouting?: ZImageTurboRoutingOptions
): Promise<GeneratedImage> => {
  const finalSeed = seed ?? Math.round(Math.random() * 2147483647);

  if (model === 'flux-1-schnell') {
    return generateFluxSchnellImage(prompt, aspectRatio, finalSeed, enableHD, steps, resolution, onProgress);
  } else if (model === 'qwen-image') {
    return generateQwenImage(prompt, aspectRatio, seed, steps, onProgress);
  } else if (model === 'ovis-image') {
    return generateOvisImage(prompt, aspectRatio, finalSeed, enableHD, steps, resolution, onProgress);
  } else if (model === 'z-image') {
    return generateZImageModel(prompt, aspectRatio, finalSeed, steps, guidanceScale, enableHD, resolution, onProgress);
  } else {
    // Default to z-image-turbo
    return generateZImage(prompt, aspectRatio, finalSeed, enableHD, steps, resolution, onProgress, zImageTurboRouting);
  }
};

export const upscaler = async (url: string): Promise<{ url: string }> => {
  // Fetch image as blob first to upload to Gradio
  const blob = await fetchBlob(url);

  return runWithTokenRetry(async (token) => {
    try {
      // 1. Upload to Gradio
      const filePath = await uploadToGradio(UPSCALER_BASE_API_URL, blob, token);

      // 2. Call inference
      const output: any = await runGradioTask(
          UPSCALER_BASE_API_URL,
          [{ "path": filePath, "meta": { "_type": "gradio.FileData" } }, 'RealESRGAN_x4plus', 0.5, false, 4],
          1, // fn_index
          17, // trigger_id
          token
      );

      const data = output.data;
      if (!data || !data[0] || !data[0].url) throw new Error("error_invalid_response");

      return { url: data[0].url };
    } catch (error) {
      console.error("Upscaler Error:", error);
      throw new Error("error_upscale_failed");
    }
  });
};

export const optimizePrompt = async (originalPrompt: string, model: string = 'openai-fast'): Promise<string> => {
  try {
    // Append the fixed suffix to the user's custom system prompt
    const systemInstruction = getSystemPromptContent() + FIXED_SYSTEM_PROMPT_SUFFIX;
    const apiModel = API_MODEL_MAP.huggingface[model] || model;

    const response = await fetch(POLLINATIONS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: apiModel,
        messages: [
          {
            role: 'system',
            content: systemInstruction
          },
          {
            role: 'user',
            content: originalPrompt
          }
        ],
        stream: false
      }),
    });

    if (!response.ok) {
      throw new Error("error_prompt_optimization_failed");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    return content || originalPrompt;
  } catch (error) {
    console.error("Prompt Optimization Error:", error);
    throw new Error("error_prompt_optimization_failed");
  }
};

// --- Video Generation Services (HF) ---

const VIDEO_NEGATIVE_PROMPT = "Vivid colors, overexposed, static, blurry details, subtitles, style, artwork, painting, image, still, overall grayish tone, worst quality, low quality, JPEG compression artifacts, ugly, incomplete, extra fingers, poorly drawn hands, poorly drawn face, deformed, disfigured, malformed limbs, fused fingers, still image, cluttered background, three legs, many people in the background, walking backward, Screen shaking";

export const createVideoTaskHF = async (imageInput: string | Blob, seed: number = 42): Promise<string> => {
  return runWithTokenRetry(async (token) => {
    try {
      const finalSeed = seed ?? Math.floor(Math.random() * 2147483647);
      const settings = getVideoSettings('huggingface');
      
      let filePath = '';
      
      if (typeof imageInput === 'string') {
          if (imageInput.startsWith('opfs://')) {
              const blob = await fetchCloudBlob(imageInput);
              filePath = await uploadToGradio(WAN2_VIDEO_API_URL, blob, token);
          } else {
              // Assume it's a remote URL accessible by Gradio, or a path already returned by uploadToGradio
              filePath = imageInput;
          }
      } else {
          filePath = await uploadToGradio(WAN2_VIDEO_API_URL, imageInput, token);
      }

      // Call Inference using Queue
      const output: any = await runGradioTask(
          WAN2_VIDEO_API_URL,
          [
            { "path": filePath, "meta": { "_type": "gradio.FileData" } },
            settings.prompt,
            settings.steps,
            VIDEO_NEGATIVE_PROMPT,
            settings.duration,
            settings.guidance, // 1st guidance
            settings.guidance, // 2nd guidance
            finalSeed,
            false // Randomize seed
          ],
          0, // fn_index
          16, // trigger_id
          token
      );

      const data = output.data;
      if (data && data[0]) {
          const vid = data[0];
          if (vid?.video?.url) return vid.video.url;
          if (vid?.url) return vid.url;
          return vid;
      }
      
      throw new Error("No video output returned");

    } catch (error) {
      console.error("Create Video Task HF Error:", error);
      throw error;
    }
  });
};
