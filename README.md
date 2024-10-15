# kiwi

Monorepo for the kiwi design system.

## Monorepo structure

We’re using a [pnpm workspace](https://pnpm.io/workspaces) which can be configured in the [`./pnpm-workspace.yaml`](./pnpm-workspace.yaml) file.

### Packages ([`./packages/*`](./packages/))

These are the packages of the Kiwi design system:

- [`@itwin/kiwi-react`](./packages/kiwi-react/): A React component library for the Kiwi design system.
- [`@itwin/kiwi-icons`](./packages/kiwi-icons/): Generic SVG icons for iTwinUI projects.

### Apps ([`./apps/*`](./apps/))

These are example apps which might be used for testing or as a demonstration of the Kiwi design system in action. Currently, this repo only has one [test app](./apps/test-app/) which is used for testing purposes.

## Contributing

Are you interested in helping kiwi grow and expand? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/kiwi/issues). Please read our [CONTRIBUTING.md](https://github.com/iTwin/kiwi/blob/main/CONTRIBUTING.md) for more information.
