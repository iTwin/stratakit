# StrataKit

Monorepo for **StrataKit**, Bentley's new flagship design system.

## Monorepo structure

This monorepo is a [pnpm workspace](https://pnpm.io/workspaces) which can be configured in the [`./pnpm-workspace.yaml`](./pnpm-workspace.yaml) file.

### Packages

These are the main packages of StrataKit:

- [`@stratakit/mui`](./packages/mui/): A StrataKit theme for [MUI](https://mui.com/material-ui/).
- [`@stratakit/icons`](./packages/icons/): A standalone SVG icon library.

Additional packages: [`@stratakit/foundations`](./packages/foundations/), [`@stratakit/bricks`](./packages/bricks/), [`@stratakit/structures`](./packages/structures).

> [!NOTE]
> StrataKit packages are currently published as `0.X` versions. StrataKit follows [semantic versioning](https://semver.org/), and breaking changes will only be published in _minor_ version bumps. It is therefore safe to use the `^` syntax to specify version ranges in your `package.json`.

### Apps

This monorepo has the following "apps":

- [test app](./apps/test-app/) which is used for testing purposes and demonstration purposes.
- [docs website](./apps/website/) which contains the source for the StrataKit website and documentation.

## Contributing

Are you interested in helping StrataKit grow? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/design-system/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for more information.
