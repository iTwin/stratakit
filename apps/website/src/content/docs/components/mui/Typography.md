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

With **Typography** and the [`render`](/reference/foundations/Utils#BaseProps.render) prop, you can affect font size and [HTML semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html) independently. This means you can adjust font size without misappropriating semantic elements.

```jsx
<Text render={<h2 />} variant="headline-md">
	Heading text
</Text>
```

Note the use of the larger `headline-md` variant. While **Typography** gives you the flexibility to adjust font size, headings that appear as body text (`body-sm`) would place the document structure and visual hierarchy at odds. One of the `headline-` prefixed values are typical for headings.

:::caution[Grabbing attention]

You may want a statement to _stand out_. This statement might regard a special offer, or perhaps a warning. Standalone statements are _not_ headings, since they do not introduce a new section of content.

In these cases, use a larger `variant` but do not render the text as a heading element:

```jsx
<Text variant="headline-md">This change cannot be undone.</Text>
```

:::

### Variants

Use **Typography’s** `variant` prop to affect the size of the encapsulated text node. By default, **Typography** renders a `<div>` element.

::example{src="mui/Typography.variants"}

## ✅ Do

- Use **Typography** to affect font size using the `variant` prop.
- Use the `render` prop to apply a suitable HTML element for the font size.

## ❌ Don’t

- Don’t use **Typography** elements as headings without rendering a heading (`<h1>` to `<h6>`) element.
- Don’t use **Typography** to disrupt or flatten the visual hierarchy.
