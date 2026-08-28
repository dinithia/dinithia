#!/usr/bin/env bash
# Idempotent bootstrap for the Rudder monorepo (JS/TS + Python workspaces).
# Docker CE lives in the Dockerfile; this script only refreshes repo-derived deps.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PATH="/usr/local/bin:$HOME/.local/bin:$PATH"

cd "$repo_root/Rudder"

# JS/TS workspace: use the pnpm version pinned in package.json's packageManager.
corepack enable
pnpm install --frozen-lockfile

# Python workspace: create .venv and install dev extras (pytest, ruff, mypy, pyyaml).
uv sync --all-extras
