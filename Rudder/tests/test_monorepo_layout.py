"""Smoke checks for the Rudder monorepo top-level layout."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_DIRS = (
    "apps",
    "services",
    "agents",
    "packages",
    "platform",
    "data",
    "contracts",
    "tests",
    "docs",
    "tools",
    ".github",
)

REQUIRED_FILES = (
    "package.json",
    "pyproject.toml",
    "turbo.json",
    "pnpm-workspace.yaml",
    "README.md",
)


def test_required_directories_exist() -> None:
    missing = [name for name in REQUIRED_DIRS if not (ROOT / name).is_dir()]
    assert missing == [], f"Missing directories: {missing}"


def test_required_root_files_exist() -> None:
    missing = [name for name in REQUIRED_FILES if not (ROOT / name).is_file()]
    assert missing == [], f"Missing files: {missing}"
