# @stratakit/icons

Standalone `.svg` icons for StrataKit.

Each icon is available as an SVG containing multiple resolutions of the same icon using [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol) elements. This allows the icon to be used at different sizes with increasing detail and quality.

Currently supported symbols as identified by their `id` attribute values are:

- `icon`
- `icon-large`

These symbols can be accessed by appending a hash (e.g. `#icon`, `#icon-large`) to the `.svg` URL.

## Installation

Using your package manager of choice, install the latest version of [`@stratakit/icons`](https://www.npmjs.com/package/@stratakit/icons?activeTab=versions).

```console
npm add @stratakit/icons
```

> [!NOTE]
>
> As `@stratakit/icons` requires [bundler configuration](#bundler-configuration), consider making it a _peer_ dependency if you're building a package that uses `@stratakit/icons`.

## Usage

1. Import the icon you want to use.

   Using a static import to get the URL of the icon:

   ```tsx
   import placeholderIcon from "@stratakit/icons/placeholder.svg";
   ```

   Or using the [`import.meta`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta) feature to get the URL of the icon:

   ```tsx
   const placeholderIcon = new URL("@stratakit/icons/placeholder.svg", import.meta.url).href;
   ```

   The static import method is good for use with build tools that support it, while the `import.meta` works better in browsers (but may not work reliably in all build tools).

2. Pass it to the `Icon` component from [`@stratakit/mui`](https://www.npmjs.com/package/@stratakit/mui) or [`@stratakit/foundations`](https://www.npmjs.com/package/@stratakit/foundations).

   ```tsx
   import { Icon } from "@stratakit/mui";

   <Icon href={placeholderIcon} />;
   ```

   An optional hash can be specified to select a specific symbol from the `.svg`:

   ```tsx
   <Icon href={`${placeholderIcon}#icon`} />
   <Icon href={`${placeholderIcon}#icon-large`} size="large" />
   ```

   Alternatively, you can `<use>` the SVG sprite directly (without the `Icon` component):

   ```tsx
   <svg>
   	 <use href={`${placeholderIcon}#icon`} />
   </svg>

   <svg>
   	 <use href={`${placeholderIcon}#icon-large`} />
   </svg>
   ```

> [!IMPORTANT]
> Icons of `@stratakit/icons` should always be used as external HTTP resources, because of [SVG `<use>` element restrictions](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use#usage_notes). Do not inline the SVG content directly in your React components.
> Data URIs and non-HTTP protocols are supported on a best effort basis using client-side JavaScript.

## Bundler configuration

### Vite

Within your Vite configuration, you will need to configure [`build.assetsInlineLimit`](https://vite.dev/config/build-options.html#build-assetsinlinelimit) to ensure `.svg` files are not inlined:

```ts
export default defineConfig({
	// …
	build: {
		assetsInlineLimit: (filePath) => {
			if (filePath.endsWith(".svg")) return false;
			return undefined;
		},
	},
});
```

### Rsbuild

Within your Rsbuild configuration, you will need to configure [`output.dataUriLimit`](https://rsbuild.dev/config/output/data-uri-limit) to ensure `.svg` files are not inlined:

```ts
export default {
	// …
	output: {
		dataUriLimit: {
			svg: 0,
		},
	},
};
```

### esbuild

With esbuild, you will need to enable the [`file` loader](https://esbuild.github.io/content-types/#external-file) for `.svg` files:

```ts
esbuild.build({
	// …
	loader: {
		".svg": "file",
	},
});
```

> [!NOTE]
> esbuild [does not support](https://github.com/evanw/esbuild/issues/795) bundling of assets when using the `URL` constructor, so you may need to additionally use a plugin to transform those into static `import` statements.

## Contributing

Are you interested in helping StrataKit grow? You can submit feature requests or bugs by creating [issues](https://github.com/iTwin/stratakit/issues).

If you're interested in contributing code, please read [`CONTRIBUTING.md`](https://github.com/iTwin/stratakit/blob/main/CONTRIBUTING.md) for more information.
