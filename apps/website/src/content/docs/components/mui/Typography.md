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
- The default `variant` is now `"body2"` instead of `"body1"`.
- A warning will be logged during development if a heading variant is used without explicitly setting the `render` prop.

## Examples

### Heading

Heading `variant`s of the **Typography** will render the respective [`<h1>` to `<h6>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements) heading elements. You should use the `render` prop to override the rendered element and maintain proper [heading structure](https://www.a11yproject.com/posts/how-to-accessible-heading-structure/) in your application. When the `render` prop is not set, StrataKit will log a warning during development.

::example{src="mui/Typography.heading"}

:::caution[Grabbing attention]

You may want a statement to _stand out_. This statement might regard a special offer, or perhaps a warning. Standalone statements are _not_ headings, since they do not introduce a new section of content.

In these cases, combine a larger `variant` with the `render` prop to set a generic `<span>` or `<div>` element:

```jsx
<Typography variant="h6" render={<span />}>
	This change cannot be undone.
</Typography>
```

:::

### Variants

All of the stock MUI **Typography** `variant`s are available, with sizing adjusted to fit StrataKit's more compact visual language.

::example{src="mui/Typography.variants" min-height="600px"}

## ✅ Do

- Use the `variant` prop of the **Typography** component to affect the visual presentation of the text.
- Use the `render` prop to set the most semantically appropriate element. This is especially important for heading variants.

## 🚫 Don't

- Don't use **Typography** to disrupt or flatten the visual hierarchy.
- Don't render a heading element when you simply want to grab attention.
