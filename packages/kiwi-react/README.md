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

## Contributing

Are you interested in helping iTwinUI grow and expand? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/design-system/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](https://github.com/iTwin/design-system/blob/main/CONTRIBUTING.md) for more information.
