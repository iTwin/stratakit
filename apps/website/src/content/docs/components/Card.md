---
title: Card
description: Cards are used to display content and actions about a single subject.
links:
  muiDocs: https://mui.com/material-ui/react-card/
  apiReference: https://mui.com/material-ui/api/card/
---

::example{src="mui/Card.default"}

## StrataKit MUI modifications

- `Card` is rendered as an `<article>` element by default.
- `CardHeader`'s `title` is rendered as `<h2>` by default.
- `CardActionArea` will not have an unnecessary `role="button"` to avoid conflicting semantics when rendered as a link.
- `CardActionArea` has been redesigned to not wrap the entire card content. Instead, it should be used in the card's heading or title area.

## Examples

### CardActions

::example{src="mui/Card.actions"}

### CardHeader

::example{src="mui/Card.header"}

## ✅ Do

- Use a heading element to provide a clear title for the card's content.
- Use `CardActionArea` inside the heading if the entire card should be clickable.
- Use `CardActions` when the card has multiple actions.

## 🚫 Don't

- Don't use a **Card** to group unrelated content or actions.
- Don't wrap the entire contents of the card in a `CardActionArea`.
