#!/usr/bin/env pwsh
# Complete the git rebase by continuing

Set-Location "c:\Users\hp\OneDrive\Desktop\Import-Export-Website"

# Set environment variables to skip editor
$env:GIT_EDITOR = "true"
$env:GIT_SEQUENCE_EDITOR = "true"
$env:GIT_ALLOW_EMPTY = "true"

# Try to continue the rebase
Write-Host "Attempting to continue rebase..."
& git rebase --continue --no-edit

# Check if successful
$exitCode = $LASTEXITCODE
Write-Host "Exit code: $exitCode"

if ($exitCode -eq 0) {
    Write-Host "✅ Rebase completed successfully!"
} else {
    Write-Host "❌ Rebase failed with exit code: $exitCode"
}

exit $exitCode
