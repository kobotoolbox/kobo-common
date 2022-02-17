# kobo-common

Small shareable resources for Kobo projects.

## Updating the contents of this packag

We are relying on version tag heavily, so there are safety measures configured:

1. A `pre-commit` hook will check (based on commited files) if version from `package.json` file is correct:
  - If any file was modified in `src/`, we require minor version bump.
  - If no file was modified in `src/`, but some files were added there, we require patch version bump.
2. A `post-commit` hook will add (and push) a version tag found in `package.json` file.
