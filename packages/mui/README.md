# @stratakit/mui

StrataKit theme for [MUI](https://mui.com/material-ui/).

## Installation and setup

Using your package manager of choice, install the latest version of [`@stratakit/mui`](https://www.npmjs.com/package/@stratakit/mui?activeTab=versions).

```console
npm add @stratakit/mui
```

Additional setup/considerations:

- `@stratakit/mui` has a peer dependency on [`@stratakit/foundations`](https://www.npmjs.com/package/@stratakit/foundations) (for tokens) and [`@mui/material`](https://www.npmjs.com/package/@mui/material) (for MUI components).
- `@stratakit/mui` has a direct dependency on [`@stratakit/icons`](https://www.npmjs.com/package/@stratakit/icons), which requires [bundler configuration](https://github.com/iTwin/stratakit/tree/main/packages/icons#bundler-configuration) to ensure that `.svg` files are not inlined.
- You should ensure that [StrataKit fonts](#fonts) are loaded in your application.
- [`/types.d.ts`](#typescript) must be included in your project to ensure that the module augmentation for MUI components is picked up by TypeScript.
- If you are trying to use this package alongside iTwinUI, you will also need to set up the [theme bridge](https://github.com/iTwin/iTwinUI/wiki/StrataKit-theme-bridge).

Check out the minimal starter template on StackBlitz for a quick working example:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/iTwin/stratakit/tree/main/internal/minimal-template?file=src%2FApp.tsx)

## Usage

To use the StrataKit MUI theme, you’ll need to wrap your application's entrypoint with the `<Root>` component and set its `colorScheme` (to `"light"` or `"dark"`). This component will automatically configure MUI's `ThemeProvider` with the StrataKit theme.

```jsx
import { Root } from "@stratakit/mui";

export function App() {
	return <Root colorScheme={…}>{/* Use @mui/material components here */}</Root>;
}
```

Now you can use any components directly from `@mui/material`, and they will be automatically themed to use StrataKit's visual language.

> [!CAUTION]
> Do not use MUI's `ThemeProvider`, `StyledEngineProvider`, or `CssBaseline` components directly. The `Root` component will handle all global configuration for you.

### Icon component

`@stratakit/mui` also exports an `Icon` component that makes it easy to use `.svg` icons from [`@stratakit/icons`](https://www.npmjs.com/package/@stratakit/icons).

```jsx
import { Icon } from "@stratakit/mui";
import { svgPlaceholder } from "@stratakit/icons/placeholder";

<Icon href={svgPlaceholder} />;
```

> [!NOTE]
> `@stratakit/icons` requires [bundler configuration](https://github.com/iTwin/stratakit/tree/main/packages/icons#bundler-configuration) to ensure that `.svg` files are not inlined.

## Fonts

StrataKit uses [InterVariable](https://rsms.me/inter/) as its primary interface font and [IBM Plex Mono Var](https://github.com/IBM/plex/tree/master/packages/plex-mono-variable) as the monospace font. We recommend self-hosting all fonts for robustness, security and performance reasons.

See [Fonts documentation](https://stratakit.bentley.com/docs/getting-started/fonts/) for self-hosting instructions.

## TypeScript

`@stratakit/mui` uses [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) to modify the props of certain MUI components (for example, to change default prop values). To ensure that these changes are picked up by TypeScript, you must include the `@stratakit/mui/types.d.ts` file in your project.

The preferred way to include `types.d.ts` is to add it to the [`types` array](https://www.typescriptlang.org/tsconfig/#types) in your project's `tsconfig.json`:

```json
{
	"compilerOptions": {
		"types": ["@stratakit/mui/types.d.ts"]
	}
}
```

Alternatively, if your project relies on the implicit inclusion of visible `@types` packages, then you can instead add a reference to `types.d.ts` using a [triple-slash directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html) in a global declaration file in your project (e.g. in `src/env.d.ts`):

```ts
/// <reference types="@stratakit/mui/types.d.ts" />
```

## Contributing

Are you interested in helping StrataKit grow? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/stratakit/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](https://github.com/iTwin/stratakit/blob/main/CONTRIBUTING.md) for more information.
