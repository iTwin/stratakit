---
title: Text
status: stable
description: Text is for applying style to runs of text.
links:
  demo: tests/text
  github: packages/bricks/src/Text.tsx
---

## Usage

Use **Text’s** [`variant`](/reference/bricks/Text#Text.variant) prop to affect the size of the encapsulated text node. By default, **Text** renders a `<div>` element.

::example{src="Text.default"}

```jsx
<Text variant="body-sm">Basic text</Text>
```

With **Text** and the [`render`](/reference/foundations/Utils#BaseProps.render) prop, you can affect font size and [HTML semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html) independently. This means you can adjust font size without misappropriating semantic elements.

```jsx
<Text render={<h2 />} variant="headline-md">
	Heading text
</Text>
```

Note the use of the larger `headline-md` variant. While **Text** gives you the flexibility to adjust font size, headings that appear as body text (`body-sm`) would place the document structure and visual hierarchy at odds. One of the `headline-` prefixed values are typical for headings.

:::caution[Grabbing attention]

You may want a statement to _stand out_. This statement might regard a special offer, or perhaps a warning. Standalone statements are _not_ headings, since they do not introduce a new section of content.

In these cases, use a larger `variant` but do not render the text as a heading element:

```jsx
<Text variant="headline-md">This change cannot be undone.</Text>
```

:::

## Configurations

### Variants

The variant determines font size. Set it using the [`variant`](/reference/bricks/Text#Text.variant) prop.

::example{src="Text.variants"}

## ✅ Do

- Use **Text** to affect font size using the [`variant`](/reference/bricks/Text#Text.variant) prop.
- Use the `render` prop to apply a suitable HTML element for the font size.

## ❌ Don’t

- Don’t use **Text** elements as headings without rendering a heading (`<h1>` to `<h6>`) element.
- Don’t use **Text** to disrupt or flatten the visual hierarchy.
