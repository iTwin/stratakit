# @itwin/itwinui-react

A React component library for the [next evolution of the iTwinUI design system](https://github.com/iTwin/design-system/discussions/481).

## Installation

Using your package manager of choice, install the latest **alpha** version of [`@itwin/itwinui-react`](https://www.npmjs.com/package/@itwin/itwinui-react?activeTab=versions).

```console
npm add @itwin/itwinui-react@alpha
```

## Usage

To use components from the iTwinUI design system in your app, you’ll need to wrap your app’s UI with iTwinUI's `<Root>` component, and specify the required `colorScheme` and `density` props:

```jsx
import { Root } from "@itwin/itwinui-react/bricks";

export function App() {
	return (
		<Root colorScheme="dark" density="dense">
			{/* Use design system components here */}
		</Root>
	);
}
```

This will ensure iTwinUI's styles are loaded to either the document or the encompassing shadow root.

Once that’s in place, you can import and use components from `@itwin/itwinui-react/bricks`.

> [!NOTE]
> If you are trying to use this package alongside the current stable version of iTwinUI, you will need to set up the [iTwinUI theme bridge](https://github.com/iTwin/iTwinUI/wiki/iTwinUI-v5-theme-bridge).

### Fonts

iTwinUI uses [InterVariable](https://rsms.me/inter/) as its interface font. In the future, other fonts may also be added for different purposes. We recommend self-hosting all fonts for robustness, security and performance reasons.

To self-host `InterVariable`, download the [`InterVariable.woff2`](https://rsms.me/inter/font-files/InterVariable.woff2) and [`InterVariable-Italic.woff2`](https://rsms.me/inter/font-files/InterVariable-Italic.woff2) font files from the official website, and serve them alongside your other assets. Then include the following CSS in the `<head>` of your document, replacing the placeholder paths with the correct path to where the fonts are located:

```html
<style>
	@font-face {
		font-family: InterVariable;
		font-style: normal;
		font-weight 100 900;
		font-display: swap;
		src: url("/path/to/InterVariable.woff2") format("woff2");
	}

	@font-face {
		font-family: InterVariable;
		font-style: italic;
		font-weight 100 900;
		font-display: swap;
		src: url("/path/to/InterVariable-Italic.woff2") format("woff2");
	}
</style>
```

It is recommended to use a build tool like [Vite](https://vite.dev/guide/assets.html#importing-asset-as-url) that can handle `url()` references and automatically copy these files into your public directory with hashed file names. This will allow you to safely take advantage of [HTTP caching](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/#how_to_cache_static_resources_using_http_caching) without blocking upgrades to newer versions of the fonts.

> [!NOTE]
> If the `<Root>` component cannot find `InterVariable` as a font in the document, it will automatically add a fallback which uses [Inter’s CDN](https://rsms.me/inter/#faq-cdn). In all cases, we recommend self-hosting to avoid any potential security and reliability issues that may arise from the use of a third-party CDN.

## Contributing

Are you interested in helping iTwinUI grow and expand? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/design-system/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](https://github.com/iTwin/design-system/blob/main/CONTRIBUTING.md) for more information.
