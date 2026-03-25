---
title: Icon
description: Icons are used to visually represent actions or information.
links:
  apiReference: /reference/foundations/Icon/
---

::example{src="mui/Icon.default"}

## Examples

### Sizes

Use the `size` prop to adjust the **Icon’s** physical dimensions.

- **Regular:** Default size, suitable for most use cases.
- **Large:** Increased size, use for emphasis.

::example{src="mui/Icon.sizes"}

:::note[Increase detail]

The [`@stratakit/icons`](https://github.com/iTwin/stratakit/tree/main/packages/icons) package uses [`<symbol>` elements](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/symbol) to provide multiple resolutions of the same icon. Use a [URI fragment](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment) in the `href` prop to reference a specific symbol. The available symbols are `#icon` (default) and `#icon-large`. In the example above, `#icon-large` symbol is applied to the large icon to display a more detailed icon.

:::

### Decorative

Omit the `alt` prop if the **Icon** is purely decorative. This will hide the **Icon** from assistive technologies.

::example{src="mui/Button.icon"}

### Inline

Use the `render` prop to display a custom inline SVG icon.

::example{src="mui/Icon.inline"}

## ✅ Do

- If an accessible name is not provided by other means, use the `alt` prop to provide a descriptive label.
- Increase **Icon** detail when physical size increases.

## 🚫 Don’t

- Don’t use the `alt` prop if there is already an accessible label in place (as in `IconButton`).
- Don’t use custom icons when a standard icon is available in `@stratakit/icons`.
