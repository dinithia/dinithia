# Platform

Platform infrastructure and operational foundations.

| Directory | Purpose |
|-----------|---------|
| `authentication/` | Identity verification — IdPs, sessions, tokens, MFA |
| `authorization/` | Access control — RBAC roles, permissions, policy-as-code |
| `user-management/` | User lifecycle, profiles, and organizations / tenancy |
| `infra/` | Infrastructure as code, environments, networking |
| `ci/` | Shared CI configuration and reusable pipelines |
| `observability/` | Logging, metrics, tracing, dashboards |
| `security/` | Policies, secrets conventions, hardening |

## Identity stack

```text
┌─────────────────────────────────────────────────────────┐
│                   user-management/                      │
│         users · profiles · orgs · lifecycle             │
└───────────────────────────┬─────────────────────────────┘
                            │
          ┌─────────────────┴─────────────────┐
          ▼                                   ▼
┌─────────────────────┐             ┌─────────────────────┐
│  authentication/    │             │  authorization/     │
│  who are you?       │────────────▶│  what can you do?   │
└─────────────────────┘             └─────────────────────┘
```

- **Authentication** establishes identity (subjects, sessions, tokens).
- **Authorization** evaluates permissions for an authenticated subject.
- **User management** owns the user and organization records those systems act on.

API contracts for these capabilities live under `contracts/openapi/platform/`.
Architecture overview: `docs/architecture/identity.md`.
