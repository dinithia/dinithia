# Product API

Basic Rudder product API service.

## Modules

```text
src/modules/
├── tenants/         # Multi-tenant organizations
├── customers/       # Customer records within a tenant
├── workflows/       # Workflow definitions and runs
├── users/           # Product users (tenant-scoped)
├── notifications/   # Outbound notification messages
└── audit/           # Audit log of mutating actions
```

## Endpoints

| Method | Path | Module |
|--------|------|--------|
| GET | `/health` | App |
| GET/POST | `/tenants` | tenants |
| GET/PATCH | `/tenants/:id` | tenants |
| GET/POST | `/customers` | customers |
| GET/PATCH | `/customers/:id` | customers |
| GET/POST | `/workflows` | workflows |
| GET/PATCH | `/workflows/:id` | workflows |
| GET/POST | `/users` | users |
| GET/PATCH | `/users/:id` | users |
| GET/POST | `/notifications` | notifications |
| GET | `/notifications/:id` | notifications |
| GET | `/audit` | audit |
| GET | `/audit/:id` | audit |

Data is in-memory for now — suitable for local development and scaffolding.

## Commands

```bash
# from repo root (Rudder/)
pnpm --filter @rudder/product-api install
pnpm --filter @rudder/product-api dev
pnpm --filter @rudder/product-api test
pnpm --filter @rudder/product-api build
```

Default port: `3000` (`PORT` env overrides).
