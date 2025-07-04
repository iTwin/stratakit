# @stratakit/react

A React compatibility layer for StrataKit, matching [`@itwin/itwinui-react`](https://npmjs.com/package/@itwin/itwinui-react) v3 APIs.

## Installation

Using your package manager of choice, install the latest version of [`@stratakit/react`](https://www.npmjs.com/package/@stratakit/react?activeTab=versions).

```console
npm add @stratakit/react
```

## Usage

`@stratakit/react` requires setting up the [`@stratakit/foundations` package](https://www.npmjs.com/package/@stratakit/foundations), either by itself or using the [theme bridge](https://github.com/iTwin/iTwinUI/wiki/StrataKit-theme-bridge). Once that's done, you can import and use any components from `@stratakit/react`.

```jsx
import { Button } from "@stratakit/react";

function App() {
	return <Button>Hello</Button>;
}
```

For more details on using specific features, refer to the inline documentation available on every component and prop. Also see [iTwinUI documentation](https://itwinui.bentley.com/).

> [!IMPORTANT]
> `@stratakit/react` is a work-in-progress. Many iTwinUI features and APIs are currently missing.

## Contributing

Are you interested in helping StrataKit grow? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/design-system/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](https://github.com/iTwin/design-system/blob/main/CONTRIBUTING.md) for more information.
