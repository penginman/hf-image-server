import type { IProvider, ModelConfig } from "./base";
import type { Bindings } from "../types";
import { GiteeProvider } from "./gitee";
import { HuggingFaceProvider } from "./huggingface";
import { ModelScopeProvider } from "./modelscope";
import { A4FProvider } from "./a4f";
import { ModelsLabProvider } from "./modelslab";
import { hasAvailableToken, type Provider } from "../api/token-manager";

/**
 * Provider 娉ㄥ唽鍣?
 * 绠＄悊鎵€鏈夊彲鐢ㄧ殑 Provider 鎻掍欢
 */
class ProviderRegistry {
  private providers: Map<string, IProvider> = new Map();

  /**
   * 娉ㄥ唽涓€涓?Provider
   */
  register(provider: IProvider): void {
    this.providers.set(provider.name, provider);
  }

  /**
   * 鑾峰彇鎸囧畾鐨?Provider
   */
  get(name: string): IProvider | undefined {
    return this.providers.get(name);
  }

  /**
   * 妫€鏌?Provider 鏄惁瀛樺湪
   */
  has(name: string): boolean {
    return this.providers.has(name);
  }

  /**
   * 鑾峰彇鎵€鏈夊凡娉ㄥ唽鐨?Provider 鍚嶇О
   */
  getProviderNames(): string[] {
    return Array.from(this.providers.keys());
  }

  /**
   * 鑾峰彇鎵€鏈夊彲鐢ㄧ殑妯″瀷閰嶇疆
   */
  getAllModelConfigs(): ModelConfig[] {
    const result: ModelConfig[] = [];

    for (const provider of this.providers.values()) {
      const configs = provider.getModelConfigs();
      Object.values(configs).forEach((modelData) => {
        result.push(modelData.config);
      });
    }

    return result;
  }

  /**
   * 鑾峰彇鎵€鏈夊彲鐢ㄧ殑妯″瀷閰嶇疆锛堟牴鎹?token 鍙敤鎬ц繃婊わ級
   */
  async getAllAvailableModelConfigs(env: Bindings): Promise<ModelConfig[]> {
    const result: ModelConfig[] = [];

    for (const provider of this.providers.values()) {
      try {
        const hasToken = await hasAvailableToken(
          provider.name as Provider,
          env,
        );

        if (!hasToken) continue;

        const configs = provider.getModelConfigs();
        Object.values(configs).forEach((modelData) => {
          result.push(modelData.config);
        });
      } catch (error) {
        console.error(
          `[ProviderRegistry] Skip provider '${provider.name}' due to error:`,
          error,
        );
      }
    }

    return result;
  }

  /**
   * 瑙ｆ瀽 provider:model 鏍煎紡鐨勬ā鍨?ID
   */
  parseModelId(modelId: string): {
    provider: string;
    model: string;
  } {
    const parts = modelId.split("/");
    if (parts.length > 1) {
      return {
        provider: parts[0],
        model: modelId.substring(parts[0].length + 1),
      };
    }
    // 鍏煎鏃ф牸寮忥紝榛樿浣跨敤 gitee
    return { provider: "gitee", model: modelId };
  }
}

// 鍒涘缓鍏ㄥ眬娉ㄥ唽鍣ㄥ疄渚?
export const providerRegistry = new ProviderRegistry();

// 娉ㄥ唽鎵€鏈夊唴缃殑 Provider
providerRegistry.register(new GiteeProvider());
providerRegistry.register(new HuggingFaceProvider());
providerRegistry.register(new ModelScopeProvider());
providerRegistry.register(new A4FProvider());
providerRegistry.register(new ModelsLabProvider());

/**
 * 鑾峰彇鎵€鏈夊彲鐢ㄦā鍨嬪垪琛紙涓嶈繃婊わ級
 */
export function getAvailableModels(): ModelConfig[] {
  return providerRegistry.getAllModelConfigs();
}

/**
 * 鑾峰彇鎵€鏈夊彲鐢ㄦā鍨嬪垪琛紙鏍规嵁 token 鍙敤鎬ц繃婊わ級
 */
export async function getAvailableModelsFiltered(
  env: Bindings,
): Promise<ModelConfig[]> {
  return providerRegistry.getAllAvailableModelConfigs(env);
}

