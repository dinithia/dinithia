# Authorization

Platform authorization: how Rudder decides what an authenticated subject may do.

## Layout

| Directory | Purpose |
|-----------|---------|
| `rbac/` | Role definitions and role → permission bindings |
| `models/` | Permission and resource model schemas |
| `policies/` | Policy-as-code rules evaluated at enforcement points |

## Model

Rudder uses **RBAC with resource-scoped permissions**:

```text
User ──(member of)──▶ Role ──(grants)──▶ Permission ──(on)──▶ Resource
         └─ within Organization ─┘
```

- **Permission** = `action` + `resource_type` (e.g. `projects:write`).
- **Roles** are organization-scoped sets of permissions.
- **Policies** add constraints (ownership, environment, MFA) on top of RBAC.

## Enforcement

1. Authenticate the request (`../authentication/`).
2. Resolve the subject's roles in the active `org_id`.
3. Expand roles → permissions.
4. Evaluate resource policies in `policies/`.
5. Allow only if every required check passes (fail closed).

## Default roles

| Role | Intent |
|------|--------|
| `owner` | Full org control including billing and deletion |
| `admin` | Manage users, roles, and all resources |
| `member` | Create and edit day-to-day resources |
| `viewer` | Read-only access |
| `billing` | Billing and subscription management only |

## Related

- Authentication: `../authentication/`
- User management: `../user-management/`
- OpenAPI: `../../contracts/openapi/platform/authorization.yaml`
