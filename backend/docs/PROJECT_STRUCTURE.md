# 项目结构说明

本文档说明仓库的目录结构与组织方式（本仓库采用 `front/` + `backend/` 的结构）。

## 📁 目录结构

```
repo/
├── 🎨 front/                   # 前端（Peinture: React + Vite）
│   ├── package.json
│   ├── vite.config.ts
│   └── ...                     # 组件/页面/状态管理等
│
├── 🧠 backend/                 # 后端（Imagine Server）
│   ├── src/                    # 核心源代码
│   ├── server/                 # 本地服务器
│   ├── api/                    # API 路由（Vercel/Serverless）
│   ├── public/                 # 前端构建产物（由 scripts/build-frontend.sh 生成）
│   ├── scripts/                # 工具脚本
│   ├── docker/                 # Docker 部署
│   ├── docs/                   # VitePress 文档
│   ├── package.json            # 后端依赖与脚本（pnpm）
│   └── pnpm-lock.yaml
│
├── 🧩 .github/                 # GitHub Actions（仓库级）
└── 📄 LICENSE                  # 开源许可证
```

## 🎯 目录职责

> 下文中提到的 `/src`、`/server`、`/scripts` 等路径均相对于 `backend/` 目录。

### `/src` - 核心源代码

包含应用的核心业务逻辑，包括 API 路由、Provider 插件系统、存储配置等。

**关键文件：**

- `index.ts` - Hono 应用入口，定义路由和中间件
- `api/imagine.ts` - 统一的图像生成 API 处理
- `api/token-manager.ts` - Token 管理和自动切换
- `providers/` - 各个 AI 提供商的插件实现

### `/server` - 本地服务器

包含 Node.js 本地开发和生产服务器的配置文件。

**用途：**

- 本地开发：`pnpm run dev`
- 生产部署：`pnpm start` 或使用 PM2

### `/docker` - Docker 部署

包含 Docker 和 Docker Compose 的配置文件。

**用途：**

- 容器化部署
- 包含 Redis 的完整服务栈
- 生产环境推荐方式

### `/docs` - VitePress 文档

包含项目的完整文档，使用 VitePress 构建静态网站。

**特点：**

- 自动部署到 GitHub Pages
- 支持全文搜索
- 响应式设计
- 中文界面

**本地预览：**

```bash
pnpm run docs:dev
```

**构建：**

```bash
pnpm run docs:build
```

### `/scripts` - 工具脚本

包含项目的辅助脚本，如快速设置脚本。

### `/.github` - GitHub 配置

包含 GitHub Actions 工作流配置。

**当前工作流：**

- `deploy-docs.yml` - 自动构建和部署文档到 GitHub Pages

## 🚀 常用命令

### 开发

```bash
pnpm run dev              # 启动开发服务器
pnpm run type-check       # TypeScript 类型检查
```

### 文档

```bash
pnpm run docs:dev         # 启动文档开发服务器
pnpm run docs:build       # 构建文档
pnpm run docs:preview     # 预览构建的文档
```

### 部署

```bash
# Vercel
pnpm run vercel:dev       # Vercel 本地开发
pnpm run vercel:deploy    # 部署到 Vercel

# Cloudflare Workers
pnpm run wrangler:dev     # Cloudflare 本地开发
pnpm run wrangler:deploy  # 部署到 Cloudflare

# Docker
cd docker
docker-compose up -d      # 启动 Docker 服务
```

## 📝 文件说明

### 配置文件

- **package.json** - 项目依赖和脚本配置
- **tsconfig.json** - TypeScript 编译配置
- **vercel.json** - Vercel 平台部署配置
- **wrangler.toml** - Cloudflare Workers 部署配置
- **.env.example** - 环境变量模板

### 文档文件

- **README.md** - 项目主文档（根目录）
- **CHANGELOG.md** - 版本更新日志（根目录和 docs/ 都有）
- **CONTRIBUTING.md** - 贡献指南（根目录和 docs/ 都有）
- **LICENSE** - MIT 开源许可证

## 🔄 文件同步

某些文件在根目录和 docs/ 目录都存在：

- `CHANGELOG.md` - 根目录是主文件，docs/ 中的副本用于文档网站
- `CONTRIBUTING.md` - 根目录是主文件，docs/ 中的副本用于文档网站

修改时请同时更新两处，或使用符号链接。

## 📦 构建产物

以下目录包含构建产物，已在 `.gitignore` 中忽略：

- `/dist` - TypeScript 编译输出
- `/docs/.vitepress/dist` - VitePress 构建输出
- `/docs/.vitepress/cache` - VitePress 缓存
- `/.wrangler` - Cloudflare Workers 本地开发缓存
- `/node_modules` - npm 依赖

## 🎨 设计原则

1. **关注点分离** - 不同功能放在不同目录
2. **清晰的职责** - 每个目录有明确的用途
3. **易于导航** - 结构扁平，避免过深嵌套
4. **文档优先** - 每个重要目录都有 README
5. **开发友好** - 配置文件集中，易于查找

## 🔗 相关文档

- [快速开始](docs/QUICKSTART.md)
- [部署指南](docs/DEPLOYMENT.md)
- [架构概览](docs/ARCHITECTURE_OVERVIEW.md)
- [贡献指南](docs/CONTRIBUTING.md)
