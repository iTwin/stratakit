# @itwin/itwinui-icons

Icons for the iTwinUI design system. Each icon is available as an SVG symbol sprite and contains multiple resolutions of the same icon using [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol) elements. This allows the icon to be used at different sizes with increasing detail and quality. Currently supported symbols as identified by their `id` attribute values are: `icon`, `icon-large`.

## Usage

Preferred usage is with the `Icon` component from `@itwin/itwinui-react`:

1. Import the icon you want to use.

   Using the [`import.meta`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta) feature to get the URL of the icon (does not work with SSR):

   ```tsx
   const placeholderIcon = new URL("@itwin/itwinui-icons/placeholder.svg", import.meta.url).href;
   ```

   Or a static import:

   ```tsx
   import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
   ```

2. Render the `Icon` component.

   ```tsx
   import { Icon } from "@itwin/itwinui-react";

   <Icon href={placeholderIcon} />

   // Specify `size` prop to render the large icon:
   <Icon href={placeholderIcon} size="large" />
   ```

   Alternatively, you can use the SVG sprite directly:

   ```tsx
   <svg>
   	<use href={`${placeholderIcon}#icon`}>
   </svg>

   // To display the large icon:
   <svg>
   	<use href={`${placeholderIcon}#icon-large`}>
   </svg>
   ```

> [!IMPORTANT]
> Icons of `@itwin/itwinui-icons` should always be used as external HTTP resources, because of [SVG `<use>` element restrictions](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use#usage_notes). Do not inline the SVG content directly in your React components.
> Data uris and non-HTTP protocols are supported on a best effort basis using client-side JavaScript.

## Bundler configuration

### Vite

Within your Vite configuration file, you will need to configure `assetsInlineLimit` option to ensure SVG icons from `@itwin/itwinui-icons` are not inlined:

```ts
defineConfig({
	build: {
		assetsInlineLimit: (filePath) => {
			if (filePath.includes("@itwin/itwinui-icons/")) return false;
			return undefined;
		},
	},
});
```

## Contributing

Are you interested in helping iTwinUI grow and expand? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/design-system/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](https://github.com/iTwin/design-system/blob/main/CONTRIBUTING.md) for more information.
