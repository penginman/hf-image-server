import { AspectRatioOption } from "../types";

export const MIN_RESOLUTION = 512;
export const MAX_RESOLUTION = 2048;
export const RESOLUTION_STEP = 64;

export interface ResolutionValue {
  width: number;
  height: number;
}

export interface ResolutionPreset {
  group: "Square" | "Landscape" | "Portrait";
  label: string;
  value: string;
  width: number;
  height: number;
}

export const RESOLUTION_PRESETS: ResolutionPreset[] = [
  { group: "Square", label: "1024 x 1024", value: "1024x1024", width: 1024, height: 1024 },
  { group: "Square", label: "1536 x 1536", value: "1536x1536", width: 1536, height: 1536 },
  { group: "Square", label: "2048 x 2048", value: "2048x2048", width: 2048, height: 2048 },
  { group: "Landscape", label: "1536 x 864 (16:9)", value: "1536x864", width: 1536, height: 864 },
  { group: "Landscape", label: "1536 x 1024 (3:2)", value: "1536x1024", width: 1536, height: 1024 },
  { group: "Landscape", label: "1536 x 1152 (4:3)", value: "1536x1152", width: 1536, height: 1152 },
  { group: "Portrait", label: "864 x 1536 (9:16)", value: "864x1536", width: 864, height: 1536 },
  { group: "Portrait", label: "1024 x 1536 (2:3)", value: "1024x1536", width: 1024, height: 1536 },
  { group: "Portrait", label: "1152 x 1536 (3:4)", value: "1152x1536", width: 1152, height: 1536 }
];

export const normalizeResolutionValue = (value: number): number => {
  const snapped = Math.round(value / RESOLUTION_STEP) * RESOLUTION_STEP;
  return Math.min(MAX_RESOLUTION, Math.max(MIN_RESOLUTION, snapped));
};

export const normalizeResolution = (width: number, height: number): ResolutionValue => ({
  width: normalizeResolutionValue(width),
  height: normalizeResolutionValue(height)
});

const ASPECT_RATIO_TABLE: Array<{ ratio: AspectRatioOption; value: number }> = [
  { ratio: "1:1", value: 1 },
  { ratio: "3:2", value: 3 / 2 },
  { ratio: "2:3", value: 2 / 3 },
  { ratio: "3:4", value: 3 / 4 },
  { ratio: "4:3", value: 4 / 3 },
  { ratio: "4:5", value: 4 / 5 },
  { ratio: "5:4", value: 5 / 4 },
  { ratio: "9:16", value: 9 / 16 },
  { ratio: "16:9", value: 16 / 9 }
];

export const getClosestAspectRatio = (width: number, height: number): AspectRatioOption => {
  const ratio = width / height;
  let best = ASPECT_RATIO_TABLE[0];
  let bestDiff = Math.abs(best.value - ratio);

  for (const candidate of ASPECT_RATIO_TABLE) {
    const diff = Math.abs(candidate.value - ratio);
    if (diff < bestDiff) {
      best = candidate;
      bestDiff = diff;
    }
  }

  return best.ratio;
};

export const getDefaultResolutionForAspectRatio = (ratio: AspectRatioOption): ResolutionValue => {
  switch (ratio) {
    case "16:9":
      return { width: 1536, height: 864 };
    case "4:3":
      return { width: 1536, height: 1152 };
    case "3:2":
      return { width: 1536, height: 1024 };
    case "9:16":
      return { width: 864, height: 1536 };
    case "3:4":
      return { width: 1152, height: 1536 };
    case "2:3":
      return { width: 1024, height: 1536 };
    case "4:5":
      return { width: 1152, height: 1408 };
    case "5:4":
      return { width: 1408, height: 1152 };
    case "1:1":
    default:
      return { width: 1536, height: 1536 };
  }
};
