# kobo-common

A place to keep all non-complex files, for DRY purposes. We have:

- Our logo in different versions.
- Our color palette.
- Linter configs.

## Usage

For a `npm` project, just add this line to your `devDependencies`:

```
"kobo-common": "https://github.com/kobotoolbox/kobo-common.git#semver:1.2.3",
```

To pick a correct version, please remember that:

- `major` is not expected to change anytime soon
- `minor` changes anytime an existing resource was modified
- `patch` changes anytime a new resource was added

## Updating the contents of this package

We keep all usable stuff in `src` directory.

We are relying on version tag heavily, so there are safety measures configured:

1. A `pre-commit` hook will check (based on commited files) if version from `package.json` file is correct - it compares the proposed version with the latest pushed tag.
2. A `post-commit` hook will add (and push) a version tag found in `package.json` file.
