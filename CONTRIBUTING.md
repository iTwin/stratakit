# Contributing

Welcome to the contribution guide for StrataKit! In here you will find all the information you need to get started.

---

## How to setup

### Local setup

To clone and build the repo locally, you'll need [Git](https://git-scm.com), [Node 22+](https://nodejs.org/en/download/), and [Pnpm 9](https://pnpm.io/installation) installed on your computer.

1. [Clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository). You can do this from the command line or using the Github Desktop app.

2. Go to the directory where you cloned the repo. e.g. `cd stratakit`.

3. Run `pnpm install` from that directory.

**VSCode Users:** Install the recommended [extensions](./.vscode/extensions.json) for linter warnings in editor.

### Using devcontainers

This repo includes a [devcontainer](https://containers.dev/) configuration that compatible IDEs can use to automatically set up your development environment. To use this locally, you'll need Docker or an equivalent container runtime installed on your machine.

Alternatively, you can get started without installing anything locally by creating a [GitHub Codespace](https://docs.github.com/en/codespaces/overview), which uses the same devcontainer configuration but runs entirely in the cloud: [Open repository in Codespace](https://codespaces.new/iTwin/stratakit).

---

## Commands

### To build

`pnpm run build`

### To start the dev server for test-app

`pnpm run dev`

### To run all tests

`pnpm run test`

_Before running this command, make sure [Docker](https://www.docker.com/) is running._

### To run all tests for a specific component

`pnpm run test -- [component-name]` e.g. `pnpm run test -- button`

### To lint and fix autofixable errors

`pnpm run lint`

### To run the docs website

`pnpm run docs` (or `pnpm --filter=@stratakit/website run dev`)

_Note: This does not hot reload when changes are made to packages. To see changes, you will need to rerun the command._

---

## Developing

### Directory structure

This repo uses [Pnpm workspaces](https://pnpm.io/workspaces) to allow multiple packages to exist within the same codebase.

Packages:

- [`@stratakit/mui`](./packages/mui/): A StrataKit theme for [MUI](https://mui.com/material-ui/).
- [`@stratakit/icons`](./packages/icons/): A standalone SVG icon library.
- [`@stratakit/foundations`](./packages/foundations/): Foundational pieces of StrataKit.
- [`@stratakit/bricks`](./packages/bricks/): Small, modular components that can be assembled to create larger, more functional experiences.
- [`@stratakit/structures`](./packages/structures): Medium-sized component structures built on top of `@stratakit/bricks`.

Apps:

- [`test-app`](./apps/test-app): A [React Router](https://reactrouter.com/) app for automated and manual testing.
- [`website`](./apps/website): The StrataKit documentation website built with [Starlight](https://starlight.astro.build/).

Examples:

- [`examples`](./examples): A private package for storing examples of StrataKit in action.

Also, there’s [an internal package](./internal) which is used for configuration files and common variables for the workspace at large.

### Development environment

To start the development server, run the following command from the root.

```
pnpm run dev
```

This will spin up a development server at `http://localhost:1800`. Any changes made to any source files will be instantly reflected.

To create a production build, run the following command.

```
pnpm run build
```

### Testing

To ensure your changes work as expected, tests should be written or updated as necessary. This repo uses [Playwright](https://playwright.dev/) for E2E testing. These tests are written in `.spec.ts` files defined next to the routes which are being tested. You can find examples of existing tests in the [`app/tests/`](./apps/test-app/app/tests) directory.

For visual testing, after modifying a component, update snapshots by running the following command from the project root:

```
pnpm run test -- --update-snapshots
```

### Running bespoke commands

If a script is not available in the root package.json or if you need to pass workspace-specific cli args, then you can specify the workspace using [Pnpm's filter syntax](https://pnpm.io/filtering):

```
# passing button as a cli arg to the `test` command in test-app
pnpm --filter=@stratakit/test-app run test -- button
```

...or you can simply run the command normally from inside the workspace folder instead of the monorepo root.

```
cd apps/test-app

# run this from inside apps/test-app for the same result
pnpm run test -- button
```

---

### Documentation

All components, props, and public APIs must have inline documentation written as [JSDoc](https://jsdoc.app/) comments. This documentation can be used by IDEs for hover hints and auto-completion to assist developers in understanding the code. JSDoc comments support markdown syntax, which can be useful when you want to display inline code or hyperlinks.

```tsx
interface ButtonProps extends FocusableProps<"button"> {
	/**
	 * The variant style of the button.
	 * Use "solid" for primary actions and "ghost" for less prominent actions.
	 */
	variant?: "solid" | "ghost";
}
```

```tsx
/**
 * A customizable button component supporting multiple variants.
 */
export const Button = forwardRef<"button", ButtonProps>((props, forwardedRef) => {});
```

## Pull Requests

Before creating a pull request, make sure your changes address a specific issue. Do a search to see if there are any existing issues that are still open. If you don't find one, you can create one. For user-facing changes, add a [changeset](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md) by running the `pnpm changeset` command.

To enable us to quickly review and accept your pull requests, always create one pull request per issue. Never merge multiple requests in one unless they have the same root cause. Be sure to follow best practices and keep code changes as small as possible. Avoid pure formatting changes or random "fixes" that are unrelated to the linked issue.
