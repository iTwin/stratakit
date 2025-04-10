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

iTwinUI uses [Inter](https://rsms.me/inter/) as its interface font and, in the future, fonts for other purpose may be added. We recommend self-hosting fonts for better control over cacheability and to avoid fingerprinting.

To self-host Inter, download the fonts from the official website, then include `InterVariable.woff2` and `InterVariable-Italic.woff2`, and serve them somewhere public. Once that’s set up, include the following CSS in the `<head>` of your document, replacing the placeholder paths with the correct path to where you’re hosting the fonts:

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

> [!NOTE]
> If the `<Root>` component cannot find `InterVariable` as a font in the document, it will automatically add a fallback which uses [Inter’s CDN](https://rsms.me/inter/#faq-cdn). In all cases, we recommend self-hosting to avoid security and performance implications of relying on a third-party CDN.

## Contributing

Are you interested in helping iTwinUI grow and expand? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/design-system/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](https://github.com/iTwin/design-system/blob/main/CONTRIBUTING.md) for more information.
