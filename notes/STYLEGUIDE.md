# Style Guide

This style guide describes conventions and best practices for the StrataKit project.

## TSX

### Use `interface` instead `type`

Although they are very similar, use `interface` for consistency and [better detection of type errors](https://ariakit.com/guide/coding-guidelines#prefer-interface-over-type).

### forwardRef

Use the `forwardRef` utility from [packages/internal-utils](../packages/internal-utils/src/react.ts) instead of `React.forwardRef`. The internal version allows refs to be loosely typed as `HTMLElement`.

### File structure

- Declare the main component or function of the file near the top.
  - Helper or utility functions used in the main component can follow after.
  - Static constants can still be declared before the main export.
- Within `packages/`, place the `export` statement at the very bottom of the file. This allows easier review of the API surface.
- For React components, declare the props interface directly above the relevant component.
- Improve the scannability of long files by grouping related code together and using separator comments to indicate different regions.

### Define an interface for prop types if there are more than one or two props

**✅ Do**

```tsx
interface RadioTileProps {
	label: string;
	description?: string;
	value: string;
	icon?: React.ReactNode;
	disabled?: boolean;
}

function RadioTiles(props: RadioTileProps) {
	/* ... */
}
```

**❌ Don't**

```tsx
function RadioTile(props: {
	label: string;
	description?: string;
	value: string;
	icon?: React.ReactNode;
	disabled?: boolean;
}) {
	/* ... */
}
```

### Destructure props as the first line of the function instead of the function parameters

**✅ Do**

```tsx
function RadioTiles(props: RadioTileProps) {
	const { label, description, value, icon, disabled } = props;
	/* ... */
}
```

**❌ Don't**

```tsx
function RadioTile({ label, description, value, icon, disabled }: RadioTileProps) {
	/* ... */
}
```

## CSS

### Group CSS rules by target element

[Nest CSS rules](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using) under the main subject (i.e. selector to identify the DOM element). If there are multiple DOM elements (e.g. tab list and tabs), use multiple groups.

One exception is with rules involving pseudo elements. These must be written out independently and cannot be nested because [nesting only matches at the element level](https://www.w3.org/TR/css-nesting-1/#nest-selector)

**✅ Do**

```css
.MuiButton-root {
	/* ... */

	&:where(.Mui-selected) {
		/* ... */
	}
}

.MuiButton-icon {
	/* ... */
}
```

**❌ Don't**

```css
.MuiButton-root {
	/* ... */

	&:where(.Mui-selected) {
		/* ... */
	}

	.MuiButton-icon {
		/* ... */
	}
}
```

### Target 0,1,0 sepecificity with rules

Use [`:where()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where) to try and keep a flat specificity of 0,1,0. This supports reading the CSS from top to bottom, knowing the declarations further down take priority.

**✅ Do**

```css
.MuiRating-root {
	&:where(.Mui-disabled) {
		/* 0,1,0 specificity */
	}
}
```

**❌ Don't**

```css
.MuiRating-root {
	&.Mui-disabled {
		/* 0,2,0 specificity */
	}
}
```

### Use CSS logical properties

Use [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values) instead of physical properties. This is to support different locales that don't use a left-right top-bottom layout.

| Physical property | Logical property    |
| ----------------- | ------------------- |
| margin-top        | margin-block-start  |
| margin-bottom     | margin-block-end    |
| margin-left       | margin-inline-start |
| magin-right       | margin-inline-end   |
| max-width         | max-inline-size     |
| max-height        | max-block-size      |

### Namespace global identifiers

Any identifiers that live in the global scope, such as CSS custom properties, keyframes, or global class names, should be namespaced with a prefix to avoid collisions with third-party styles. The exact prefix depends on the specific package where the styles live; check surrounding files for existing conventions.

**✅ Do**

```css
@keyframes --🥝Skeleton-shimmer {
}
```

```css
@property --_MuiYearCalendar-fade-start {
}
```

**❌ Don't**

```css
@keyframes shimmer {
}
```

```css
@property --fade-start {
}
```

### Wrap hover rules with media query

Wrap any rules relating to hover with the [`any-hover` media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/any-hover). This prevents an undesirable situation on touch devices where the hover state may get stuck on after a tap.

```css
@media (any-hover: hover) {
	&:where(:hover) {
		opacity: 1;
	}
}
```

### Forced-colors styles

Define any styles related to [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/forced-colors) in a dedicated `.css` file, separately from the main component styles. This allows all `forced-colors` styles to be imported and applied from one place. For example, see [`~forced-colors.css`](https://github.com/iTwin/stratakit/blob/main/packages/mui/src/~forced-colors.css).

```css
@import "./~forced-colors.css" (forced-colors: active);
```

Keep [`forced-color-adjust`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/forced-color-adjust) declarations scoped to the smallest set of elements possible, and include a brief code comment explaining why this declaration is necessary.

**✅ Do**

```css
.MuiBottomNavigationAction-label {
	&:where(.Mui-selected) {
		forced-color-adjust: none; /* removing the backplate */
	}
}
```

**❌ Don't**

```css
.MuiBottomNavigationAction-content {
	forced-color-adjust: none;
}
```

## Changesets

### Grammar

- Begin with a past tense verb.
- Use proper grammar and end with a period.

**✅ Do**

> Deprecated the `color` prop of `Chip`.

**❌ Don't**

> Deprecate `color` prop of `Chip`

### Format code

- Use backticks to highlight code.
- Include quotes around string values. Numbers and boolean values are unquoted.
- Refer to React components without the `<` `>` unless you are referencing them in JSX syntax.
- Refer to HTML elements wth `<` `>`.

**✅ Do**

> Updated `List` to render as `<ul>`.

> Set `"primary"` the default `color` for `CircularProgress`.

> Fixed bug with `hidden={true}` of `Dialog`.

**❌ Don't**

> Updated `<List>` to render as `ul`

> Made `primary` the default color for `<CircularProgress>`.

> Fixed bug with hidden=true of Dialog.
