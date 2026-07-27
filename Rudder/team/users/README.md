# Users

One YAML file per team member, named `<github-username>.yaml`.

Requirements:

- File name must match the GitHub username (case-sensitive as on GitHub).
- `role` must exist in `../roles/roles.yaml`.
- Matching entry in `../directory.yaml` with `status: active` is required for access.

Use `_template.yaml` when adding someone new.
