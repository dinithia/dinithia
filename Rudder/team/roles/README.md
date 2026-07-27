# Roles

Defined roles for Rudder repository access live in `roles.yaml`.

Rules:

- Every user in `../users/` must reference exactly one role `id` from this file.
- Only roles listed here may appear in `../directory.yaml`.
- Changing role permissions requires a PR reviewed by a `maintainer`.
