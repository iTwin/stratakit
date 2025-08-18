# StrataKit

Monorepo for the [next evolution of the iTwinUI design system](https://github.com/iTwin/design-system/discussions/481), aka **StrataKit**.

## Monorepo structure

This monorepo is a [pnpm workspace](https://pnpm.io/workspaces) which can be configured in the [`./pnpm-workspace.yaml`](./pnpm-workspace.yaml) file.

### Packages

These are the packages of StrataKit:

- [`@stratakit/foundations`](./packages/foundations/): Foundational pieces of StrataKit.
- [`@stratakit/icons`](./packages/icons/): A standalone SVG icon library.
- [`@stratakit/bricks`](./packages/bricks/): Small, modular components that can be assembled to create larger, more functional experiences.
- [`@stratakit/structures`](./packages/structures): Medium-sized component structures built on top of `@stratakit/bricks`.
- [`@stratakit/react`](./packages/compat/): A React compatibility layer for using iTwinUI v3 APIs.

> [!NOTE]
> StrataKit packages are currently published as `0.X` versions. StrataKit follows [semantic versioning](https://semver.org/), and breaking changes will only be published in _minor_ version bumps. It is therefore safe to use the `^` syntax to specify version ranges in your `package.json`.

### Apps

Currently, this repo has one [test app](./apps/test-app/) which is used for testing purposes and for demonstrating the design system in action.

## Contributing

Are you interested in helping StrataKit grow? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/design-system/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for more information.
