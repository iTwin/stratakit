# Style Guide

This style guide describes conventions and best practices for the StrataKit project.

## TSX

### Use `interface` instead `type`

Although they are very similar, use `interface` for consistency and [better detection of type errors](https://ariakit.com/guide/coding-guidelines#prefer-interface-over-type).

### forwardRef

Use the `forwardRef` utility from [packages/internal-utils](./packages/internal-utils/src/react.ts) instead of `React.forwardRef`. The internal version allows refs to be loosely typed as `HTMLElement`.

## CSS

### Group CSS rules by target element

[Nest CSS rules](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using) under the main subject (i.e. selector to identify the DOM element). If there are multiple DOM elements (e.g. tab list and tabs), use multiple groups.

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

Use [:where](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where) to try and keep a flat specifcificy of 0,1,0. This supports reading the CSS from top to bottom, knowing the declarations further down take priority.

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

Use [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values) instead of physical properties. This is to support different locales that do use a left-right top-bottom layout.

| Physical property | Logical property    |
| ----------------- | ------------------- |
| margin-top        | margin-block-start  |
| margin-bottom     | margin-block-end    |
| margin-left       | margin-inline-start |
| magin-right       | margin-inline-end   |
| max-width         | max-inline-size     |
| max-height        | max-block-size      |

### Wrap hover rules with media query

Wrap any rules relating to hover with the [`any-hover` media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/any-hover). This prevents an undesirable situation on touch devices where the hover state may get stuck on after a tap.

```css
@media (any-hover: hover) {
	&:where(:hover) {
		opacity: 1;
	}
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

### Format Code

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
