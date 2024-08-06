# test-app

Test app built using [Remix](https://remix.run/).

## Running the tests

The end-to-end tests on CI are running in a docker container to avoid platform specific inconsistencies. Run the tests in Docker environment:

```sh
pnpm test
```

Pass additional arguments to playwright to run specific tests or update the snapshots:

```sh
pnpm run test _index --update-snapshots
```

To see the generated report on a host:

```sh
pnpm exec playwright show-report
```

> _Note:_ This requires [Docker](https://www.docker.com/) to be running on your machine.
