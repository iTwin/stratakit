---
title: Icon
description: Icons are used to visually represent actions or information.
links:
  apiReference: /reference/mui/Icon/
---

::example{src="mui/Icon.default"}

The **Icon** component ensures a consistent visual style for icons throughout the user interface. It is optimized for use with [StrataKit icons](/icons/), but it also supports [custom icons](#custom).

Use the `href` prop to specify the icon you want to display. This prop should be set to a URL to an `.svg` from the [`@stratakit/icons`](https://www.npmjs.com/package/@stratakit/icons?activeTab=versions) package, or a [URI fragment](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment) pointing to a [`<symbol>` element](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/symbol) inside an SVG. All StrataKit icons include two symbols with different levels of detail: `#icon` (the default) and `#icon-large`.

## Examples

### Sizes

Use the `size` prop to adjust the **Icon's** physical dimensions.

- **Regular:** Default size, suitable for most use cases.
- **Large:** Increased size, use in larger spaces.

::example{src="mui/Icon.sizes"}

:::note[Increase detail]

In the example above, `#icon-large` symbol is applied to the large icon to display a more detailed icon.

:::

### Decorative

Omit the `alt` prop if the **Icon** is purely decorative. This will hide the **Icon** from assistive technologies.

::example{src="mui/Button.icon"}

### Color

Use the [`color` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color) to adjust the **Icon's** color. Prefer usage of StrataKit color tokens when adjusting the **Icon's** color.

::example{src="mui/Icon.color"}

### Custom

Use the `render` prop to display a custom SVG icon.

::example{src="mui/Icon.custom"}

## ✅ Do

- If an accessible name is not provided by other means, use the `alt` prop to provide a descriptive label.
- Increase **Icon** detail when physical size increases.

## 🚫 Don't

- Don't use the `alt` prop if there is already an accessible label in place (as in `IconButton`).
- Don't use custom icons when a standard icon is available in `@stratakit/icons`.
- Don't use non-standard icons from `@mui/icons-material`.
- Don't use the `SvgIcon` component from `@mui/material`.
