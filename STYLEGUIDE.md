# Style Guide

This style guide describes conventions and best practices for the StrataKit project.

## TSX

### Imports

- For Material UI imports use `import Rating from "@mui/material/Rating"` instead of `import { Rating } from "@mui/material"`. For more information see [MUI's guide on reducing bundle size](https://mui.com/material-ui/guides/minimizing-bundle-size/#avoid-barrel-imports)
- For React imports use `import * as React from "react"`.
- Keep imports organized via running `pnpm run lint --write`

### forwardRef

Use the `forwardRef` from [packages/foundations](./packages/foundations/src/~utils.tsx) instead of `React.forwarrd`. The internal version allows refs to be loosely typed as `HTMLElement`.

## CSS

### Group CSS rules by target element

[Nest CSS rules](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using) under the main subject (selector to identify the DOM element). If there are multiple DOM elements (eg. tab list and tabs), use multiple groups.

**✅ Do**

```css
.MuiToggleButton-root {
	// ...

	&:where(.Mui-selected) {
		// ...
	}
}
```

**❌ Don't**

```css
.MuiToggleBottom-root {
	// ...
}

.MuiTogglButton-root:where(.Mui-selected) {
	//...
}
```

### Target 0,1,0 sepecificity with rules

Use [:where](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where) to try and keep a flat specifcificy of 0,1,0. This makes it easier for consumers who are not using layers to override the StrataKit styling if need.

You can use `:where`

**✅ Do**

```css
.MuiRating-root:where(.Mui-disabled) {
	/* 0,1,0 specificity */
}
```

**❌ Don't**

```css
.MuiRating-root.Mui-disabled {
	/* 0,2,0 specificity */
}
```

### Use CSS logical properties

Use [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values) instead of physical properties. This is to support different locales that do use a left-right top-bottom layout.

Wrap any rules relating to hover with the [`any-hover` media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/any-hover). This prevents an undesirable situation on touch devices where the hover state may get stuck on after a tap.

| Physical property | Logical property    |
| ----------------- | ------------------- |
| margin-top        | margin-block-start  |
| margin-bottom     | margin-block-end    |
| margin-left       | margin-inline-start |
| magin-right       | margin-inline-end   |
| max-width         | max-inline-size     |
| max-height        | max-block-size      |

### Wrap hover rules with media query

Wrap any rules relating to hover with a media query. This prevents a bug on iOS where the hover state may get stuck on after a tap.

```css
@media (any-hover: hover) {
	:where(:hover) & {
		opacity: 1;
	}
}
```
