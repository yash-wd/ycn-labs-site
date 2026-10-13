#!/usr/bin/env bash
# YCN Labs — Close Preflight Check (Read-Only)
# Implements Steps A-B of docs/CLOSE_PROTOCOL.md (YCN-CLOSE-PROTOCOL-01)
# Scans registered locations, computes SHA-256 hashes, checks duplicates against repos/vault,
# and prints a file disposition inventory table. Changes nothing on disk.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
BRAND_DIR="/home/ycn-labs/Desktop/YCN_LABS_MASTER/01_CURRENT_PROJECT/YCN_LABS_BRAND_LIBRARY"
VAULT_DIR="/home/ycn-labs/Desktop/YCN_LABS_MASTER"
DOWNLOADS_DIR="/home/ycn-labs/Downloads"
DESKTOP_DIR="/home/ycn-labs/Desktop"
LAST_CLOSE_FILE="${VAULT_DIR}/LAST_CLOSE.txt"

echo "================================================================================"
echo "YCN LABS — CLOSE PREFLIGHT RECONCILIATION INVENTORY (READ-ONLY)"
echo "Timestamp: $(date -Iseconds)"
echo "================================================================================"

# Execute Python engine for robust cryptographic hashing and comparison
python3 - << 'PYEOF'
import sys, os, hashlib, re
from pathlib import Path
from datetime import datetime

site_dir = Path("/home/ycn-labs/Desktop/ycn-labs-site")
brand_dir = Path("/home/ycn-labs/Desktop/YCN_LABS_MASTER/01_CURRENT_PROJECT/YCN_LABS_BRAND_LIBRARY")
vault_dir = Path("/home/ycn-labs/Desktop/YCN_LABS_MASTER")
downloads_dir = Path("/home/ycn-labs/Downloads")
desktop_dir = Path("/home/ycn-labs/Desktop")
last_close_file = vault_dir / "LAST_CLOSE.txt"
protected_desktop_logo = desktop_dir / "Main_YCN_LABS_logo_black_8K.png"

# Read last close timestamp if available
last_close_mtime = 0.0
if last_close_file.exists():
    try:
        content = last_close_file.read_text().strip()
        for line in content.splitlines():
            if line.startswith("timestamp:"):
                ts_str = line.split(":", 1)[1].strip()
                # Parse ISO timestamp
                dt = datetime.fromisoformat(ts_str.replace("Z", "+00:00"))
                last_close_mtime = dt.timestamp()
                break
    except Exception:
        last_close_mtime = last_close_file.stat().st_mtime

print(f"Registered working directories:")
print(f"  - Website Repository: {site_dir}")
print(f"  - Brand Library:      {brand_dir}")
print(f"  - Local Vault:        {vault_dir}")
print(f"  - Downloads:          {downloads_dir}")
print(f"  - Desktop Root:       {desktop_dir}")
if last_close_mtime > 0:
    print(f"  - Last Close Filter:  Files modified after {datetime.fromtimestamp(last_close_mtime).isoformat()}")
else:
    print(f"  - Last Close Filter:  None (full scan of candidate names)")
print("-" * 80)

def sha256_file(p: Path) -> str:
    try:
        h = hashlib.sha256()
        with open(p, "rb") as f:
            while chunk := f.read(65536):
                h.update(chunk)
        return h.hexdigest()
    except Exception:
        return "ERROR"

# Index known files in repos and vault (hash -> path)
known_hashes = {}

def index_dir(d: Path, label: str):
    if not d.exists():
        return
    for root, dirs, files in os.walk(d):
        if ".git" in dirs:
            dirs.remove(".git")
        if "node_modules" in dirs:
            dirs.remove("node_modules")
        if ".next" in dirs:
            dirs.remove(".next")
        for f in files:
            fp = Path(root) / f
            if fp.is_file() and not fp.is_symlink():
                try:
                    # Index files <= 50MB to keep preflight snappy
                    if fp.stat().st_size <= 52428800:
                        h = sha256_file(fp)
                        if h != "ERROR" and h not in known_hashes:
                            known_hashes[h] = (fp, label)
                except Exception:
                    pass

print("Indexing reference repository and vault checksums...")
index_dir(site_dir, "ycn-labs-site")
index_dir(brand_dir, "ycn-labs-brand-library")
index_dir(vault_dir / "01_CURRENT_PROJECT", "vault")

# Discover candidates in Downloads, Desktop top-level, and AGY scratch
candidates = []
ycn_pattern = re.compile(r"(ycn|brand|logo|claude|gpt|agy)", re.IGNORECASE)

# 1. Downloads (recursive)
if downloads_dir.exists():
    for root, dirs, files in os.walk(downloads_dir):
        for f in files:
            fp = Path(root) / f
            if not fp.is_file() or fp.is_symlink():
                continue
            is_ycn = bool(ycn_pattern.search(fp.name))
            is_recent = fp.stat().st_mtime >= last_close_mtime if last_close_mtime > 0 else False
            if is_ycn or (is_recent and not fp.name.startswith(".")):
                candidates.append((fp, "Downloads"))

# 2. Desktop top-level only
if desktop_dir.exists():
    for fp in desktop_dir.iterdir():
        if fp.is_file() and not fp.is_symlink() and not fp.name.startswith("."):
            is_ycn = bool(ycn_pattern.search(fp.name))
            is_recent = fp.stat().st_mtime >= last_close_mtime if last_close_mtime > 0 else False
            if is_ycn or is_recent:
                candidates.append((fp, "Desktop"))

# 3. Scratch directories
scratch_base = Path("/home/ycn-labs/.gemini/antigravity-ide/brain")
if scratch_base.exists():
    for sc in scratch_base.glob("*/scratch/*"):
        if sc.is_file() and not sc.name.startswith("."):
            candidates.append((sc, "AGY Scratch"))

print(f"Total candidate files discovered: {len(candidates)}")
print("=" * 80)
print(f"{'SOURCE PATH':<45} | {'SIZE':<9} | {'DISPOSITION':<18} | DESTINATION / MATCH")
print("-" * 80)

if not candidates:
    print("Zero active unclassified candidates discovered in registered locations.")
    print("Working locations are fully reconciled with repositories and vault.")

for fp, src_type in candidates:
    size = fp.stat().st_size
    size_str = f"{size:,} B"
    h = sha256_file(fp)
    
    # Check protection
    if fp.resolve() == protected_desktop_logo.resolve():
        disposition = "PROTECTED_MASTER"
        dest = "Permanent Desktop Master Anchor"
    elif h in known_hashes:
        match_path, match_repo = known_hashes[h]
        disposition = "EXACT_DUPLICATE"
        dest = f"Matches {match_repo}: {match_path.name}"
    else:
        # Determine classification
        name_lower = fp.name.lower()
        if any(k in name_lower for k in ["logo", "brand", "ruling", "palette", "vector"]):
            disposition = "ROUTE_BRAND"
            dest = "ycn-labs-brand-library (candidate folder)"
        elif any(k in name_lower for k in [".tsx", ".ts", ".css", "component", "site"]):
            disposition = "ROUTE_SITE"
            dest = "ycn-labs-site"
        elif any(k in name_lower for k in ["audit", "roadmap", "security", "vault", "pack", "secret"]) or size > 26214400:
            disposition = "ROUTE_VAULT"
            dest = f"YCN_LABS_MASTER/01_CURRENT_PROJECT/_INTAKE/{datetime.now().strftime('%Y-%m-%d')}/"
        else:
            disposition = "UNRESOLVED_INTAKE"
            dest = "YCN_LABS_MASTER/.../_INTAKE/UNSORTED/"
            
    # Format row
    display_path = str(fp)
    if len(display_path) > 45:
        display_path = "..." + display_path[-42:]
    print(f"{display_path:<45} | {size_str:<9} | {disposition:<18} | {dest}")

print("=" * 80)
print("Preflight check complete. No files were modified, moved, or deleted.")
PYEOF
