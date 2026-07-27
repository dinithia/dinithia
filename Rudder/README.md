# Rudder

Monorepo for Rudder, organized by deployable applications, reusable packages, platform infrastructure, and architectural domains.

## Layout

```text
├── apps/          # Deployable user-facing applications (web, mobile, desktop)
├── services/      # Deployable backend services (e.g. product-api)
├── agents/        # Deployable AI / automation agents and workers
├── packages/      # Reusable libraries shared across apps, services, and agents
├── platform/      # Platform infra + identity (authn, authz, user-management)
├── data/          # Data pipelines, schemas, and seeds
├── contracts/     # Cross-cutting API and event contracts (OpenAPI, protobuf, events)
├── tests/         # Cross-cutting e2e, integration, and performance tests
├── docs/          # Architecture, guides, and ADRs
├── tools/         # Internal developer tooling, scripts, and generators
└── .github/       # GitHub Actions workflows and repository automation
```

## Organization principles

| Area | Purpose |
|------|---------|
| **Deployables** (`apps/`, `services/`, `agents/`) | Independently buildable and shippable units |
| **Reusable packages** (`packages/`) | Shared libraries consumed by deployables |
| **Platform** (`platform/`) | How we run, observe, secure, and identity-manage the system |
| **Domains** (`data/`, `contracts/`) | Cross-cutting domain artifacts and interfaces |

## Tooling

| Tool | Role |
|------|------|
| **pnpm** | JavaScript / TypeScript workspace (`pnpm-workspace.yaml`) |
| **Turborepo** | Task orchestration and caching (`turbo.json`) |
| **uv / pyproject** | Python workspace (`pyproject.toml`) |

## Getting started

```bash
# JavaScript / TypeScript
pnpm install
pnpm build
pnpm test

# Python (with uv)
uv sync
uv run pytest
```

## Conventions

- Prefer one deployable per directory under `apps/`, `services/`, or `agents/`.
- Put shared code in `packages/` instead of copying across deployables.
- Keep interface definitions in `contracts/`; keep implementation in deployables or packages.
- Document significant architectural decisions as ADRs under `docs/adr/`.
