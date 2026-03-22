#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"

python3 - "$REPO_ROOT" "$@" <<'PY'
import re
import sys
from pathlib import Path


def parse_scalar(value: str):
    value = value.strip()
    if value == "[]":
        return []
    if value.lower() == "true":
        return True
    if value.lower() == "false":
        return False
    if value.startswith("[") and value.endswith("]"):
        inner = value[1:-1].strip()
        if not inner:
            return []
        return [part.strip().strip("\"'") for part in inner.split(",") if part.strip()]
    return value.strip("\"'")


def parse_frontmatter(path: Path):
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        return None
    parts = text.split("\n---\n", 1)
    if len(parts) != 2:
        return None
    data = {}
    current_key = None
    for raw in parts[0].splitlines()[1:]:
        if not raw.strip():
            continue
        key_match = re.match(r"^([A-Za-z0-9_-]+):\s*(.*)$", raw)
        if key_match:
            key, value = key_match.groups()
            data[key] = [] if value == "" else parse_scalar(value)
            current_key = key if value == "" else None
            continue
        list_match = re.match(r"^\s*-\s+(.*)$", raw)
        if list_match and current_key:
            existing = data.get(current_key, [])
            if not isinstance(existing, list):
                existing = [existing]
            existing.append(parse_scalar(list_match.group(1)))
            data[current_key] = existing
    return data


def iter_active_plan_files(root: Path):
    plans_root = root / "docs" / "plans"
    for path in sorted(plans_root.rglob("*.md")):
        if "/archive/" in path.as_posix():
            continue
        if path.name.startswith("_") or path.name == "index.md":
            continue
        yield path


root = Path(sys.argv[1]).resolve()
mode = "--ready"
if len(sys.argv) >= 3:
    mode = sys.argv[2]
if mode not in {"--ready", "--all"}:
    print("usage: ./scripts/list-runnable-plans.sh [--ready|--all]", file=sys.stderr)
    sys.exit(2)

plans = []
for path in iter_active_plan_files(root):
    data = parse_frontmatter(path)
    if not data:
        continue
    plans.append((path, data))

completed_ids = {data.get("id") for _, data in plans if data.get("status") == "completed"}


def computed_state(data):
    status = data.get("status")
    if status == "completed":
        return "completed"
    if status == "in_progress":
        return "in_progress"
    if status == "archived":
        return "archived"
    deps = data.get("depends_on", [])
    missing = [dep for dep in deps if dep not in completed_ids]
    if missing:
        return "blocked"
    return "ready"


rows = []
for path, data in plans:
    if data.get("kind") != "leaf" or data.get("runnable") is not True:
        continue
    state = computed_state(data)
    rows.append(
        (
            data.get("id", ""),
            state,
            data.get("status", ""),
            data.get("title", ""),
            ",".join(data.get("depends_on", [])),
            str(path.relative_to(root)),
        )
    )

for row in rows:
    if mode == "--ready" and row[1] != "ready":
        continue
    print(" | ".join(row))
PY

