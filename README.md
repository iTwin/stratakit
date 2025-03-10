# iTwinUI Design System

Monorepo for the next evolution of the iTwinUI design system.

## Monorepo structure

This monorepo is a [pnpm workspace](https://pnpm.io/workspaces) which can be configured in the [`./pnpm-workspace.yaml`](./pnpm-workspace.yaml) file.

### Packages ([`./packages/*`](./packages/))

These are the packages of the iTwinUI design system:

- [`@itwin/itwinui-react`](./packages/kiwi-react/): A React component library.
- [`@itwin/itwinui-icons`](./packages/kiwi-icons/): A standalone SVG icon library.

### Apps ([`./apps/*`](./apps/))

These are example apps which might be used for testing or as a demonstration of the iTwinUI design system in action. Currently, this repo only has one [test app](./apps/test-app/) which is used for testing purposes.

## Contributing

Are you interested in helping iTwinUI grow and expand? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/design-system/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](https://github.com/iTwin/design-system/blob/main/CONTRIBUTING.md) for more information.
