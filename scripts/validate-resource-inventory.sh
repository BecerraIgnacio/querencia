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
        items = []
        for part in inner.split(","):
            piece = part.strip().strip("\"'")
            if piece:
                items.append(piece)
        return items
    return value.strip("\"'")


def parse_frontmatter(path: Path):
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        raise ValueError("missing frontmatter")
    parts = text.split("\n---\n", 1)
    if len(parts) != 2:
        raise ValueError("malformed frontmatter")
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


def parse_inventory(path: Path):
    text = path.read_text(encoding="utf-8").splitlines()
    items = {}
    current = None
    current_list_key = None
    for raw in text:
        if re.match(r"^\s*items:\s*$", raw) or not raw.strip():
            continue
        item_match = re.match(r"^\s*-\s+id:\s*(.+?)\s*$", raw)
        if item_match:
            current = {"id": parse_scalar(item_match.group(1))}
            items[current["id"]] = current
            current_list_key = None
            continue
        if current is None:
            continue
        key_match = re.match(r"^\s+([A-Za-z0-9_-]+):\s*(.*)$", raw)
        if key_match:
            key, value = key_match.groups()
            parsed = [] if value == "" else parse_scalar(value)
            current[key] = parsed
            current_list_key = key if value == "" else None
            continue
        list_match = re.match(r"^\s+-\s+(.*)$", raw)
        if list_match and current_list_key:
            existing = current.get(current_list_key, [])
            if not isinstance(existing, list):
                existing = [existing]
            existing.append(parse_scalar(list_match.group(1)))
            current[current_list_key] = existing
    return items


def ensure_known(errors, inventory, ids, label):
    for item in ids:
        if item not in inventory:
            errors.append(f"unknown {label}: {item}")


root = Path(sys.argv[1]).resolve()
if len(sys.argv) < 3:
    print("usage: ./scripts/validate-resource-inventory.sh <leaf-plan-path>", file=sys.stderr)
    sys.exit(2)

plan_path = Path(sys.argv[2])
if not plan_path.is_absolute():
    plan_path = (root / plan_path).resolve()

plan = parse_frontmatter(plan_path)

if plan.get("kind") != "leaf" or plan.get("runnable") is not True:
    print(f"resource inventory validation skipped for non-runnable plan: {plan_path.relative_to(root)}")
    sys.exit(0)

marketplaces = parse_inventory(root / ".claude/inventories/marketplaces.yaml")
plugins = parse_inventory(root / ".claude/inventories/plugins.yaml")
agents = parse_inventory(root / ".claude/inventories/agents.yaml")
skills = parse_inventory(root / ".claude/inventories/skills.yaml")
tools = parse_inventory(root / ".claude/inventories/external-tools.yaml")

errors = []

ensure_known(errors, marketplaces, plan.get("plugin_marketplaces_needed", []), "marketplace")
ensure_known(
    errors,
    plugins,
    plan.get("fixed_transversal_plugins", [])
    + plan.get("required_plugins", [])
    + plan.get("optional_plugins", [])
    + plan.get("install_plugins", [])
    + plan.get("remove_plugins_after", [])
    + plan.get("keep_plugins_persistent", []),
    "plugin",
)
ensure_known(
    errors,
    agents,
    plan.get("fixed_transversal_agents", [])
    + plan.get("required_agents", [])
    + plan.get("optional_agents", [])
    + plan.get("install_agents", [])
    + plan.get("remove_agents_after", [])
    + plan.get("keep_agents_persistent", []),
    "agent",
)
ensure_known(
    errors,
    skills,
    plan.get("fixed_transversal_skills", [])
    + plan.get("required_skills", [])
    + plan.get("optional_skills", [])
    + plan.get("install_skills", [])
    + plan.get("remove_skills_after", [])
    + plan.get("keep_skills_persistent", []),
    "skill",
)
ensure_known(errors, tools, plan.get("external_tools_required", []), "external tool")

for plugin_id in plan.get("fixed_transversal_plugins", []):
    if not plugins[plugin_id].get("protected", False):
        errors.append(f"fixed_transversal_plugins must reference protected plugins: {plugin_id}")

for agent_id in plan.get("fixed_transversal_agents", []):
    if not agents[agent_id].get("protected", False):
        errors.append(f"fixed_transversal_agents must reference protected agents: {agent_id}")

for skill_id in plan.get("fixed_transversal_skills", []):
    if not skills[skill_id].get("protected", False):
        errors.append(f"fixed_transversal_skills must reference protected skills: {skill_id}")

for tool_id in plan.get("external_tools_required", []):
    if tool_id in tools and not tools[tool_id].get("protected", False):
        errors.append(f"external_tools_required should reference protected baseline tools: {tool_id}")

for collection_name in ["install_plugins", "remove_plugins_after", "keep_plugins_persistent"]:
    for plugin_id in plan.get(collection_name, []):
        if plugin_id in plugins and plugins[plugin_id].get("protected", False):
            errors.append(f"protected plugin cannot appear in {collection_name}: {plugin_id}")

for collection_name in ["install_agents", "remove_agents_after", "keep_agents_persistent"]:
    for agent_id in plan.get(collection_name, []):
        if agent_id in agents and agents[agent_id].get("protected", False):
            errors.append(f"protected agent cannot appear in {collection_name}: {agent_id}")

for collection_name in ["install_skills", "remove_skills_after", "keep_skills_persistent"]:
    for skill_id in plan.get(collection_name, []):
        if skill_id in skills and skills[skill_id].get("protected", False):
            errors.append(f"protected skill cannot appear in {collection_name}: {skill_id}")

if plan.get("prefer_rtk_for_validation") is True and "rtk" not in plan.get("external_tools_required", []):
    errors.append("prefer_rtk_for_validation requires external_tools_required to include rtk")

if plan.get("consult_claude_mem") is True and "claude-mem" not in plan.get("fixed_transversal_plugins", []):
    errors.append("consult_claude_mem requires fixed_transversal_plugins to include claude-mem")

if errors:
    print(f"resource inventory validation failed: {plan_path.relative_to(root)}", file=sys.stderr)
    for error in errors:
        print(f"- {error}", file=sys.stderr)
    sys.exit(1)

print(f"resource inventory validation passed: {plan_path.relative_to(root)}")
PY

