#!/usr/bin/env bash

# 构建前端脚本（本地 front/ 目录模式）
# - 前端源码：<repo>/front
# - 构建产物：拷贝到 <repo>/backend/public（供后端静态服务使用）

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$BACKEND_DIR/.." && pwd)"

FRONTEND_DIR="${FRONTEND_DIR:-$REPO_ROOT/front}"
PUBLIC_DIR="${PUBLIC_DIR:-$BACKEND_DIR/public}"

echo "🚀 开始构建前端..."
echo "📦 前端目录: $FRONTEND_DIR"
echo "📁 输出目录: $PUBLIC_DIR"

if [ ! -d "$FRONTEND_DIR" ]; then
  echo "❌ 找不到前端目录：$FRONTEND_DIR"
  exit 1
fi

if [ ! -f "$FRONTEND_DIR/package.json" ]; then
  echo "❌ 前端目录中未找到 package.json：$FRONTEND_DIR"
  exit 1
fi

if [ -d "$PUBLIC_DIR" ]; then
  echo "📦 清理旧的 public 目录..."
  rm -rf "$PUBLIC_DIR"
fi

pushd "$FRONTEND_DIR" >/dev/null

echo "📦 安装依赖..."
# Vercel/pnpm 可能会把 pnpm-only 配置以 npm_config_* 环境变量形式传给 npm，
# 导致 npm 打印 "Unknown env config" 警告；这里显式清理这些变量，避免噪音并兼容未来 npm 版本。
unset npm_config_shamefully_hoist
unset npm_config_auto_install_peers
unset npm_config_strict_peer_dependencies
npm install

echo "🔨 构建项目（服务器模式）..."
VITE_SERVICE_MODE=server npm run build

if [ ! -d "dist" ]; then
  echo "❌ 构建未生成 dist/ 目录（请检查前端构建输出）"
  exit 1
fi

popd >/dev/null

echo "📋 复制构建产物到 public 目录..."
cp -R "$FRONTEND_DIR/dist" "$PUBLIC_DIR"

echo "✅ 前端构建完成！"
echo "📁 静态文件已复制到: $PUBLIC_DIR"
