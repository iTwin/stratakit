# Style Guide

This style guide describes conventions and best practices for the StrataKit project.

## TSX

### Imports

- For Material UI imports use `import Rating from "@mui/material/Rating"` instead of `import { Rating } from "@mui/material"`. For more information see [MUI's guide on reducing bundle size](https://mui.com/material-ui/guides/minimizing-bundle-size/#avoid-barrel-imports)
- For React imports use `import * as React from "react"`.
- Keep imports organized via running `pnpm run lint --write`

## CSS

### Nest CSS rules

[Nest CSS rules](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using) under the main subject (selector to identify the DOM element). If there are multiple DOM elements (eg. tab list and tabs), use multiple groups.

**Do**

```css
.MuiToggleButton-root {
	// ...

	&:where(.Mui-selected) {
		// ...
	}
}
```

**Don't**

```css
.MuiToggleBottom-root {
	// ...
}

.MuiTogglButton-root:where(.Mui-selected) {
	//...
}
```

### Lower specificity

Use [:where](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where) to reduce specificity of rules. This makes it easier for consumers who are not using layers to override the StrataKit styling if need.

| Selector                               | Specificity |          |
| -------------------------------------- | ----------- | -------- |
| `.MuiRating-root.Mui-disabled`         | `0, 2, 0`   | ❌ Don't |
| `.MuiRating-root:where(.Mui-disabled)` | `0, 1, 0`   | ✅ Do    |

### Use CSS logical properties

Use [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values) instead of physical properties. This is to support different locales that do use a left-right top-bottom layout.

Below are some examples. Refer to the documentation logical properties for a complete list.

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
	:where(.MuiTableSortLabel-root:hover) & {
		opacity: 1;
	}
}
```
