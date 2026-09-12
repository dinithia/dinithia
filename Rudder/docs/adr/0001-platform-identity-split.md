# ADR 0001: Split platform identity into authn, authz, and user management

## Status

Accepted

## Context

Rudder needs login, access control, and user/org administration. Folding all three into a single `security/` module makes ownership and change control unclear as the platform grows.

## Decision

Place identity capabilities under dedicated platform directories:

- `platform/authentication/` — identity verification, sessions, MFA
- `platform/authorization/` — RBAC catalog, policy-as-code
- `platform/user-management/` — users, orgs, memberships, lifecycle

Keep cross-cutting hardening (secrets, threat models) in `platform/security/`.
Publish HTTP contracts under `contracts/openapi/platform/`.

## Consequences

- Clear ownership boundaries for each concern.
- Services can depend on stable schemas and OpenAPI without importing unrelated security tooling.
- Slightly more navigation overhead than a single folder; mitigated by `platform/README.md` and `docs/architecture/identity.md`.
