#!/usr/bin/env python3
import hashlib
import json
import subprocess
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
REPO_ROOT = BASE_DIR.parent.parent  # proofkit/V15_GLOBAL_SEAL -> proofkit -> repo root

MANIFEST_FILE = BASE_DIR / "MASTER_MANIFEST_V15.json"
ROOT_FILE = BASE_DIR / "ROOT_HASH_V15.txt"
META_FILE = BASE_DIR / "SEAL_META_V15.json"


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    return sha256_bytes(path.read_bytes())


def git_ls_files():
    result = subprocess.run(
        ["git", "ls-files"],
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        check=True,
    )
    return sorted(result.stdout.strip().splitlines())


def verify_manifest():
    manifest = json.loads(MANIFEST_FILE.read_text())
    errors = []

    for path, expected_hash in sorted(manifest.items()):
        file_path = REPO_ROOT / path

        if not file_path.exists():
            errors.append(f"Missing file: {path}")
            continue

        actual_hash = sha256_file(file_path)
        if actual_hash != expected_hash:
            errors.append(f"Hash mismatch: {path}")

    return errors


def compute_root_from_manifest():
    manifest = json.loads(MANIFEST_FILE.read_text())
    sorted_items = sorted(manifest.items())  # path-ordered
    concat = "".join(hash for _, hash in sorted_items).encode()
    return sha256_bytes(concat)


def compute_global_seal():
    manifest_hash = sha256_file(MANIFEST_FILE)
    root_file_hash = sha256_file(ROOT_FILE)
    concat = (manifest_hash + "\n" + root_file_hash + "\n").encode()
    return sha256_bytes(concat)


def main():
    print("Verifying V15 GLOBAL SEAL...")

    # 1️⃣ Manifest integrity
    errors = verify_manifest()
    if errors:
        print("FAIL — Manifest integrity errors:")
        for e in errors:
            print("  ", e)
        sys.exit(1)

    # 2️⃣ Root hash check
    computed_root = compute_root_from_manifest()
    declared_root = ROOT_FILE.read_text().strip()

    if computed_root != declared_root:
        print("FAIL — ROOT_HASH mismatch")
        print("Computed :", computed_root)
        print("Declared :", declared_root)
        sys.exit(1)

    # 3️⃣ Global seal check
    meta = json.loads(META_FILE.read_text())
    declared_global = meta["GLOBAL_SEAL_HASH"]
    computed_global = compute_global_seal()

    if computed_global != declared_global:
        print("FAIL — GLOBAL_SEAL_HASH mismatch")
        print("Computed :", computed_global)
        print("Declared :", declared_global)
        sys.exit(1)

    print("PASS")
    sys.exit(0)


if __name__ == "__main__":
    main()
