---
"@stratakit/mui": patch
---

`Card` will now be rendered as an `<article>` element by default. This should be used in combination with a heading inside the card. In cases where `CardHeader` is used, its `title` will be rendered as `<h2>` by default. In other cases, you can use the `Typography` component with `render` prop to specify the heading level.
