# Authentication

Platform authentication: how Rudder verifies identity before granting a session or token.

## Layout

| Directory | Purpose |
|-----------|---------|
| `providers/` | Identity provider configuration (OIDC, local) |
| `sessions/` | Session and token conventions |
| `policies/` | Password, MFA, and lockout policies |

## Principles

1. **Externalize identity where possible** — prefer OIDC federation; keep a local provider only for bootstrap and break-glass.
2. **Short-lived access tokens** — pair with rotatable refresh tokens; never embed authorization decisions in long-lived JWTs beyond claims needed for enforcement.
3. **MFA for privileged roles** — required for admin and security-sensitive operations (see `policies/mfa.yaml`).
4. **Fail closed** — unknown issuers and invalid audiences are rejected.

## Subject model

Authenticated requests carry a subject with at least:

| Claim | Description |
|-------|-------------|
| `sub` | Stable user id (`usr_…`) |
| `org_id` | Active organization id (`org_…`) |
| `sid` | Session id |
| `amr` | Authentication methods used (e.g. `pwd`, `otp`) |

Downstream services must treat these claims as untrusted until validated against platform JWKS / session store.

## Related

- Authorization: `../authorization/`
- User management: `../user-management/`
- OpenAPI: `../../contracts/openapi/platform/authentication.yaml`
