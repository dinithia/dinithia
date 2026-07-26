# Identity architecture

Rudder's platform identity stack lives under `platform/` and is split into three capabilities:

| Capability | Directory | Question answered |
|------------|-----------|-------------------|
| Authentication | `platform/authentication/` | Who is making this request? |
| Authorization | `platform/authorization/` | What may they do? |
| User management | `platform/user-management/` | Which users and orgs exist? |

## Request flow

```text
Client
  │
  ▼
API gateway / service
  │  1. Validate bearer token / session  (authentication)
  │  2. Load membership + roles          (user-management)
  │  3. Evaluate permission + policies   (authorization)
  ▼
Protected handler
```

## Trust boundaries

- Access tokens are signed by the platform issuer and validated via JWKS.
- Authorization decisions are **not** trusted from the client; services re-check permissions for mutating operations.
- Organization scope is mandatory: a subject acting in `org_A` cannot access resources in `org_B`.

## Source of truth

| Artifact | Location |
|----------|----------|
| IdP & session config | `platform/authentication/` |
| Permission catalog & roles | `platform/authorization/rbac/` |
| Policy-as-code | `platform/authorization/policies/` |
| User / org schemas | `platform/user-management/` |
| HTTP contracts | `contracts/openapi/platform/` |

## Evolution

Implementations (services or packages) should consume these configs and contracts rather than defining parallel role or user models. When changing permissions, update `permissions.yaml` and `roles.yaml` together and revise the OpenAPI docs in the same change.
