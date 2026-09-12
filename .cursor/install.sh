#!/usr/bin/env bash
# Idempotent bootstrap for the Rudder monorepo (JS/TS + Python workspaces).
# Docker CE lives in the Dockerfile; this script refreshes repo-derived deps
# and ensures nested-Docker CLI access works for the agent user.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PATH="/usr/local/bin:$HOME/.local/bin:$PATH"

# Nested Cloud Agent VMs often block non-root access to the docker socket even
# when the user is in the docker group. Prefer a sudo wrapper for reliability.
if ! grep -q 'docker() {' "${HOME}/.bashrc" 2>/dev/null; then
  printf '\n# Cloud Agent nested Docker helper\ndocker() { sudo docker "$@"; }\n' >> "${HOME}/.bashrc"
fi

cd "$repo_root/Rudder"

# JS/TS workspace: use the pnpm version pinned in package.json's packageManager.
corepack enable
pnpm install --frozen-lockfile

# Python workspace: create .venv and install dev extras (pytest, ruff, mypy, pyyaml).
uv sync --all-extras
