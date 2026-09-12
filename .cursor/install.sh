#!/usr/bin/env bash
# Idempotent bootstrap for the Rudder monorepo (JS/TS + Python workspaces).
#
# The default Cloud Agent image already provides Node 20+, corepack, and
# python3. It does not ship `uv`, so we install that stable toolchain here
# (a single, cache-friendly step) and then refresh repo-derived dependencies.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PATH="$HOME/.local/bin:/usr/local/bin:$PATH"

# uv: Python workspace package manager. Not in the base image; install once.
if ! command -v uv >/dev/null 2>&1; then
  curl -LsSf https://astral.sh/uv/install.sh | sh
fi

cd "$repo_root/Rudder"

# JS/TS workspace: use the pnpm version pinned in package.json's packageManager.
corepack enable
pnpm install --frozen-lockfile

# Python workspace: create .venv and install dev extras (pytest, ruff, mypy, pyyaml).
uv sync --all-extras
