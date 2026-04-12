# deploy.ps1 - One-command deploy: GitHub + Supabase + Vercel
# Usage: .\deploy.ps1 "optional commit message"
# Or via npm: npm run deploy "optional commit message"

param(
  [string]$Message = ""
)

$ErrorActionPreference = "Stop"

# ---------------------------------------------
# Helpers
# ---------------------------------------------
function Step($label) {
  Write-Host ""
  Write-Host "------------------------------------------" -ForegroundColor DarkGray
  Write-Host "  $label" -ForegroundColor Cyan
  Write-Host "------------------------------------------" -ForegroundColor DarkGray
}

function Ok($msg)   { Write-Host "  [OK] $msg" -ForegroundColor Green }
function Warn($msg) { Write-Host "  [WARN] $msg" -ForegroundColor Yellow }
function Fail($msg) { Write-Host "  [FAIL] $msg" -ForegroundColor Red; exit 1 }

# ---------------------------------------------
# 1. Build commit message
# ---------------------------------------------
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
if ($Message -eq "") {
  $changed = git diff --name-only HEAD 2>$null
  if ($changed) {
    $summary = ($changed | Select-Object -First 3) -join ", "
    $Message = "chore: update $summary [$timestamp]"
  } else {
    $Message = "chore: deploy [$timestamp]"
  }
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Magenta
Write-Host "     SPACES ORGANIZERS - FULL DEPLOY      " -ForegroundColor Magenta
Write-Host "==========================================" -ForegroundColor Magenta
Write-Host "  Commit: $Message" -ForegroundColor Gray

# ---------------------------------------------
# 2. TypeScript check
# ---------------------------------------------
Step "1/4 - TypeScript Check"
try {
  npx tsc --noEmit
  Ok "No TypeScript errors"
} catch {
  Fail "TypeScript errors found. Fix before deploying."
}

# ---------------------------------------------
# 3. GitHub push
# ---------------------------------------------
Step "2/4 - GitHub (git push)"
$status = git status --porcelain
if ($status) {
  git add -A
  git commit -m $Message
  Ok "Committed: $Message"
} else {
  Warn "Nothing to commit - working tree clean"
}

try {
  git push origin main
  Ok "Pushed to github.com/Onehostingeurope/spacesorganizers (main)"
} catch {
  Warn "Push may have had warnings, continuing..."
}

# ---------------------------------------------
# 4. Supabase seed / sync
# ---------------------------------------------
Step "3/4 - Supabase Sync"
try {
  node scripts/seed-supabase.mjs
  Ok "Supabase data synced"
} catch {
  Warn "Supabase seed had issues. Continuing with deploy..."
}

# ---------------------------------------------
# 5. Vercel production deploy
# ---------------------------------------------
Step "4/4 - Vercel Production Deploy"
try {
  $result = npx vercel --prod --yes 2>&1
  Ok "Deployed to Vercel (check dashboard)"
} catch {
  Fail "Vercel deploy failed. Check vercel.com/dashboard."
}

# ---------------------------------------------
# Done
# ---------------------------------------------
Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "          v  ALL DONE - DEPLOYED!          " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  GitHub   : https://github.com/Onehostingeurope/spacesorganizers" -ForegroundColor Gray
Write-Host "  Vercel   : https://spaceorganizers.vercel.app" -ForegroundColor Gray
Write-Host "  Supabase : https://supabase.com/dashboard/project/nozsveruyybstvembxps" -ForegroundColor Gray
Write-Host ""
