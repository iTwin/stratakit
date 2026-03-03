---
title: Card
description: A Card concisely introduces a topic and its related actions.
links:
  muiDocs: https://mui.com/material-ui/react-card/
  apiReference: https://mui.com/material-ui/api/card/
---

::example{src="mui/Card.default"}

## Use cases

Make sure the **Card** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                          | **Card**                   | [**Tabs**](/components/tabs) | [**Dialog**](/components/dialog)  |
| --------------------------------------------------------------------------------- | -------------------------- | ---------------------------- | --------------------------------- |
| Briefly introduce a set of related subjects, displayed in a list or grid          |             ✅             |            ❌                |                                   |
| Divide a single subject into subsections to be switched between                   |             ✅             |                              |                                   |
| Present actions for a subject that require immediate attention                    |             ✅             |                              |                                   |

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

- Use a heading element to provide a clear title for the card’s content.
- Use `CardActionArea` inside the heading if the entire card should be clickable.
- Use `CardActions` when the card has multiple actions.

## 🚫 Don't

- Don’t use a **Card** to group unrelated content or actions.
- Don’t wrap the entire contents of the card in a `CardActionArea`.
- Don’t use **Card** to highlight content belonging to a larger subject. 
