---
title: Styling
description: Style custom interfaces with StrataKit components and design tokens
---

Start with a [StrataKit component](/components/overview/) when it meets your needs. Components provide consistent appearance, behavior, and accessibility. For custom layouts and UI, use [StrataKit tokens](/tokens/overview/) to keep styles aligned with the rest of your interface.

## Let components own their appearance

A component owns its appearance: the colors, padding, typography, and everything else inside its border. Styling an instance should mostly be about placing it in your layout. Properties like `margin`, `padding`, and `flex`/`grid` placement are fair game, while heavy overrides of a component's base styles are not. If a component's appearance doesn't fit your needs, reach for its props and variants first, or see the [component customization](/guides/component-customization) guide.

## Style component instances

When you do style an instance, avoid using [MUI's `sx` prop](https://mui.com/system/getting-started/the-sx-prop/), even though it's the first thing MUI's documentation reaches for. The same applies to MUI's other CSS-in-JS escape hatches, such as the [`styled()`](https://mui.com/system/styled/) utility and [`createTheme`](https://mui.com/material-ui/customization/theming/) style overrides. There are a few reasons:

- **The overrides lose to StrataKit styles.** `sx` and `styled()` styles are injected into the lower-priority `mui` cascade layer, so any conflicting StrataKit style (in the `stratakit` layer) wins over them.
- **StrataKit owns the MUI theme.** `sx` and `styled()` resolve values (palette keys, spacing units, breakpoints) through that theme, whose internals are not public API and may change in any release.
- **It only covers part of your UI.** Only MUI-based components accept `sx`; the rest of StrataKit's components don't. Plain CSS is the one approach that works everywhere.
- **Runtime CSS-in-JS carries well-known costs.** Generating styles at runtime [hurts performance](https://github.blog/engineering/architecture-optimization/improving-site-performance-by-shipping-more-css/), and the resulting styles are less portable and harder to audit than plain CSS.

Instead, pass an application-owned class through `className`. Every component accepts it and applies it to its root element:

```tsx
<Button className="app-toolbarButton">Save</Button>
```

Define its styles in a regular CSS file that your application owns and imports (your bundler takes care of loading it onto the page):

```css
/* app.css — imported from your application's entry point */
.app-toolbarButton {
	margin-inline-start: auto;
}
```

Rather than hand-prefixing global class names like `app-*` (used on this page for brevity), prefer [CSS modules](https://github.com/css-modules/css-modules), which are supported out of the box by Vite, Next.js, and most other bundlers. Class names in a `*.module.css` file are scoped at build time, so they can stay short and can't collide with other styles:

```tsx
import styles from "./Toolbar.module.css";

<Button className={styles.saveButton}>Save</Button>;
```

```css
/* Toolbar.module.css */
.saveButton {
	margin-inline-start: auto;
}
```

## Target your own class names

An application-owned class passed through `className` is the most reliable styling hook. It stays stable no matter how StrataKit composes its components under the hood.

Never target class names applied by StrataKit — prefixed with 🥝, such as `.🥝Tree`. They are internal implementation details and may change in any release without notice.

MUI's `Mui`-prefixed class names (such as `.MuiButton-root` or `.Mui-disabled`) are different: they are part of [MUI's public API](https://mui.com/material-ui/customization/how-to-customize/#overriding-styles-with-class-names) and are sometimes the only available hook, for example when styling third-party components built for MUI. Even so, when you control the element, prefer your own class.

## Don't use private CSS variables

Only CSS variables prefixed with `--stratakit-` are public. Variables without this prefix (including `--_*`-prefixed ones) are private implementation details and may change without notice. Also avoid `--stratakit-mui-*` variables, which exist only for MUI compatibility. See the [token naming convention](/tokens/overview/#naming-convention) for details.

## Support both color schemes

StrataKit supports light and dark color modes through the [Root](/components/root/) component's `colorScheme` prop. Color tokens update automatically when the color scheme changes, so custom styles that use them adapt for free. Avoid literal color values, which look correct in one mode and break in the other. Always test custom UI in both light and dark modes.

For a custom color that no token covers, use [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark). It resolves against the CSS `color-scheme` property, which StrataKit keeps in sync with the active color scheme:

```css
.app-heroBanner {
	border-color: light-dark(oklch(32% 0.1 250), oklch(85% 0.08 250));
}
```

In the rare case where a non-color style must branch on color scheme, key off the `data-color-scheme` attribute that **Root** manages on the `<html>` element:

```css
[data-color-scheme="dark"] .app-heroBanner {
	background-image: url("/hero-dark.webp");
}
```

## Keep focus outlines visible

StrataKit provides a consistent, accessible focus outline for all interactive elements and actively guards it against removal. Do not fight this: never set `outline: none` (or `outline: 0`) in application styles without re-introducing your own focus outline. People navigating with a keyboard rely on the focus outline to know where they are.

The default outline is drawn slightly outside the element, so a clipping ancestor (e.g. `overflow: hidden`) or a tight container edge can cut it off. When that happens, instead of removing the outline pull it inside the element with a negative [`outline-offset`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset). StrataKit's own styles use this technique in tight layouts such as menus and tabs.

If a custom element needs different focus styling, scope it to [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) and ensure the replacement indicator is clearly visible in both color schemes.

## Best practices

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

## Use logical properties

Write custom styles with [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values). `margin-inline-start` instead of `margin-left`, `padding-block` instead of `padding-top`/`padding-bottom`, and so on. StrataKit's own styles are written this way, keeping layouts correct in right-to-left and vertical writing modes:

```css
.app-toolbarButton {
	margin-inline-start: var(--stratakit-space-100);
}
```

### Keep selector specificity low

StrataKit and MUI declare their styles in [CSS cascade layers](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers), and unlayered styles take precedence over layered ones. Plain application CSS therefore already overrides component styles. There should never be a need to escalate specificity or reach for `!important` when overriding StrataKit styling.

Keep your own selectors simple too. Prefer single-class selectors, and use [`:where()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) when a selector needs extra qualification, so that later styles can still override earlier ones without specificity battles.

If your application organizes its styles in cascade layers of its own, declare the layer order up front so your layers come after StrataKit's:

```css
@layer reset, mui, stratakit, app;
```

### Support `forced-colors` mode

StrataKit components are tested against [`forced-colors` mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) (e.g. Windows High Contrast), where the operating system replaces author colors with a user-chosen palette. Custom UI should hold up there too:

- Test custom interfaces with `forced-colors` active (in Chromium DevTools: **Rendering > Emulate CSS media feature `forced-colors`**).
  - Ideally, also verify on Windows with a real [Contrast Theme](https://support.microsoft.com/en-us/windows/change-color-contrast-in-windows-fcc6f341-954d-9c5c-4df2-fc6d2aa5e1b6) enabled. DevTools emulation only approximates forced colors and won't reflect actual user-chosen palettes.
- When adjustments are needed, use a `forced-colors: active` media query with [CSS system colors](https://developer.mozilla.org/en-US/docs/Web/CSS/system-color) such as `CanvasText` or `SelectedItem`, rather than opting out with `forced-color-adjust: none`.
- Don't rely on background color alone to convey state; borders and outlines survive `forced-colors`, backgrounds often don't.
