#!/usr/bin/env bash
set -euo pipefail

# YCN Labs — End of Day Closing Script (v3)
# Records Git facts, audits for secrets, updates docs/STATE.md,
# and safely commits & pushes ONLY docs/STATE.md after explicit user confirmation.

MSG="${1:-}"
if [ -z "$MSG" ]; then
  echo "Usage: ./tools/close-day.sh \"<summary of work completed; what is next>\""
  exit 1
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

echo "=== 1. PRE-CLOSE SAFETY CHECKS ==="

# Check 1: Refuse tracked .env files
TRACKED_ENV=$(git ls-files 2>/dev/null | grep -E '(^|/)\.env' || true)
if [ -n "$TRACKED_ENV" ]; then
  echo "ERROR: Tracked environment file(s) found in repository index:"
  echo "$TRACKED_ENV"
  exit 1
fi

# Check 2: Check for oversized tracked files (>10MB)
TRACKED_LARGE=$(git ls-files 2>/dev/null | while read -r f; do
  if [ -f "$f" ]; then
    size=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f" 2>/dev/null || echo 0)
    if [ "$size" -gt 10485760 ]; then
      echo "$f ($size bytes)"
    fi
  fi
done || true)

if [ -n "$TRACKED_LARGE" ]; then
  echo "ERROR: Tracked file(s) exceed 10MB limit:"
  echo "$TRACKED_LARGE"
  exit 1
fi

# Check 3: Refuse if unexpected changes are ALREADY staged
STAGED_FILES=$(git diff --cached --name-only 2>/dev/null || true)
if [ -n "$STAGED_FILES" ]; then
  echo "ERROR: Unexpected staged files detected. Day-close commits docs/STATE.md only."
  echo "Currently staged:"
  echo "$STAGED_FILES"
  echo "Unstage with 'git restore --staged <file>' before running close-day.sh."
  exit 1
fi

# Check 4: Secret scan on state doc & modified tracked files
SECRET_PATTERN='(BEGIN (RSA|OPENSSH|PGP|EC|DSA) PRIVATE KEY|AKIA[0-9A-Z]{16}|ghp_[0-9a-zA-Z]{36}|github_pat_[0-9a-zA-Z_]{82}|(sk_live|re_)[a-zA-Z0-9]{20,}|(api_key|apiKey|secret_key|secretKey|private_key|password)\s*[:=]\s*["\x27][a-zA-Z0-9_\-]{8,}["\x27])'

if [ -f "docs/STATE.md" ]; then
  DOC_MATCH=$(grep -nIE "$SECRET_PATTERN" docs/STATE.md 2>/dev/null | cut -d: -f1-2 || true)
  if [ -n "$DOC_MATCH" ]; then
    echo "ERROR: Secret pattern matched in docs/STATE.md at $DOC_MATCH"
    exit 1
  fi
fi

MODIFIED_FILES=$(git diff --name-only 2>/dev/null || true)
if [ -n "$MODIFIED_FILES" ]; then
  for mf in $MODIFIED_FILES; do
    if [ -f "$mf" ]; then
      MOD_MATCH=$(grep -nIE "$SECRET_PATTERN" "$mf" 2>/dev/null | cut -d: -f1-2 || true)
      if [ -n "$MOD_MATCH" ]; then
        echo "ERROR: Secret pattern matched in modified file at $MOD_MATCH"
        exit 1
      fi
    fi
  done
fi

echo "Pre-close safety checks: PASS"

echo "=== 2. WORKING TREE STATUS ==="
STARTING_HEAD=$(git rev-parse HEAD 2>/dev/null || echo "pre-init")
BRANCH=$(git branch --show-current 2>/dev/null || echo "main")
DIRTY_COUNT=$(git status --porcelain 2>/dev/null | wc -l || echo "0")

UNTRACKED=$(git status --porcelain 2>/dev/null | grep '^\?\?' || true)
if [ -n "$UNTRACKED" ]; then
  echo "Notice: Untracked entries present (will NOT be staged):"
  echo "$UNTRACKED"
fi

git status --short 2>/dev/null || echo "Working tree clean."

echo ""
read -r -p "Update docs/STATE.md, commit, and push to origin $BRANCH? [y/N]: " CONFIRM
if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
  TODAY=$(date +%Y-%m-%d)

  # Check last gate test result
  LAST_TEST="NOT RUN"
  if [ -d "logs" ] && [ -n "$(ls -A logs 2>/dev/null)" ]; then
    LATEST_LOG=$(ls -t logs/* 2>/dev/null | head -n 1 || true)
    if [ -n "$LATEST_LOG" ] && [ -f "$LATEST_LOG" ]; then
      if grep -q "FAIL" "$LATEST_LOG"; then
        LAST_TEST="FAIL (see $LATEST_LOG)"
      elif grep -q "PASS" "$LATEST_LOG"; then
        LAST_TEST="PASS (see $LATEST_LOG)"
      else
        LAST_TEST="COMPLETED (see $LATEST_LOG)"
      fi
    fi
  fi

  # Safely rewrite ## Last Session block in docs/STATE.md using awk and printf
  TEMP_STATE=$(mktemp)
  awk '/^## Last Session/{exit} {print}' docs/STATE.md > "$TEMP_STATE"
  sed -i -e :a -e '/^\n*$/{$d;N;ba' -e '}' "$TEMP_STATE"
  if tail -n 1 "$TEMP_STATE" | grep -q '^---$'; then
    sed -i '$d' "$TEMP_STATE"
    sed -i -e :a -e '/^\n*$/{$d;N;ba' -e '}' "$TEMP_STATE"
  fi

  {
    cat "$TEMP_STATE"
    printf "\n---\n\n## Last Session\n"
    printf -- "- **Date:** %s\n" "$TODAY"
    printf -- "- **Starting HEAD:** %s\n" "$STARTING_HEAD"
    printf -- "- **Last Test Result:** %s\n" "$LAST_TEST"
    printf -- "- **Uncommitted count:** %s\n" "$DIRTY_COUNT"
    printf -- "- **Summary & Next:** %s\n" "$MSG"
  } > docs/STATE.md
  rm -f "$TEMP_STATE"

  # Update Timestamp in docs/STATE.md header
  sed -i "s/\*\*Timestamp:\*\* .*/\*\*Timestamp:\*\* $TODAY/" docs/STATE.md

  # Stage ONLY docs/STATE.md
  git add docs/STATE.md

  # Re-verify nothing else is staged
  STAGED_CHECK=$(git diff --cached --name-only | grep -v '^docs/STATE.md$' || true)
  if [ -n "$STAGED_CHECK" ]; then
    echo "ERROR: Unrelated files staged alongside docs/STATE.md:"
    echo "$STAGED_CHECK"
    git restore --staged .
    exit 1
  fi

  # Commit and push
  git commit -m "close: $TODAY — $MSG"
  git push origin "$BRANCH"
  echo "SUCCESS: Day closed and pushed."
  echo "Result Commit: $(git log -1 --format='%H %s')"
else
  echo "Closed locally. No files modified, committed, or pushed."
fi
