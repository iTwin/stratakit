---
title: Styling
description: Style custom interfaces with StrataKit components and design tokens
---

Start with a [StrataKit component](/components/overview/) when it meets your needs. Components provide consistent appearance, behavior, and accessibility. For custom layouts and UI, use [StrataKit tokens](/tokens/overview/) to keep styles aligned with the rest of your interface.

## Requirements

Follow these rules in all custom styling. Skipping them breaks component styling, accessibility, or future upgrades.

### Style component instances

Avoid using [MUI's `sx` prop](https://mui.com/system/getting-started/the-sx-prop/) for application styling. The same applies to MUI's other CSS-in-JS escape hatches, such as the [`styled()`](https://mui.com/system/styled/) utility and [`createTheme`](https://mui.com/material-ui/customization/theming/) style overrides. StrataKit owns the theme, and such overrides can conflict with its styles. Add an application-owned class with `className` and define its styles in CSS instead:

```tsx
<Button className="app-toolbarButton">Save</Button>
```

### Don't target internal class names

Class names applied by StrataKit and MUI, such as `.MuiButton-root` or `.Mui-disabled`, are implementation details. They may change in any release without notice, so selectors that target them are fragile. An application-owned class passed through `className` is the only stable styling hook.

### Don't use private CSS variables

Only CSS variables prefixed with `--stratakit-` are public. Variables without this prefix (including `--_*`-prefixed ones) are private implementation details and may change without notice. Also avoid `--stratakit-mui-*` variables, which exist only for MUI compatibility. See the [token naming convention](/tokens/overview/#naming-convention) for details.

### Support both color schemes

StrataKit supports light and dark color modes through the [Root](/components/root/) component's `colorScheme` prop. Color tokens update automatically when the color scheme changes, so custom styles that use them adapt for free. Avoid literal color values, which look correct in one mode and break in the other. Always test custom UI in both light and dark modes.

In the rare case where a style must branch on color scheme, key off the `data-color-scheme` attribute that **Root** manages on the `<html>` element:

```css
[data-color-scheme="dark"] .app-heroBanner {
	background-image: url("/hero-dark.webp");
}
```

### Keep focus outlines visible

StrataKit provides a consistent, accessible focus outline for all interactive elements and actively guards it against removal. Do not fight this: never set `outline: none` (or `outline: 0`) in application styles. People navigating with a keyboard rely on the focus outline to know where they are.

If a custom element needs different focus styling, scope it to [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) and ensure the replacement indicator is clearly visible in both color schemes.

### Use logical properties

Write custom styles with [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values). `margin-inline-start` instead of `margin-left`, `padding-block` instead of `padding-top`/`padding-bottom`, and so on. StrataKit's own styles are written this way, keeping layouts correct in right-to-left and vertical writing modes:

```css
.app-toolbarButton {
	margin-inline-start: var(--stratakit-space-100);
}
```

## Recommendations

These practices aren't strictly required, but they make custom styles more resilient and inclusive.

### Use design tokens

Prefer [StrataKit tokens](/tokens/overview/) over hard-coded values. Tokens keep custom UI visually consistent with StrataKit components and automatically adapt to theming changes:

```css
.app-sidePanel {
	padding: var(--stratakit-space-200);
	border-radius: var(--stratakit-radius-md);
	background-color: var(--stratakit-color-bg-elevation-base);
	color: var(--stratakit-color-text-neutral-primary);
}
```

### Use cascade layers

StrataKit and MUI styles use CSS cascade layers. Declare your application layer after them to set override order, rather than increasing selector specificity or using `!important`. See [MDN's guide to cascade layers](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers) for details.

```css
@layer reset, mui, stratakit, app;

@layer app {
	.app-toolbarButton {
		border-radius: var(--stratakit-radius-md);
	}
}
```

Within your own layer, keep selector specificity low. Prefer single-class selectors, and use [`:where()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) when a selector needs extra qualification, so that later styles in the same layer can still override earlier ones without specificity battles.

### Support `forced-colors` mode

StrataKit components are tested against [`forced-colors` mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) (e.g. Windows High Contrast), where the operating system replaces author colors with a user-chosen palette. Custom UI should hold up there too:

- Test custom interfaces with `forced-colors` active (in Chromium DevTools: **Rendering > Emulate CSS media feature `forced-colors`**).
  - Ideally, also verify on Windows with a real [Contrast Theme](https://support.microsoft.com/en-us/windows/change-color-contrast-in-windows-fcc6f341-954d-9c5c-4df2-fc6d2aa5e1b6) enabled. DevTools emulation only approximates forced colors and won't reflect actual user-chosen palettes.
- When adjustments are needed, use a `forced-colors: active` media query with [CSS system colors](https://developer.mozilla.org/en-US/docs/Web/CSS/system-color) such as `CanvasText` or `SelectedItem`, rather than opting out with `forced-color-adjust: none`.
- Don't rely on background color alone to convey state; borders and outlines survive `forced-colors`, backgrounds often don't.
