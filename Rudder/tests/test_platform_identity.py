"""Smoke checks for platform identity (authn, authz, user-management)."""

from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
PLATFORM = ROOT / "platform"


def test_identity_directories_exist() -> None:
    required = [
        PLATFORM / "authentication" / "providers",
        PLATFORM / "authentication" / "sessions",
        PLATFORM / "authentication" / "policies",
        PLATFORM / "authorization" / "rbac",
        PLATFORM / "authorization" / "policies",
        PLATFORM / "authorization" / "models",
        PLATFORM / "user-management" / "lifecycle",
        PLATFORM / "user-management" / "profiles",
        PLATFORM / "user-management" / "organizations",
    ]
    missing = [str(path.relative_to(ROOT)) for path in required if not path.is_dir()]
    assert missing == [], f"Missing directories: {missing}"


def test_openapi_contracts_exist() -> None:
    contracts = ROOT / "contracts" / "openapi" / "platform"
    for name in ("authentication.yaml", "authorization.yaml", "user-management.yaml"):
        assert (contracts / name).is_file(), f"Missing OpenAPI contract: {name}"


def test_rbac_roles_reference_known_permissions() -> None:
    permissions_doc = yaml.safe_load(
        (PLATFORM / "authorization" / "rbac" / "permissions.yaml").read_text()
    )
    roles_doc = yaml.safe_load((PLATFORM / "authorization" / "rbac" / "roles.yaml").read_text())

    known = {item["id"] for item in permissions_doc["permissions"]}
    assert known, "Permission catalog must not be empty"

    for role in roles_doc["roles"]:
        unknown = set(role["permissions"]) - known
        assert not unknown, f"Role {role['id']} references unknown permissions: {unknown}"


def test_lifecycle_states_are_connected() -> None:
    doc = yaml.safe_load((PLATFORM / "user-management" / "lifecycle" / "states.yaml").read_text())
    states = set(doc["states"])
    for transition in doc["transitions"]:
        assert transition["from"] in states
        assert transition["to"] in states
