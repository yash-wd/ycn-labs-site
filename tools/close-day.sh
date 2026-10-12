#!/usr/bin/env bash
set -euo pipefail

# YCN Labs — End of Day Closing Script
# Records Git facts, audits staged content for secrets, updates STATE.md,
# and optionally commits ONLY docs/STATE.md after explicit user confirmation.

MSG="${1:-}"
if [ -z "$MSG" ]; then
  echo "Usage: ./tools/close-day.sh \"<summary of work completed; what is next>\""
  exit 1
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

echo "=== 1. PRE-CLOSE SAFETY CHECKS ==="

# Check 1: Refuse tracked .env files (ignored local .env files do NOT block day-close)
TRACKED_ENV=$(git ls-files 2>/dev/null | grep -E '(^|/)\.env' || true)
if [ -n "$TRACKED_ENV" ]; then
  echo "ERROR: Tracked environment file(s) found in repository index:"
  echo "$TRACKED_ENV"
  exit 1
fi

# Check 2: Check for oversized files (>10MB) among tracked files
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

# Check 3: Secret scan on staged diff and state doc (reports file:line ONLY, never secret content)
SECRET_PATTERN='(BEGIN (RSA|OPENSSH|PGP|EC|DSA) PRIVATE KEY|AKIA[0-9A-Z]{16}|ghp_[0-9a-zA-Z]{36}|github_pat_[0-9a-zA-Z_]{82}|(sk_live|re_)[a-zA-Z0-9]{20,}|(api_key|apiKey|secret_key|secretKey|private_key|password)\s*[:=]\s*["\x27][a-zA-Z0-9_\-]{8,}["\x27])'

SECRET_MATCHES=""
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  STAGED_DIFF=$(git diff --cached 2>/dev/null || true)
  if [ -n "$STAGED_DIFF" ]; then
    MATCH=$(echo "$STAGED_DIFF" | grep -nIE "$SECRET_PATTERN" | cut -d: -f1-2 || true)
    if [ -n "$MATCH" ]; then
      SECRET_MATCHES="staged-diff:$MATCH"
    fi
  fi
fi

if [ -f "docs/STATE.md" ]; then
  MATCH=$(grep -nIE "$SECRET_PATTERN" docs/STATE.md 2>/dev/null | cut -d: -f1-2 || true)
  if [ -n "$MATCH" ]; then
    SECRET_MATCHES="${SECRET_MATCHES}${SECRET_MATCHES:+
}$MATCH"
  fi
fi

if [ -n "$SECRET_MATCHES" ]; then
  echo "ERROR: Potential secret pattern matched at file:line:"
  echo "$SECRET_MATCHES"
  exit 1
fi

echo "Pre-close safety checks: PASS"

echo "=== 2. WORKING TREE STATUS ==="
UNTRACKED=$(git status --porcelain 2>/dev/null | grep '^\?\?' || true)
if [ -n "$UNTRACKED" ]; then
  echo "Notice: Untracked entries present (will NOT be automatically staged):"
  echo "$UNTRACKED"
fi

git status --short 2>/dev/null || echo "Git repository not yet initialized."

echo ""
BRANCH=$(git branch --show-current 2>/dev/null || echo "main")
read -r -p "Update docs/STATE.md, commit, and push to origin $BRANCH? [y/N]: " CONFIRM
if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
  TODAY=$(date +%Y-%m-%d)

  # Rewrite Last Session block in docs/STATE.md
  if [ -f docs/STATE.md ]; then
    python3 -c "
with open('docs/STATE.md', 'r') as f:
    lines = f.readlines()
out = []
skip = False
for line in lines:
    if line.strip() == '## Last Session':
        skip = True
        continue
    if skip and line.startswith('## '):
        skip = False
    if not skip:
        out.append(line)
while out and out[-1].strip() in ('', '---'):
    out.pop()
out.append('\n---\n\n## Last Session\n')
out.append(f'- **Date:** $TODAY\n')
out.append(f'- **Summary:** $MSG\n')
with open('docs/STATE.md', 'w') as f:
    f.writelines(out)
"
    sed -i "s/\*\*Timestamp:\*\* .*/\*\*Timestamp:\*\* $TODAY/" docs/STATE.md
    git add docs/STATE.md
    git commit -m "close: $TODAY — $MSG"

    # Record resulting commit hash into docs/STATE.md
    NEW_HEAD=$(git rev-parse HEAD)
    sed -i "s/- \*\*Summary:\*\* .*/- \*\*HEAD:\*\* $NEW_HEAD\n- \*\*Summary:\*\* $MSG/" docs/STATE.md
    git add docs/STATE.md
    git commit --amend --no-edit
    git push origin "$BRANCH"
    echo "SUCCESS: Day closed and pushed."
    echo "Result Commit: $(git log -1 --format='%H %s')"
  fi
else
  echo "Closed locally. No files modified, committed, or pushed."
fi
