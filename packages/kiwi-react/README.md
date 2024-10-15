# @itwin/kiwi-react

A React component library for the Kiwi design system.

## Usage

To use components from the Kiwi design system in your app, you’ll need to wrap your app’s UI with Kiwi’s `<Root>` component:

```jsx
import { Root } from "@itwin/kiwi-react/bricks";

export function App() {
	return <Root>{/* Use Kiwi design system components here */}</Root>;
}
```

This will ensure Kiwi’s styles are loaded to either the document or the encompassing shadow root.

Once that’s in place you can import and use components from `@itwin/kiwi-react/bricks`.

## Contributing

Are you interested in helping kiwi grow and expand? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/kiwi/issues).

If you're interesting in contributing code, please read [`CONTRIBUTING.md`](https://github.com/iTwin/kiwi/blob/main/CONTRIBUTING.md) for more information.
