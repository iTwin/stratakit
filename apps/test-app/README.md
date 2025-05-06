# test-app

Test app built using [React Router](https://reactrouter.com/).

## Running the tests

The end-to-end tests are written in [Playwright](https://playwright.dev/) and run inside a [Docker](https://www.docker.com/) container to avoid platform specific inconsistencies.

> [!NOTE]
> The following commands should be run from the root of the monorepo.

To run all the tests:

```sh
pnpm run test
```

Pass additional arguments to playwright to run specific tests or update the snapshots:

```sh
pnpm run test button -- --update-snapshots
```

To see the generated report on a host:

```sh
pnpm --filter=@itwin/test-app exec playwright show-report
```

> [!NOTE]
> This requires [Docker](https://www.docker.com/) to be running on your machine.
