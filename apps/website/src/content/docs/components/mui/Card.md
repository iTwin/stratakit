---
title: Card
description: A Card concisely introduces a subject and its related actions.
links:
  muiDocs: https://mui.com/material-ui/react-card/
  apiReference: https://mui.com/material-ui/api/card/
---

::example{src="mui/Card.default" min-height="325px"}

## Use cases

Make sure the **Card** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                  | **Card** | [**Tabs**](/components/tabs) | [**Dialog**](/components/dialog) |
| ------------------------------------------------------------------------- | -------- | ---------------------------- | -------------------------------- |
| Introduce a single subject, as one of a set displayed as a list or grid   | ✅       | ❌                           | ❌                               |
| Divide a single subject into subsections to be switched between           | ❌       | ✅                           | ❌                               |
| Present additional actions for a subject that require immediate attention | ❌       | ❌                           | ✅                               |

## StrataKit MUI modifications

- `Card` is rendered as an [`<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article) element by default. This programmatically indicates the bounds of the **Card’s** contents.
- `CardHeader`'s `title` is rendered as an `<h2>` by default.
- `CardActionArea` has had `role="button"` removed to avoid conflicting semantics when rendered as a link.
- `CardActionArea` has been redesigned to no longer wrap the entire card content. Instead, it should be used in the **Card's** heading or title area.

## Examples

### CardActions

Add supplementary actions to the `<CardActions>` component. This component must appear as the last child of `<Card>`. Do not include any non-interactive elements here.

::example{src="mui/Card.actions" min-height="375px"}

### CardHeader

Use the `<CardHeader>` component to place the `title` at the top of the **Card**, and optionally supply a `subheader`. In this example, the `action` prop gives access to a menu.

::example{src="mui/Card.header" min-height="425px"}

## ✅ Do

- Use a heading element to provide a clear title for the card’s content. Choose [an appropriate heading level](https://www.a11yproject.com/posts/how-to-accessible-heading-structure/).
- Organize multiple **Cards** into an unordered list, where each list item contains a single **Card**.
- Use `CardActionArea` inside the heading if the entire card should be clickable.
- Use `CardActions` when the card has supplementary actions.

## 🚫 Don't

- Don’t use a **Card** to group unrelated content or actions.
- Don’t use **Card** just to highlight some content belonging to a larger subject.
- Don’t wrap the entire contents of the **Card** in a `CardActionArea`.
