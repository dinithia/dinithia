# Team directory

Source of truth for who may **view** or **change** the Rudder repository.

## Access rule

A person may access this repo only if **all** of the following are true:

1. They have a user record under `users/`.
2. That record assigns a defined role from `roles/roles.yaml`.
3. Their membership is listed as `active` in `directory.yaml`.

Anyone missing from this directory, lacking a role, or marked inactive must not be granted GitHub access (read or write).

## Layout

```text
team/
├── README.md           # This file
├── ACCESS.md           # Access policy and onboarding / offboarding
├── directory.yaml      # Active membership index (user → role)
├── roles/
│   └── roles.yaml      # Role definitions and repo permissions
└── users/
    └── <github>.yaml   # Per-user profile + assigned role
```

## Roles (summary)

| Role | Repo access | Typical use |
|------|-------------|-------------|
| `maintainer` | Admin | Own the repo, merge, manage access |
| `contributor` | Write | Open PRs, push to allowed branches |
| `reviewer` | Write (review-focused) | Review and approve changes |
| `viewer` | Read | Read-only access; no direct changes |

Full permission matrix: `roles/roles.yaml`.

## How to add a team member

1. Pick a role in `roles/roles.yaml`.
2. Add `users/<github-username>.yaml` with that role.
3. Add an `active` entry in `directory.yaml`.
4. Grant the matching GitHub collaborator permission (see `ACCESS.md`).
5. Open a PR — CI validates the directory is consistent.

## How to remove access

1. Set the member `status` to `inactive` in `directory.yaml` (or remove the entry).
2. Revoke GitHub collaborator / team access immediately.
3. Optionally archive the user file under `users/`.
