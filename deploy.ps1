# deploy.ps1 — Single command: push + wait for build + alias both domains
param(
  [string]$Message = "chore: deploy"
)

$DOMAIN1 = "spacesorganizers.com"
$DOMAIN2 = "www.spacesorganizers.com"

Write-Host ""
Write-Host ">> Pushing to GitHub..." -ForegroundColor Cyan
git add -A
git commit -m $Message
git push origin main

Write-Host ""
Write-Host ">> Waiting for Vercel build to start..." -ForegroundColor Cyan
Start-Sleep -Seconds 8

# Poll until a new Ready deployment appears
$latestUrl = $null
$attempts = 0
while (-not $latestUrl -and $attempts -lt 30) {
  $attempts++
  $raw = npx vercel ls 2>&1 | Out-String
  $match = [regex]::Match($raw, 'https://spaceorganizers-[a-z0-9]+-onehostingeuropes-projects\.vercel\.app')
  if ($match.Success) {
    $url = $match.Value
    if ($raw -match [regex]::Escape($url) + '[^\n]*Ready') {
      $latestUrl = $url
    } else {
      Write-Host "   Building... ($attempts)" -ForegroundColor Yellow
      Start-Sleep -Seconds 5
    }
  } else {
    Write-Host "   Waiting for deployment... ($attempts)" -ForegroundColor Yellow
    Start-Sleep -Seconds 5
  }
}

if (-not $latestUrl) {
  Write-Host "!! Could not detect new deployment." -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host ">> Build ready: $latestUrl" -ForegroundColor Green
Write-Host ">> Aliasing domains..." -ForegroundColor Cyan

npx vercel alias $latestUrl $DOMAIN1 2>&1
npx vercel alias $latestUrl $DOMAIN2 2>&1

Write-Host ""
Write-Host ">> DONE! Live at https://$DOMAIN1" -ForegroundColor Green
Write-Host ""
