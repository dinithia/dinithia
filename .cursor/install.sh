#!/usr/bin/env bash
# Idempotent bootstrap for the Rudder monorepo (JS/TS + Python workspaces).
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# uv drives the Python workspace; install it if the base image lacks it.
if ! command -v uv >/dev/null 2>&1; then
  curl -LsSf https://astral.sh/uv/install.sh | sh
fi
export PATH="$HOME/.local/bin:$PATH"

cd "$repo_root/Rudder"

# JS/TS workspace: use the pnpm version pinned in package.json's packageManager.
corepack enable
pnpm install --frozen-lockfile

# Python workspace: create .venv and install dev extras (pytest, ruff, mypy, pyyaml).
uv sync --all-extras
