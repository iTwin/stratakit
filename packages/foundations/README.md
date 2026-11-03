# @stratakit/foundations

Foundational pieces of StrataKit.

This package includes:

- CSS reset and global styles
- Design tokens, exposed as "CSS variables".
- `<Root>` component
- `<Icon>` component

## Installation

Using your package manager of choice, install the latest version of [`@stratakit/foundations`](https://www.npmjs.com/package/@stratakit/foundations?activeTab=versions).

```console
npm add @stratakit/foundations
```

> [!NOTE]
> This package is a dependency of `@stratakit/mui` and does not need to be installed explicitly if you're already using `@stratakit/mui`.

## Usage

To use StrataKit in your app, you’ll need to wrap your application's entrypoint with StrataKit's `<Root>` component, which requires the `colorScheme` and `density` props.

```jsx
import { Root } from "@stratakit/foundations";

export function App() {
	return (
		<Root colorScheme="dark" density="dense">
			{/* Use StrataKit components here */}
		</Root>
	);
}
```

This will ensure StrataKit's styles are loaded to either the document or the encompassing shadow root.

Once that’s in place, you can import and use components from `@stratakit/bricks` and other `@stratakit` packages.

By default, StrataKit's CSS variables are made available to the _entire page_ (including the `<html>` element, which will automatically use an appropriate background-color). The `synchronizeColorScheme` prop can be set to `false` to prevent this behavior, which can be useful if you want to isolate StrataKit's styles to only the parts of the page that are wrapped in `<Root>`.

> [!NOTE]
> If you are trying to use this package alongside the current stable version of iTwinUI, you will also need to set up the [theme bridge](https://github.com/iTwin/iTwinUI/wiki/StrataKit-theme-bridge).

### Fonts

StrataKit uses [InterVariable](https://rsms.me/inter/) as its primary interface font and [IBM Plex Mono Var](https://github.com/IBM/plex/tree/master/packages/plex-mono-variable) as the monospace font. We recommend self-hosting all fonts for robustness, security and performance reasons.

See [Fonts documentation](https://stratakit.bentley.com/docs/getting-started/fonts/) for self-hosting instructions.

## Contributing

Are you interested in helping StrataKit grow? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/stratakit/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](https://github.com/iTwin/stratakit/blob/main/CONTRIBUTING.md) for more information.
