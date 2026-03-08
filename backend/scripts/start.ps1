$ErrorActionPreference = "Stop"

if (!(Test-Path "node_modules")) {
  pnpm install
}

pnpm run dev
