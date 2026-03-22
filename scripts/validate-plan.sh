#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"

python3 - "$REPO_ROOT" "$@" <<'PY'
import re
import sys
from pathlib import Path


VALID_KINDS = {"leaf", "phase", "track"}
VALID_STATUSES = {"proposed", "ready", "blocked", "in_progress", "completed", "archived"}
VALID_EXECUTION_MODES = {"manual", "agent-team", "ralph-loop"}

LEAF_REQUIRED_KEYS = [
    "id",
    "title",
    "kind",
    "runnable",
    "status",
    "phase",
    "track",
    "module",
    "depends_on",
    "unlocks",
    "owned_paths",
    "affected_paths",
    "read_first",
    "minimal_context",
    "plugin_marketplaces_needed",
    "fixed_transversal_plugins",
    "required_plugins",
    "optional_plugins",
    "install_plugins",
    "remove_plugins_after",
    "keep_plugins_persistent",
    "external_tools_required",
    "fixed_transversal_agents",
    "required_agents",
    "optional_agents",
    "install_agents",
    "remove_agents_after",
    "keep_agents_persistent",
    "fixed_transversal_skills",
    "required_skills",
    "optional_skills",
    "install_skills",
    "remove_skills_after",
    "keep_skills_persistent",
    "consult_claude_mem",
    "prefer_rtk_for_validation",
    "execution_mode",
    "entry_prompt",
    "stop_conditions",
    "handoff_updates",
]

LEAF_LIST_KEYS = {
    "depends_on",
    "unlocks",
    "owned_paths",
    "affected_paths",
    "read_first",
    "minimal_context",
    "plugin_marketplaces_needed",
    "fixed_transversal_plugins",
    "required_plugins",
    "optional_plugins",
    "install_plugins",
    "remove_plugins_after",
    "keep_plugins_persistent",
    "external_tools_required",
    "fixed_transversal_agents",
    "required_agents",
    "optional_agents",
    "install_agents",
    "remove_agents_after",
    "keep_agents_persistent",
    "fixed_transversal_skills",
    "required_skills",
    "optional_skills",
    "install_skills",
    "remove_skills_after",
    "keep_skills_persistent",
    "stop_conditions",
    "handoff_updates",
}

LEAF_REQUIRED_SECTIONS = [
    "## Objective",
    "## Scope",
    "## Out Of Scope",
    "## Risks Or Impacts",
    "## Definition Of Done",
    "## Stop Conditions",
    "## Expected Validations",
    "## Handoff Updates",
]

NONRUNNABLE_REQUIRED_KEYS = [
    "id",
    "title",
    "kind",
    "runnable",
    "status",
    "phase",
    "track",
    "depends_on",
    "child_plans",
    "read_first",
    "unlocks",
]

NONRUNNABLE_LIST_KEYS = {
    "depends_on",
    "child_plans",
    "read_first",
    "unlocks",
}

NONRUNNABLE_REQUIRED_SECTIONS = [
    "## Objective",
    "## Sequencing",
    "## Entry Criteria",
    "## Exit Criteria",
    "## Child Plans",
]


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
        items = []
        for part in inner.split(","):
            piece = part.strip().strip("\"'")
            if piece:
                items.append(piece)
        return items
    return value.strip("\"'")


def parse_frontmatter(text: str):
    if not text.startswith("---\n"):
        raise ValueError("missing frontmatter")
    parts = text.split("\n---\n", 1)
    if len(parts) != 2:
        raise ValueError("malformed frontmatter")
    frontmatter = parts[0].splitlines()[1:]
    body = parts[1]
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
    return data, body


def require_sections(errors, body, sections):
    for section in sections:
        if section not in body:
            errors.append(f"missing section: {section}")


def ensure_list_types(errors, data, keys):
    for key in keys:
        if key in data and not isinstance(data[key], list):
            errors.append(f"frontmatter key must be a list: {key}")


root = Path(sys.argv[1]).resolve()
if len(sys.argv) < 3:
    print("usage: ./scripts/validate-plan.sh <plan-path>", file=sys.stderr)
    sys.exit(2)

plan_path = Path(sys.argv[2])
if not plan_path.is_absolute():
    plan_path = (root / plan_path).resolve()

text = plan_path.read_text(encoding="utf-8")
data, body = parse_frontmatter(text)
errors = []

kind = data.get("kind")
status = data.get("status")
runnable = data.get("runnable")

if kind not in VALID_KINDS:
    errors.append("kind must be one of: leaf, phase, track")

if status not in VALID_STATUSES:
    errors.append("status must be one of: proposed, ready, blocked, in_progress, completed, archived")

if kind == "leaf":
    for key in LEAF_REQUIRED_KEYS:
        if key not in data:
            errors.append(f"missing frontmatter key: {key}")
    ensure_list_types(errors, data, LEAF_LIST_KEYS)
    require_sections(errors, body, LEAF_REQUIRED_SECTIONS)
    if runnable is not True:
        errors.append("leaf plans must declare runnable: true")
    if data.get("execution_mode") not in VALID_EXECUTION_MODES:
        errors.append("execution_mode must be one of: manual, agent-team, ralph-loop")
    if data.get("entry_prompt") != f"develop #{data.get('id', '')}":
        errors.append("entry_prompt must exactly match: develop #<plan-id>")
    for key in ["owned_paths", "affected_paths", "read_first", "minimal_context", "stop_conditions", "handoff_updates"]:
        if key in data and not data[key]:
            errors.append(f"{key} must not be empty")

elif kind in {"phase", "track"}:
    for key in NONRUNNABLE_REQUIRED_KEYS:
        if key not in data:
            errors.append(f"missing frontmatter key: {key}")
    ensure_list_types(errors, data, NONRUNNABLE_LIST_KEYS)
    require_sections(errors, body, NONRUNNABLE_REQUIRED_SECTIONS)
    if runnable is not False:
        errors.append("phase and track docs must declare runnable: false")
    if "read_first" in data and not data["read_first"]:
        errors.append("read_first must not be empty")

if kind == "phase" and data.get("id") != "P-000" and not re.match(r"^M[1-9]-P\d+$", str(data.get("id", ""))):
    errors.append("phase docs should use phase IDs such as M1-P01 or the completed P-000 baseline")

if kind == "track" and data.get("id") == "P-000":
    pass
elif kind == "track" and not re.match(r"^M[2-9]-T\d+$", str(data.get("id", ""))):
    errors.append("future track docs should use IDs such as M2-T01")

if errors:
    print(f"plan validation failed: {plan_path.relative_to(root)}", file=sys.stderr)
    for error in errors:
        print(f"- {error}", file=sys.stderr)
    sys.exit(1)

print(f"plan validation passed: {plan_path.relative_to(root)}")
PY
