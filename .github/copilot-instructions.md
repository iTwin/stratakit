# StrataKit — Copilot Coding Agent Instructions

## Repository overview

StrataKit is Bentley's flagship design system and the successor to [iTwinUI](https://github.com/iTwin/iTwinUI). It is a **pnpm monorepo** containing React component libraries, a MUI theme, an SVG icon library, test and documentation apps, and a shared internal configuration package.

---

## Monorepo structure

```
stratakit/
├── packages/
│   ├── foundations/   @stratakit/foundations  – Root component, Icon, shared hooks, CSS reset/layers
│   ├── bricks/        @stratakit/bricks        – Small atomic components (Button, Checkbox, Select, …)
│   ├── structures/    @stratakit/structures    – Composed components (Dialog, Table, Tabs, Tree, …)
│   ├── icons/         @stratakit/icons         – Standalone SVG icon library
│   └── mui/           @stratakit/mui           – StrataKit theme for MUI (Material UI v7)
├── apps/
│   ├── test-app/      React Router app used for E2E and visual testing
│   └── website/       Astro/Starlight documentation website
├── examples/          Private package with usage examples
└── internal/          Private workspace-wide config (esbuild plugins, lightningcss visitors, theme tokens)
```

---

## Initial setup

Requirements: **Node ≥ 22.19.0** and **pnpm 10** (version locked in `package.json#packageManager`).

```bash
pnpm install
```

> **Codespaces / devcontainer**: A `.devcontainer/devcontainer.json` is provided. Open the repo in a Codespace to get a pre-configured environment with no local installs needed.

---

## Key commands (run from repo root)

| Command | Purpose |
|---|---|
| `pnpm run dev` | Start test-app dev server at <http://localhost:1800> |
| `pnpm run build` | Build all packages and apps |
| `pnpm run test` | Run all Playwright E2E tests (requires Docker or a Playwright container) |
| `pnpm run test -- button` | Run tests for a single component |
| `pnpm run test -- --update-snapshots` | Regenerate visual snapshots |
| `pnpm run lint` | Run Biome linter (errors and warnings) |
| `pnpm run format` | Run Biome formatter |
| `pnpm run lint:copyright` | Check copyright headers |
| `pnpm run prettier` | Check non-JS/TS/CSS files with Prettier |
| `pnpm run docs` | Start documentation website dev server |
| `pnpm run changeset` | Create a new changeset for a user-facing change |

To target a specific workspace:

```bash
pnpm --filter=@stratakit/bricks run build
pnpm --filter=@stratakit/test-app run test -- dialog
```

---

## Build system

Packages use **[wireit](https://github.com/google/wireit)** for task caching and dependency ordering, and **[esbuild](https://esbuild.github.io/)** for bundling JS/CSS. TypeScript types are emitted with `tsc`.

Each package's `package.json` contains a `wireit` key that declares:
- `build:js` – esbuild production output to `dist/`
- `build:DEV` – esbuild development output to `dist/DEV/` (keeps DEV labels, skips React Compiler)
- `build:types` – TypeScript declaration files via `tsc --outDir dist`

Package exports use a custom `@stratakit/source` condition that points back to `src/` for monorepo-internal resolution during development.

The `internal/` package provides shared esbuild plugins (`inlineCssPlugin`, `reactCompilerPlugin`) and lightningcss visitors used across all packages' build scripts.

Special esbuild label syntax used in source files:
- `DEV: SomeComponent.displayName = "SomeComponent";` — stripped in production builds, kept in dev builds.
- `DROP: return;` — marks code that should be dropped in production builds.

---

## Component conventions

### File structure (in `packages/bricks/src/` and `packages/structures/src/`)

- `ComponentName.tsx` — component implementation with JSDoc
- `ComponentName.css` — scoped CSS using cascade layers
- `ComponentName.internal.tsx` — internal helpers not exported publicly (optional)
- `~utils.HelperName.tsx` / `~utils.HelperName.css` — internal utilities (tilde prefix = not public)

### CSS class names

Components use emoji-prefixed CSS class names (e.g., `🥝Button`, `🥝Root`) to namespace StrataKit styles and prevent collisions.

### Component API patterns

- Use `forwardRef` from `@stratakit/foundations/secret-internals` (not React's directly).
- Extend `FocusableProps<"button">` (or the relevant HTML element) from `@stratakit/foundations/secret-internals`.
- Call `useInit()` at the top of every component to ensure styles are injected.
- Use `classnames` (`cx`) for combining class names.
- Ariakit components (from `@ariakit/react`) are used for accessibility primitives — **always import from specific entrypoints** (e.g., `@ariakit/react/button`), never from the barrel `@ariakit/react`.

### JSDoc

All exported components, props, and public APIs **must** have JSDoc comments. Props with non-obvious defaults should document them with `@default`.

### Copyright header

Every `.ts`, `.tsx`, `.css`, `.js`, and `.html` file must start with:

```
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
```

The `pnpm lint:copyright` command checks this. Run `pnpm lint:copyright --fix` to auto-add it.

---

## Testing

Tests are **Playwright E2E** tests written in `.spec.ts` files. They live in `apps/test-app/app/tests/<component-name>/index.spec.ts`. Each component under test has a corresponding route in `apps/test-app/app/tests/<component-name>/index.tsx`.

Test helper: import `expect` and `test` from `#playwright` (the local alias), **not** from `@playwright/test` directly — Biome is configured to warn on the latter.

Test categories (via `test.describe`):
- `@visual` — screenshot comparison tests using `toHaveScreenshot()`
- `@a11y` — accessibility tests using `@axe-core/playwright`

Visual snapshots are stored next to the spec file: `index.spec.ts-snapshot.<test-name>-<browser>-linux.png`.

The Playwright base URL is `http://localhost:1800`. The `webServer` in `playwright.config.ts` runs `pnpm preview`, so the app must be built before running tests.

> **Important**: Tests require a running Playwright browser environment. On CI, a Docker container (`mcr.microsoft.com/playwright:v1.58.1-noble`) is used. Locally, Docker must be running before `pnpm test`.

---

## Linting and formatting

- **Biome** handles JS/TS/CSS linting and formatting. Config: `biome.jsonc` at repo root.
- **Prettier** handles non-JS/TS/CSS files (MDX, YAML, etc.). Config: `.prettierrc`.
- **Copyright linter**: `internal/copyright-linter.ts` (run via `pnpm lint:copyright`).
- **Lefthook** runs pre-commit hooks: copyright fix, Biome format, Biome lint, import organization, Prettier.

Import ordering (enforced by Biome):
1. Node built-ins / protocols
2. _(blank line)_
3. React / react-dom / react-router
4. Other packages (no file extension)
5. Relative imports with `.js`/`.ts`/`.tsx` extension
6. URLs
7. _(blank line)_
8. Type-only imports

---

## Changesets and versioning

StrataKit uses **[Changesets](https://github.com/changesets/changesets)** for versioning. For any user-facing change, create a changeset:

```bash
pnpm changeset   # interactive CLI – select affected packages and bump type
```

Changesets files live in `.changeset/`. They are consumed by CI to publish releases.

- Pre-1.0 packages use `0.X` versioning; **breaking changes only land in minor bumps** (not patches).

---

## CI pipeline (`.github/workflows/CI.yaml`)

Jobs run on every PR and push to `main`:

| Job | Description |
|---|---|
| `install` | `pnpm install` |
| `audit` | `pnpm audit` for security issues |
| `check` | Biome CI, copyright linter, Prettier, TypeScript typecheck |
| `build` | Full build on ubuntu-latest and windows-latest |
| `test` | Playwright E2E tests (4 shards, Playwright Docker container) |
| `docs-tests` | Playwright tests for the website |
| `deploy-gh-pages` | Deploys test-app preview for the PR |

---

## Common errors and workarounds

- **Multiple instances of `@stratakit/foundations` detected**: Caused by duplicate installations of `@stratakit/foundations`. Ensure only one version is resolved (check `pnpm why @stratakit/foundations`).
- **Build fails on Windows**: The build job is retried up to 3 times on CI (due to occasional file-locking issues). If building locally on Windows fails, retry `pnpm run build`.
- **Tests fail with "page not loaded"**: The test-app must be fully built before tests run. Run `pnpm run build` first, then `pnpm run test`.
- **Visual snapshot mismatches**: Snapshots are generated on Linux (CI). If updating locally on a different OS, the snapshots may not match. Always update snapshots in CI or in a Linux environment (e.g., devcontainer/Codespace).
- **Biome import order warnings**: Run `pnpm biome check --write <file>` or let the pre-commit hook fix them automatically.
- **Copyright check fails**: Run `pnpm lint:copyright --fix` to auto-prepend the copyright banner to all affected files.
