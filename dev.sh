#!/usr/bin/env bash

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$REPO_ROOT/backend"
FRONT_DIR="$REPO_ROOT/front"

command -v node >/dev/null || { echo "Missing required command: node" >&2; exit 1; }
command -v npm >/dev/null || { echo "Missing required command: npm" >&2; exit 1; }
command -v pnpm >/dev/null || { echo "Missing required command: pnpm" >&2; exit 1; }

[ -d "$BACKEND_DIR" ] || { echo "Missing backend dir: $BACKEND_DIR" >&2; exit 1; }
[ -d "$FRONT_DIR" ] || { echo "Missing front dir: $FRONT_DIR" >&2; exit 1; }

if [ ! -d "$BACKEND_DIR/node_modules" ]; then
  echo "Installing backend deps (pnpm)..."
  (cd "$BACKEND_DIR" && pnpm install)
fi

if [ ! -d "$FRONT_DIR/node_modules" ]; then
  echo "Installing frontend deps (npm)..."
  (cd "$FRONT_DIR" && npm install)
fi

cleanup() {
  if [ -n "${BACKEND_PID:-}" ] && kill -0 "$BACKEND_PID" 2>/dev/null; then kill "$BACKEND_PID" 2>/dev/null || true; fi
  if [ -n "${FRONT_PID:-}" ] && kill -0 "$FRONT_PID" 2>/dev/null; then kill "$FRONT_PID" 2>/dev/null || true; fi
}
trap cleanup EXIT INT TERM

echo "Starting backend dev server (backend/pnpm run dev)..."
(cd "$BACKEND_DIR" && pnpm run dev) &
BACKEND_PID=$!

echo "Starting frontend dev server (front/npm run dev)..."
(cd "$FRONT_DIR" && VITE_SERVICE_MODE=server npm run dev) &
FRONT_PID=$!

echo
echo "Backend:  http://localhost:3000"
echo "Frontend: http://localhost:5173"
echo "Press Ctrl+C to stop both."
echo

set +e
if wait -n "$BACKEND_PID" "$FRONT_PID" 2>/dev/null; then
  :
else
  wait "$BACKEND_PID"
  wait "$FRONT_PID"
fi
