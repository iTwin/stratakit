<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./internal/stratakit-logo-dark.svg?raw=true" />
  <img src="./internal/stratakit-logo.svg?raw=true" alt="" width="100"/>
</picture>

# StrataKit

Monorepo for **StrataKit** — Bentley's new flagship design system, and the successor to [iTwinUI](https://github.com/iTwin/iTwinUI).

[Read the documentation](https://stratakit.bentley.com/docs) to get started.

## Monorepo structure

This monorepo is a [pnpm workspace](https://pnpm.io/workspaces) which can be configured in the [`./pnpm-workspace.yaml`](./pnpm-workspace.yaml) file.

### Packages

These are the main packages of StrataKit:

- [`@stratakit/mui`](./packages/mui/): A StrataKit theme for [MUI](https://mui.com/material-ui/).
- [`@stratakit/icons`](./packages/icons/): A standalone SVG icon library.
- [`@stratakit/structures`](./packages/structures): Specialized custom-built components.
- [`@stratakit/foundations`](./packages/foundations/): Globals and design tokens.

Additional packages: [`@stratakit/bricks`](./packages/bricks/), [`@stratakit/internal-utils`](./packages/internal-utils/).

> [!NOTE]
> All StrataKit packages follow [semantic versioning](https://semver.org/), even though some packages are currently in their pre-`1.0` stage. It is therefore safe to use the `^` syntax to specify version ranges in your `package.json`.

### Examples

The [`examples`](./examples/) directory contains standalone examples for every component in StrataKit. These examples are embedded in the StrataKit documentation, and are also reused for testing.

### Apps

This monorepo has the following "apps":

- [test app](./apps/test-app/) which is used for testing and demonstration purposes.
- [docs website](./apps/website/) which contains the source for the StrataKit website and documentation.

## Core team

StrataKit is maintained by:

- [@mayank99](https://github.com/mayank99)
- [@GerardasB](https://github.com/GerardasB)
- [@FlyersPh9](https://github.com/FlyersPh9)
- [@angrycat9000](https://github.com/angrycat9000)
- [@ASpizak](https://github.com/ASpizak)

With special thanks to [@msllrs](https://github.com/msllrs), [@ahilhorst](https://github.com/ahilhorst), [@Heydon](https://github.com/Heydon), [@knowler](https://github.com/knowler), [@r100-stack](https://github.com/r100-stack), [@VeroniqueVezina](https://github.com/VeroniqueVezina), [@mglancybentley](https://github.com/mglancybentley), [@LadyMoonanBentley](https://github.com/LadyMoonanBentley), [@ollieBentley](https://github.com/ollieBentley), [@jasonjwichert](https://github.com/jasonjwichert), and all other [contributors](https://github.com/iTwin/stratakit/graphs/contributors).

## Contributing

Are you interested in helping StrataKit grow? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/stratakit/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for more information.
