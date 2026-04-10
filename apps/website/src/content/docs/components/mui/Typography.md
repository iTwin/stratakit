---
title: Typography
description: Typography is for applying style to runs of text.
links:
  muiDocs: https://mui.com/material-ui/react-typography/
  apiReference: https://mui.com/material-ui/api/typography/
---

::example{src="mui/Typography.default"}

## StrataKit MUI modifications

- The `font-family` has been changed to `InterVariable`. See [self-hosting fonts](/getting-started/develop/self-hosting-the-fonts).
- The typography scale has been adjusted to better align with StrataKit's more compact visual language.
- The default `variant` is now `"body2"` instead of `"body1"`.

## Examples

### Heading

Heading `variant` of the **Typography** will render a respective [`<h1>` to `<h6>` heading element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements). You can use the `render` prop to override the default semantics. This is useful when you want to maintain a consistent visual hierarchy without misappropriating semantic elements.

::example{src="mui/Typography.heading"}

:::caution[Grabbing attention]

You may want a statement to _stand out_. This statement might regard a special offer, or perhaps a warning. Standalone statements are _not_ headings, since they do not introduce a new section of content.

In these cases, combine a larger `variant` with the `render` prop:

```jsx
<Typography variant="h5" render={<span />}>
	This change cannot be undone.
</Typography>
```

:::

### Variants

Use **Typography's** `variant` prop to affect both the styling and the [HTML semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html).

::example{src="mui/Typography.variants" min-height="600px"}

## ✅ Do

- Use the `variant` prop of the **Typography** component to affect the styling and the semantics.
- Use the `render` prop to override the semantics when necessary.

## 🚫 Don't

- Don't use **Typography** to disrupt or flatten the visual hierarchy.
