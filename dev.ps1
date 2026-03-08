$ErrorActionPreference = "Stop"

$repoRoot = $PSScriptRoot
$backendDir = Join-Path $repoRoot "backend"
$frontDir = Join-Path $repoRoot "front"

function Assert-Command($name) {
  if (!(Get-Command $name -ErrorAction SilentlyContinue)) {
    throw "Missing required command: $name"
  }
}

Assert-Command node
Assert-Command npm
Assert-Command npm

if (!(Test-Path $backendDir)) { throw "Missing backend dir: $backendDir" }
if (!(Test-Path $frontDir)) { throw "Missing front dir: $frontDir" }

if (!(Test-Path (Join-Path $backendDir "node_modules"))) {
  Write-Host "Installing backend deps (npm)..." -ForegroundColor Cyan
  Push-Location $backendDir
  try { npm install } finally { Pop-Location }
}

if (!(Test-Path (Join-Path $frontDir "node_modules"))) {
  Write-Host "Installing frontend deps (npm)..." -ForegroundColor Cyan
  Push-Location $frontDir
  try { npm install } finally { Pop-Location }
}

Write-Host "Starting backend dev server (backend/npm run dev)..." -ForegroundColor Green
$backendProc = Start-Process -FilePath "npm" -ArgumentList @("run", "dev") -WorkingDirectory $backendDir -NoNewWindow -PassThru

Write-Host "Starting frontend dev server (front/VITE_SERVICE_MODE=server npm run dev)..." -ForegroundColor Green
$frontProc = Start-Process -FilePath "cmd.exe" -ArgumentList @("/c", "set VITE_SERVICE_MODE=server&& npm run dev") -WorkingDirectory $frontDir -NoNewWindow -PassThru

try {
  Write-Host ""
  Write-Host "Backend: http://localhost:3000" -ForegroundColor Yellow
  Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
  Write-Host "Press Ctrl+C to stop both." -ForegroundColor Yellow
  Write-Host ""

  # Return when either process exits (crash/stop), then cleanup the other.
  Wait-Process -Id @($backendProc.Id, $frontProc.Id) -Any
} finally {
  foreach ($p in @($backendProc, $frontProc)) {
    if ($null -ne $p -and !( $p.HasExited )) {
      try { Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue } catch {}
    }
  }
}
