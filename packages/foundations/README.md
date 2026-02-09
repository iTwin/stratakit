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

StrataKit uses [InterVariable](https://rsms.me/inter/) as its interface font. In the future, other fonts may also be added for different purposes. We recommend self-hosting all fonts for robustness, security and performance reasons.

To self-host `InterVariable`, download the [`InterVariable.woff2`](https://rsms.me/inter/font-files/InterVariable.woff2) and [`InterVariable-Italic.woff2`](https://rsms.me/inter/font-files/InterVariable-Italic.woff2) font files from the official website, and serve them alongside your other assets. Then include the following CSS in the `<head>` of your document, replacing the placeholder paths with the correct path to where the fonts are located:

```html
<style>
	@font-face {
		font-family: InterVariable;
		font-style: normal;
		font-weight: 100 900;
		font-display: swap;
		src: url("/path/to/InterVariable.woff2") format("woff2");
	}

	@font-face {
		font-family: InterVariable;
		font-style: italic;
		font-weight: 100 900;
		font-display: swap;
		src: url("/path/to/InterVariable-Italic.woff2") format("woff2");
	}
</style>
```

Build tools such as [Vite](https://vite.dev/guide/assets.html#importing-asset-as-url) can handle `url()` references and automatically copy these files into your output directory with hashed file names. These files can then be safely served with [HTTP caching](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/#how_to_cache_static_resources_using_http_caching) without blocking upgrades to newer versions of the fonts.

> [!NOTE]
> If the `<Root>` component cannot find `InterVariable` as a font in the document, it will automatically add a fallback which uses [Inter’s CDN](https://rsms.me/inter/#faq-cdn). In all cases, we recommend self-hosting to avoid any potential security and reliability issues that may arise from the use of a third-party CDN.

## Contributing

Are you interested in helping StrataKit grow? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/stratakit/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](https://github.com/iTwin/stratakit/blob/main/CONTRIBUTING.md) for more information.
