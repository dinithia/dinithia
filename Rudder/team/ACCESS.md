# Repository access policy

## Principle

**No role, no access.** Viewing or changing anything in this repository requires an active entry in the team directory with a defined role.

| Capability | Required |
|------------|----------|
| View (clone, browse, read issues/PRs as collaborator) | Active `viewer` or higher |
| Change (push, open/update PRs with write access) | Active `contributor`, `reviewer`, or `maintainer` |
| Administer (settings, secrets, collaborator management) | Active `maintainer` |

Public visibility of the GitHub project (if any) does not replace this policy for **write** access. Collaborator and team permissions on GitHub must mirror `directory.yaml`.

## Role → GitHub permission mapping

| Team role | GitHub repository role |
|-----------|------------------------|
| `maintainer` | Admin |
| `contributor` | Write |
| `reviewer` | Write |
| `viewer` | Read |

## Onboarding checklist

1. [ ] Maintainer approves the role.
2. [ ] Create `users/<github-username>.yaml`.
3. [ ] Add `active` membership in `directory.yaml`.
4. [ ] Grant GitHub access matching the role table above.
5. [ ] Member appears in `CODEOWNERS` paths when they own areas (optional).

## Offboarding checklist

1. [ ] Set membership `status: inactive` (or remove from `directory.yaml`).
2. [ ] Remove GitHub collaborator / org team access the same day.
3. [ ] Rotate any secrets or tokens the member could access.
4. [ ] Reassign CODEOWNERS ownership if applicable.

## Enforcement

- **Human / process:** maintainers keep GitHub collaborators in sync with this directory.
- **CI:** pull requests validate that `directory.yaml`, `roles/roles.yaml`, and `users/*.yaml` stay consistent; authors should be active members when write access is required.
- **CODEOWNERS:** default ownership is derived from active `maintainer` users.
