# Contributing

Welcome to the contribution guide for the KIWI Project! In here you will find all the information you need to get started.

---

## How to setup

### Local setup

To clone and build Kiwi, you'll need [Git](https://git-scm.com), [Node 18+](https://nodejs.org/en/download/), and [Pnpm 9](https://pnpm.io/installation) installed on your computer.

1. [Create a local clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository). You can do this from the command line or using the Github Desktop app.

2. Go to the directory where you cloned Kiwi. e.g. `cd kiwi`.

3. Run `pnpm install` from that directory.

**VSCode Users:** Install the recommended [plugins](./.vscode/extensions.json) for linter warnings in editor.

---

## Commands

### To build

`pnpm build`

### To open development servers

`pnpm dev`

### To run all tests

`pnpm test`

_Before running this command, make sure Docker is running. See [Visual testing](#visual-testing-css) (CSS and React) sections below for more details._

### To run all tests for a specific component

`pnpm test [component-name]` e.g. `pnpm test Alert`

_Please note this command is case sensitive. e.g. `Alert`, not `alert`._

### To lint and fix autofixable errors

`pnpm lint`

_Please note we use [biome](https://github.com/biomejs/biome)_

### To run commands using VSCode Tasks

Commands available in this repo can be run using VSCode Tasks which can be used in two ways:

- `Run task` from VSCode Search Bar: you can access the tasks using the top search bar (or press `Ctrl` + `Shift` + `P`) then search for `Run task`. A list of tasks should be displayed with the most recent used tasks on top, followed by the rest of available tasks.
- `Tasks` VSCode Extension: otherwise, you can install the `Tasks` extension so that all available tasks appear in the bottom taskbar.

---

## Developing

#### Development environment

To start the development server for all workspaces, run the following command from the root.

```
pnpm dev
```

This will automatically build anything that's not already built, and run the `dev` script for every workspace in parallel, watching for file changes.

### Running bespoke commands

If a script is not available in the root package.json or if you need to pass workspace-specific cli args, then you can specify the workspace as follows:

```
# passing Alert as a cli arg to the `test` command in itwinui-react
pnpm --filter=@itwin/kiwi-react run test Alert
```

...or you can simply run the command normally from inside the workspace folder instead of the monorepo root.

```
# run this from inside packages/itwinui-react/ for the same result
pnpm test Alert
```

---

### Creating components

Before developing, please read our [style guide](./STYLEGUIDE.md).

### Documentation

We use [JSDoc](https://jsdoc.app/) (not TSDoc) to write documentation for our code.

### Unit testing (React)

Ensure to cover your added code with tests.

Run `pnpm test:unit` to run the unit tests.

Run `pnpm test:unit:watch` if you want unit tests to rerun after changes.

We usually do not use `describe` block and our test case should start with 'should'.

```jsx
it("should be visible", () => {
	const { getByText } = render(
		<Tooltip parentId="container" content="some text" isVisible>
			<div>Visible!</div>
		</Tooltip>,
	);

	getByText("some text");
});
```

### Visual testing (CSS)

---TBC

#### How to write tests:

--- TBC

### Visual testing (React)

We reuse our stories for visual tests by taking screenshots of the story iframes in [Cypress](https://cypress.io/).

#### Running visual tests

--- TBC

#### Writing visual tests

-- TBC

### Accessibility testing

-- TBC

#### Running accessibility tests

-- TBC

##### Your results

--- TBC

## Pull Requests

Before creating a pull request, make sure your changes address a specific issue. Do a search to see if there are any existing issues that are still open. If you don't find one, you can create one.

To enable us to quickly review and accept your pull requests, always create one pull request per issue. Never merge multiple requests in one unless they have the same root cause. Be sure to follow best practices and keep code changes as small as possible. Avoid pure formatting changes or random "fixes" that are unrelated to the linked issue.

### Checklist

- Component added or modified using [guidelines](#Developing) above.
  - All required files and exports added.
  - Proper inline documentation added.
  - Code follows style guide and has no linting errors (pre-commit hook will run linter).
- Tests added for all new code.
  - All existing and new tests should pass.
- Stories added to demonstrate new features.
- Added [changeset](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md) using `pnpm changeset`, if changes are user-facing.

Verify that your changes are ready, then [create a pull request from your fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Make sure your pull request has a proper description and a [linked issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).

Your pull request will be reviewed by one or more maintainers. They may leave some comments/suggestions to help improve the quality and consistency of your code.

Once approved, your changes will be accepted into the repository.
