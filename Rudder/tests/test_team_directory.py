"""Validate the Rudder team directory: users, roles, and access membership."""

from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
TEAM = ROOT / "team"


def _load(path: Path) -> dict:
    return yaml.safe_load(path.read_text())


def test_team_structure_exists() -> None:
    required = [
        TEAM / "README.md",
        TEAM / "ACCESS.md",
        TEAM / "directory.yaml",
        TEAM / "roles" / "roles.yaml",
        TEAM / "users",
    ]
    missing = [str(p.relative_to(ROOT)) for p in required if not p.exists()]
    assert missing == [], f"Missing team paths: {missing}"


def test_directory_policy_denies_by_default() -> None:
    directory = _load(TEAM / "directory.yaml")
    policy = directory["policy"]
    assert policy["require_directory_membership"] is True
    assert policy["require_defined_role"] is True
    assert policy["deny_by_default"] is True


def test_every_member_has_user_file_and_valid_role() -> None:
    directory = _load(TEAM / "directory.yaml")
    roles_doc = _load(TEAM / "roles" / "roles.yaml")
    known_roles = {role["id"] for role in roles_doc["roles"]}

    assert directory["members"], "Team directory must list at least one member"

    for member in directory["members"]:
        assert member["role"] in known_roles, (
            f"{member['github']} has unknown role {member['role']!r}"
        )
        assert member["status"] in {"active", "inactive"}
        user_file = TEAM / member["user_file"]
        assert user_file.is_file(), f"Missing user file for {member['github']}: {user_file}"

        user = _load(user_file)
        assert user["github"] == member["github"]
        assert user["role"] == member["role"]
        assert user["status"] == member["status"]


def test_user_files_are_registered_in_directory() -> None:
    directory = _load(TEAM / "directory.yaml")
    registered = {member["github"] for member in directory["members"]}

    user_files = [
        path
        for path in (TEAM / "users").glob("*.yaml")
        if path.name != "_template.yaml"
    ]
    assert user_files, "Expected at least one user file"

    for path in user_files:
        user = _load(path)
        assert path.stem == user["github"], (
            f"User file {path.name} must be named {{github}}.yaml"
        )
        assert user["github"] in registered, (
            f"User {user['github']} has a profile but is not in directory.yaml"
        )


def test_active_members_can_view_and_role_gates_changes() -> None:
    directory = _load(TEAM / "directory.yaml")
    roles = {
        role["id"]: role for role in _load(TEAM / "roles" / "roles.yaml")["roles"]
    }

    active = [m for m in directory["members"] if m["status"] == "active"]
    assert active, "At least one active member is required"

    for member in active:
        role = roles[member["role"]]
        assert role["can_view"] is True, f"{member['github']} role cannot view the repo"
        if member["role"] == "viewer":
            assert role["can_change"] is False
        else:
            assert role["can_change"] is True


def test_layout_includes_team_directory() -> None:
    assert (ROOT / "team").is_dir()
