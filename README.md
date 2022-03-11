# kobo-common

A place to keep all non-complex files, for DRY purposes. We have:

- Our logo in different versions.
- Our color palette.
- Linter configs.

## Installation

For a `npm` project, just add this line to your `devDependencies`:

```
"kobo-common": "git@github.com:kobotoolbox/kobo-common.git#semver:1.2.3",
```

To pick a correct version, please remember that:

- `major` is not expected to change anytime soon
- `minor` changes anytime an existing resource was modified
- `patch` changes anytime a new resource was added

Depending on your setup you might need to use `HTTPS` url instead: `https://github.com/kobotoolbox/kobo-common.git`.

## Usage

### Linting

For linter configs you need to extend the ones we have. You can simply create a file with one property:

```js
// .eslintrc.js
module.exports = {
  extends: './node_modules/kobo-common/src/configs/.eslintrc.js',
};
```

```js
// .stylelintrc.js
module.exports = {
  extends: './node_modules/kobo-common/src/configs/.stylelintrc.js',
};
```

```js
// .prettierrc.js
module.exports = {
  ...require('./node_modules/kobo-common/src/configs/.prettierrc.js'),
};
```

For `.editorconfig` unfortunately [there is no easy way](https://github.com/editorconfig/editorconfig/issues/236). You can either create a `postinstall` script that would copy it to your repo root, or just copy&paste the content manually.

NOTE: you might need to install `@typescript-eslint/parser` from `peerDependencies` in your project to enable linting.

### Styles

The color palette file requires a relative path to work, e.g. `@use "../../node_modules/kobo-common/src/styles/colors";`, but to make it easier for you, try using these steps instead:

1. Adding the package to `load-paths` like so: `--load-path=node_modules/kobo-common/src/styles`
2. Referencing it in your file: `@use "colors";`
3. Using the variable: `color: colors.$kobo-blue;`

## Updating the contents of this package

We keep all usable stuff in `src` directory.

We are relying on version tag heavily, so there are safety measures configured:

1. A `pre-commit` hook will check (based on commited files) if version from `package.json` file is correct - it compares the proposed version with the latest pushed tag.
2. A `post-commit` hook will add (and push) a version tag found in `package.json` file.
