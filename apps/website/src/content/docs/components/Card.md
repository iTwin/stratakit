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

## Examples

### CardActions

::example{src="mui/Card.actions"}

### CardHeader

::example{src="mui/Card.header"}

## ✅ Do

- Use a heading element to provide a clear title for the card's content.

## 🚫 Don't

- Don't use a **Card** to group unrelated content or actions.
