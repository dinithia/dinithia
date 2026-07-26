# User management

Platform user management: user records, profiles, organizations, and lifecycle operations.

## Layout

| Directory | Purpose |
|-----------|---------|
| `lifecycle/` | Invite, activate, suspend, deactivate, and delete flows |
| `profiles/` | Profile schema and mutable user attributes |
| `organizations/` | Tenancy model — organizations and membership |

## Responsibilities

| Concern | Owned here | Not owned here |
|---------|------------|----------------|
| User identity record | Yes | Credential verification → `authentication/` |
| Org membership & roles assignment | Yes (assignment) | Permission evaluation → `authorization/` |
| Profile attributes | Yes | App-specific preferences → product apps |

## Identifiers

| Entity | Prefix | Example |
|--------|--------|---------|
| User | `usr_` | `usr_01HZX…` |
| Organization | `org_` | `org_01HZX…` |
| Membership | `mem_` | `mem_01HZX…` |
| Invite | `inv_` | `inv_01HZX…` |

## Lifecycle states

```text
invited → active ⇄ suspended → deactivated → deleted
```

- **invited** — invite issued; no login until accepted.
- **active** — can authenticate (subject to auth policies).
- **suspended** — temporarily blocked; data retained.
- **deactivated** — permanently disabled; soft-deleted.
- **deleted** — hard-deleted or anonymized per retention policy.

## Related

- Authentication: `../authentication/`
- Authorization: `../authorization/`
- OpenAPI: `../../contracts/openapi/platform/user-management.yaml`
- Schemas: `profiles/user.schema.json`, `organizations/organization.schema.json`
