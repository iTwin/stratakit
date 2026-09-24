# @stratakit/icons

Standalone `.svg` icons for StrataKit.

## Symbols

Each icon is available as a single SVG file, which can contain multiple variations defined as [`<symbol>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol) elements.

All icons provide regular and large variations, allowing the icons to be used at different sizes with increasing detail and quality:

- `icon` (default)
- `icon-large`

Some icons may include symbols for other variations, such as `filled` and `filled-large`.

[Named exports](#named-exports) include the symbol fragment (e.g. `#icon` or `#icon-large`) for you. [Raw `.svg` imports](#raw-svg-imports) require appending it yourself.

## Installation

Using your package manager of choice, install the latest version of [`@stratakit/icons`](https://www.npmjs.com/package/@stratakit/icons?activeTab=versions).

```console
npm add @stratakit/icons
```

> [!NOTE]
>
> As `@stratakit/icons` requires [bundler configuration](#bundler-configuration), consider making it a _peer_ dependency if you're building a package that uses `@stratakit/icons`.

## Usage

There are two ways to import an icon:

- **Named JS exports** return ready-to-use, complete URLs for specific symbols.
- **Raw SVG imports** return the URL of the SVG file (without a symbol fragment).

Both approaches require [bundler configuration](#bundler-configuration) to load SVGs as asset URLs.

### Named exports

Import the symbols you need from the icon's subpath (without the `.svg` extension):

```tsx
import { svgPlaceholder, svgPlaceholderLarge } from "@stratakit/icons/placeholder";
```

These named exports give you complete URLs that can be passed directly to the `Icon` component from [`@stratakit/mui`](https://www.npmjs.com/package/@stratakit/mui) or [`@stratakit/foundations`](https://www.npmjs.com/package/@stratakit/foundations):

```tsx
import { Icon } from "@stratakit/mui";

<Icon href={svgPlaceholder} />;
<Icon href={svgPlaceholderLarge} size="large" />;
```

### Raw SVG imports

Directly importing the raw `.svg` file gives you its asset URL without selecting a symbol. Append the desired [symbol](#symbols) ID when using the URL:

```tsx
import svgPlaceholder from "@stratakit/icons/placeholder.svg";

<Icon href={`${svgPlaceholder}#icon`} />;
<Icon href={`${svgPlaceholder}#icon-large`} size="large" />;
```

TypeScript consumers may need a `*.svg` module declaration for raw imports, though this is sometimes handled automatically by build tools like Vite.

> [!IMPORTANT]
> Icons of `@stratakit/icons` should always be used as external HTTP resources, because of [SVG `<use>` element restrictions](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use#usage_notes). Do not inline the SVG content directly in your React components.
> Data URIs and non-HTTP protocols are supported on a best effort basis using client-side JavaScript.

## Bundler configuration

Configure your bundler to emit SVG files and return their URLs rather than inline their contents. This is necessary regardless of whether you are using named exports or raw `.svg` imports.

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
