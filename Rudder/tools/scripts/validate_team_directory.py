#!/usr/bin/env python3
"""Validate team/directory.yaml against roles and user files.

Exit codes:
  0 — directory is consistent
  1 — validation errors
"""

from __future__ import annotations

import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]
TEAM = ROOT / "team"


def main() -> int:
    errors: list[str] = []
    directory = yaml.safe_load((TEAM / "directory.yaml").read_text())
    roles_doc = yaml.safe_load((TEAM / "roles" / "roles.yaml").read_text())
    known_roles = {role["id"] for role in roles_doc["roles"]}

    policy = directory.get("policy") or {}
    for key in ("require_directory_membership", "require_defined_role", "deny_by_default"):
        if policy.get(key) is not True:
            errors.append(f"policy.{key} must be true")

    members = directory.get("members") or []
    if not members:
        errors.append("directory.yaml members list is empty")

    seen: set[str] = set()
    for member in members:
        github = member.get("github")
        role = member.get("role")
        status = member.get("status")
        user_file = member.get("user_file")

        if not github:
            errors.append("member missing github")
            continue
        if github in seen:
            errors.append(f"duplicate member: {github}")
        seen.add(github)

        if role not in known_roles:
            errors.append(f"{github}: unknown role {role!r}")
        if status not in {"active", "inactive"}:
            errors.append(f"{github}: invalid status {status!r}")

        path = TEAM / user_file if user_file else None
        if not path or not path.is_file():
            errors.append(f"{github}: missing user file {user_file!r}")
            continue

        user = yaml.safe_load(path.read_text())
        if user.get("github") != github:
            errors.append(f"{github}: user file github mismatch")
        if user.get("role") != role:
            errors.append(f"{github}: user file role mismatch")
        if user.get("status") != status:
            errors.append(f"{github}: user file status mismatch")

    for path in (TEAM / "users").glob("*.yaml"):
        if path.name == "_template.yaml":
            continue
        user = yaml.safe_load(path.read_text())
        if user.get("github") not in seen:
            errors.append(f"{path.name}: not listed in directory.yaml")
        if path.stem != user.get("github"):
            errors.append(f"{path.name}: filename must match github username")

    if errors:
        print("Team directory validation failed:")
        for error in errors:
            print(f"  - {error}")
        return 1

    active = sum(1 for m in members if m.get("status") == "active")
    print(f"Team directory OK ({active} active / {len(members)} total members)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
