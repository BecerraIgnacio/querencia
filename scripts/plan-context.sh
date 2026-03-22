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
        parts = []
        for part in inner.split(","):
            item = part.strip().strip("\"'")
            if item:
                parts.append(item)
        return parts
    return value.strip("\"'")


def parse_frontmatter(path: Path):
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        raise ValueError(f"{path} is missing frontmatter")
    parts = text.split("\n---\n", 1)
    if len(parts) != 2:
        raise ValueError(f"{path} has malformed frontmatter")
    frontmatter = parts[0].splitlines()[1:]
    data = {}
    current_key = None
    for raw in frontmatter:
        if not raw.strip():
            continue
        key_match = re.match(r"^([A-Za-z0-9_-]+):\s*(.*)$", raw)
        if key_match:
            key, value = key_match.groups()
            parsed = [] if value == "" else parse_scalar(value)
            data[key] = parsed
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


def resolve_path(root: Path, raw: str) -> Path:
    candidate = Path(raw)
    if candidate.is_absolute():
        return candidate
    return (root / candidate).resolve()


def iter_active_plan_files(root: Path):
    plans_root = root / "docs" / "plans"
    for path in sorted(plans_root.rglob("*.md")):
        if "/archive/" in path.as_posix():
            continue
        if path.name.startswith("_") or path.name == "index.md":
            continue
        yield path


def resolve_plan(root: Path, target: str) -> Path:
    raw = target.strip()
    if raw.startswith("#"):
        raw = raw[1:]
    direct = resolve_path(root, raw)
    if direct.exists():
        return direct
    matches = []
    for path in iter_active_plan_files(root):
        try:
            data = parse_frontmatter(path)
        except ValueError:
            continue
        if data.get("id") == raw:
            matches.append(path)
    if not matches:
        raise FileNotFoundError(f"no plan found for target: {target}")
    if len(matches) > 1:
        raise ValueError(f"multiple plans found for target: {target}")
    return matches[0]


root = Path(sys.argv[1]).resolve()
if len(sys.argv) < 3:
    print("usage: ./scripts/plan-context.sh M1-001|M2-001|#M3-001|docs/plans/.../leaf-plan.md", file=sys.stderr)
    sys.exit(2)

plan_path = resolve_plan(root, sys.argv[2])
plan = parse_frontmatter(plan_path)

if plan.get("kind") != "leaf" or plan.get("runnable") is not True:
    print("plan-context accepts only runnable leaf plans", file=sys.stderr)
    sys.exit(1)

paths = []


def add(path: Path):
    if path.exists() and path not in paths:
        paths.append(path)


add(root / "CLAUDE.md")
add(plan_path)

for item in plan.get("read_first", []):
    if isinstance(item, str):
        add(resolve_path(root, item))

for item in plan.get("minimal_context", []):
    if isinstance(item, str):
        add(resolve_path(root, item))

for raw in plan.get("owned_paths", []) + plan.get("affected_paths", []):
    if not isinstance(raw, str):
        continue
    current = resolve_path(root, raw)
    if not current.exists():
        current = current.parent
    if current.is_file():
        current = current.parent
    while True:
        claude_path = current / "CLAUDE.md"
        add(claude_path)
        if current == root or current.parent == current:
            break
        current = current.parent

for path in paths:
    print(path.relative_to(root))
PY
