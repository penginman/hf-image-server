#!/usr/bin/env bash

set -euo pipefail

if ! command -v pnpm &>/dev/null; then
  echo "❌ pnpm is not installed"
  echo "   Install: npm i -g pnpm"
  exit 1
fi

if [ ! -d node_modules ]; then
  pnpm install
fi

pnpm run dev
