# @itwin/itwinui-react

A React component library for the next evolution of the iTwinUI design system.

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

Once that’s in place you can import and use components from `@itwin/itwinui-react/bricks`.

## Contributing

Are you interested in helping iTwinUI grow and expand? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/design-system/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](https://github.com/iTwin/design-system/blob/main/CONTRIBUTING.md) for more information.
