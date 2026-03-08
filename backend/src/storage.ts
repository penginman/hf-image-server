/**
 * Unstorage 缁熶竴瀛樺偍閰嶇疆
 * 鑷姩閫傞厤 Cloudflare Workers銆乂ercel 鍜屽叾浠栨棤鏈嶅姟鍣ㄧ幆澧?
 */

import { createStorage } from "unstorage";
import redisDriver from "unstorage/drivers/redis";
import cloudflareKVBindingDriver from "unstorage/drivers/cloudflare-kv-binding";
import httpDriver from "unstorage/drivers/http";
import memoryDriver from "unstorage/drivers/memory";
import type { Storage } from "unstorage";

/**
 * 鏍规嵁鐜鑷姩閫夋嫨鍚堥€傜殑瀛樺偍椹卞姩
 *
 * 浼樺厛绾э細
 * 1. Upstash Redis (KV_REST_API_URL + KV_REST_API_TOKEN) - Vercel 鎺ㄨ崘
 * 2. 鏍囧噯 Redis (REDIS_URL)
 * 3. Cloudflare KV (TOKEN_STATUS_KV binding)
 * 4. Memory (寮€鍙戠幆澧冨洖閫€)
 */
export function createAutoStorage(env: any): Storage {
  const safeEnv = env ?? {};
  // 1. 浼樺厛浣跨敤 Upstash Redis (Vercel KV)
  if (safeEnv.KV_REST_API_URL && safeEnv.KV_REST_API_TOKEN) {
    console.log("[Storage] Using Upstash Redis (Vercel KV)");
    return createStorage({
      driver: httpDriver({
        base: safeEnv.KV_REST_API_URL,
        headers: {
          Authorization: `Bearer ${safeEnv.KV_REST_API_TOKEN}`,
        },
      }),
    });
  }

  // 2. 浣跨敤鏍囧噯 Redis
  if (safeEnv.REDIS_URL) {
    console.log("[Storage] Using Redis");
    return createStorage({
      driver: redisDriver({
        url: safeEnv.REDIS_URL,
      }),
    });
  }

  // 3. 浣跨敤 Cloudflare KV (Cloudflare Workers)
  if (safeEnv.TOKEN_STATUS_KV) {
    console.log("[Storage] Using Cloudflare KV");
    return createStorage({
      driver: cloudflareKVBindingDriver({
        binding: safeEnv.TOKEN_STATUS_KV,
      }),
    });
  }

  // 4. 鍥為€€鍒板唴瀛樺瓨鍌紙寮€鍙戠幆澧冿級
  console.log("[Storage] Using memory storage (development mode)");
  return createStorage({
    driver: memoryDriver(),
  });
}

