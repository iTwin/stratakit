---
title: Typography
description: Typography is for applying style to runs of text.
links:
  muiDocs: https://mui.com/material-ui/react-typography/
  apiReference: https://mui.com/material-ui/api/typography/
---

::example{src="mui/Typography.default"}

## StrataKit MUI modifications

- The `font-family` has been changed to `InterVariable`. See [self-hosting fonts](/getting-started/develop/#self-hosting-the-fonts).
- The typography scale has been adjusted to better align with StrataKit's more compact visual language.
- Several new [`variant`s](#variants) have been added.
- The default `variant` is now `"inherit"` instead of `"body1"`.
- The `render` prop is required to be set for all heading variants.
- The stock MUI heading and subtitle `variant`s all map to `<h2>` elements by default, except for the `"h1"` variant which still maps to `<h1>`. In all these cases, the `render` prop is required.
- The `"secondary"` color value has been removed. A `"textTertiary"` color value has been added.
- The `variantMapping` prop is not supported.

## Examples

### Variants

The following custom **Typography** `variant`s are available:

- `"display-lg"` / `"display-md"` / `"display-sm"`
- `"headline-lg"` / `"headline-md"` / `"headline-sm"`
- `"body-lg"` / `"body-md"` / `"body-sm"`
- `"subtitle-lg"` / `"subtitle-md"` / `"subtitle-sm"`
- `"caption-lg"` / `"caption-md"` / `"caption-sm"`
- `"mono-sm"`

::example{src="mui/Typography.variants" min-height="600px"}

All of the stock MUI **Typography** `variant`s are also available for backwards compatibility, but not recommended for use.

### Heading

StrataKit decouples the visual presentation of **Typography** from its semantic meaning. Any visual `variant` can be rendered as any HTML element using the `render` prop. This allows for maximum flexibility without compromising accessibility.

When using a heading `variant`, the `render` prop should typically be set to a heading element ([`<h1>` to `<h6>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements)). Be sure to pick the most appropriate heading element required to maintain proper [heading structure](https://www.a11yproject.com/posts/how-to-accessible-heading-structure/) in your application.

::example{src="mui/Typography.heading"}

:::caution[Grabbing attention]

You may want a statement to _stand out_. This statement might regard a special offer, or perhaps a warning. Standalone statements are _not_ headings, since they do not introduce a new section of content. Do _not_ use a semantic heading element in these cases. Instead, set the `render` prop to a generic element (`<p>` or `<span>` or `<div>`):

```jsx
<Typography variant="subtitle-lg" render={<p />}>
	This change cannot be undone.
</Typography>
```

:::

### Colors

By default, the **Typography** component inherits the ancestor's color. Use the [`color`](https://mui.com/material-ui/api/typography/#typography-prop-color) prop to explicitly set the text color.

The following color are available for the `color` prop:

- `"textPrimary"`
- `"textSecondary"`
- `"textTertiary"`
- `"textDisabled"`
- `"primary"`
- `"error"`
- `"info"`
- `"success"`
- `"warning"`

::example{src="mui/Typography.colors"}

## ✅ Do

- Use the `variant` prop of the **Typography** component to affect the visual presentation of the text.
- Use the `render` prop to set the most semantically appropriate element. This is required for heading variants.

## 🚫 Don't

- Don't use **Typography** to disrupt or flatten the visual hierarchy.
- Don't render a heading element when you simply want to grab attention.
