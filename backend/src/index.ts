import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import {
  proxyRequest,
  getAvailableModels,
  getAvailableModelsFiltered,
} from "./api/imagine";
import {
  getTokenStatsHandler,
  getAllTokenStatsHandler,
  resetTokenStatusHandler,
} from "./api/token-manager";
import { createAutoStorage } from "./storage";
import type { Bindings } from "./types";

export const app = new Hono<{ Bindings: Bindings }>();
export const webApp = new Hono<{ Bindings: Bindings }>();

// 鍒濆鍖栧瓨鍌紙搴旂敤鍚姩鏃讹級
let globalStorage: any = null;

// 瀛樺偍涓棿浠讹細涓烘瘡涓姹傛敞鍏?storage
app.use("*", async (c, next) => {
  const safeEnv = (c.env ?? {}) as any;
  (c as any).env = safeEnv;

  // 鍦ㄦ棤鏈嶅姟鍣ㄧ幆澧冧腑锛屾瘡娆¤姹傞兘鍙兘鏄柊鐨勫疄渚?
  // 鎵€浠ユ垜浠渶瑕佹鏌ユ槸鍚﹀凡缁忓垵濮嬪寲
  if (!globalStorage) {
    globalStorage = createAutoStorage(safeEnv);
  }
  safeEnv.storage = globalStorage;
  await next();
});

// 鍏ㄥ眬 CORS 閰嶇疆锛堝湪璁よ瘉涔嬪墠锛?
app.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length", "Content-Type"],
    maxAge: 86400,
    credentials: true,
  }),
);
app.use(logger());

// 搴旂敤璁よ瘉涓棿浠跺埌闇€瑕佽璇佺殑 API 璺敱
app.use("/v1/*", async (c, next) => {
  const tokens = c.env?.API_TOKEN;

  // 濡傛灉娌℃湁閰嶇疆 API_TOKEN锛屽垯璺宠繃璁よ瘉
  if (!tokens) {
    return next();
  }

  // 鑾峰彇 Authorization 澶?
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    return c.json(
      { error: "Unauthorized", message: "Missing Authorization header" },
      401,
    );
  }

  // 妫€鏌ユ槸鍚︽槸 Bearer token
  if (!authHeader.startsWith("Bearer ")) {
    return c.json(
      { error: "Unauthorized", message: "Invalid Authorization format" },
      401,
    );
  }

  // 鎻愬彇 token
  const token = authHeader.substring(7); // 绉婚櫎 "Bearer " 鍓嶇紑

  // 楠岃瘉 token
  const validTokens = tokens.split(",").map((t) => t.trim());
  if (!validTokens.includes(token)) {
    return c.json({ error: "Unauthorized", message: "Invalid token" }, 401);
  }

  // Token 鏈夋晥锛岀户缁鐞嗚姹?
  await next();
});

// 鑾峰彇鍙敤妯″瀷鍒楄〃锛堟牴鎹?token 鍙敤鎬у姩鎬佽繃婊わ級
app.get("/v1/models", async (c) => {
  try {
    const models = await getAvailableModelsFiltered(c.env ?? ({} as any));
    return c.json(models);
  } catch (error) {
    console.error("[Models] Failed to load filtered models:", error);
    return c.json([]);
  }
});

// 鑾峰彇鎵€鏈夋ā鍨嬪垪琛紙涓嶈繃婊わ紝鐢ㄤ簬绠＄悊鍜岃皟璇曪級
app.get("/v1/models/all", (c) => {
  const models = getAvailableModels();
  return c.json(models);
});

// RESTful 椋庢牸鐨?AI 鏈嶅姟浠ｇ悊 API
app.post("/v1/:action", proxyRequest);

// 鑾峰彇 Token 缁熻淇℃伅
app.get("/v1/token-stats", getTokenStatsHandler);

// 鑾峰彇鎵€鏈?Provider 鐨?Token 缁熻淇℃伅
app.get("/v1/token-stats/all", getAllTokenStatsHandler);

// 閲嶇疆 Token 鐘舵€侊紙绠＄悊鎺ュ彛锛?
app.post("/v1/token-reset", resetTokenStatusHandler);

// 鍋ュ悍妫€鏌?
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.2.0",
  });
});

// 鎸傝浇 API 璺敱
webApp.route("/api", app);

// 鎸傝浇 API 璺敱
webApp.get("/", (c) => c.redirect("/index.html"));

export default webApp;

