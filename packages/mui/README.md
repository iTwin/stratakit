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

Additionally, you should ensure that [StrataKit fonts](#fonts) are loaded in your application.

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

## Fonts

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

Are you interested in helping StrataKit grow? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/design-system/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](https://github.com/iTwin/design-system/blob/main/CONTRIBUTING.md) for more information.
