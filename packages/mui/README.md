# @stratakit/mui

StrataKit theme for [MUI](https://mui.com/).

> [!CAUTION]
> 🚧 This package is not published yet.

## Installation and setup

Using your package manager of choice, install the latest version of [`@stratakit/mui`](https://www.npmjs.com/package/@stratakit/mui?activeTab=versions).

```console
npm add @stratakit/mui
```

`@stratakit/mui` has a direct dependency on [`@stratakit/foundations`](https://www.npmjs.com/package/@stratakit/foundations) and [`@stratakit/icons`](https://www.npmjs.com/package/@stratakit/icons), the latter of which requires [bundler configuration](https://github.com/iTwin/design-system/tree/main/packages/icons#bundler-configuration) to ensure that `.svg` files are not inlined.

## Usage

To use the StrataKit MUI theme, you’ll need to wrap your application's entrypoint with the `<Root>` component and set its `colorScheme` (to `"light"` or `"dark"`). This component will automatically configure MUI's `ThemeProvider` with the StrataKit theme.

```jsx
import { Root } from "@stratakit/mui";

export function App() {
	return <Root colorScheme={…}>{/* Use @mui/material components here */}</Root>;
}
```

`@stratakit/mui` also exports an `Icon` component that makes it easy to use `.svg` icons from [`@stratakit/icons`](https://www.npmjs.com/package/@stratakit/icons).

```jsx
import { Icon } from "@stratakit/mui";
import svgPlaceholder from "@stratakit/icons/placeholder.svg";

<Icon href={svgPlaceholder} />;
```

For more details on using specific features, refer to the inline documentation available on every component and prop.

## Contributing

Are you interested in helping StrataKit grow? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/design-system/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](https://github.com/iTwin/design-system/blob/main/CONTRIBUTING.md) for more information.
