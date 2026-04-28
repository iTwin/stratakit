---
title: Card
description: A Card concisely introduces a subject and its related actions.
links:
  muiDocs: https://mui.com/material-ui/react-card/
  apiReference: https://mui.com/material-ui/api/card/
---

::example{src="mui/Card.default" min-height="325px"}

Make simple **Cards** clickable by wrapping the title in [`CardActionArea`](https://mui.com/material-ui/api/card-action-area/).

For different configurations, see [**Examples**](#examples).

## Use cases

Make sure the **Card** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                  | [Card](/components/card) | [Tabs](/components/tabs) | [Dialog](/components/dialog) |
| ------------------------------------------------------------------------- | ------------------------ | ------------------------ | ---------------------------- |
| Introduce a single subject, as one of a set displayed as a list or grid   | ✅                       | ❌                       | ❌                           |
| Divide a single subject into subsections to be switched between           | ❌                       | ✅                       | ❌                           |
| Present additional actions for a subject that require immediate attention | ❌                       | ❌                       | ✅                           |

## StrataKit MUI modifications

- `Card` is rendered as an [`<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article) element by default. This programmatically indicates the bounds of the **Card’s** contents.
- `CardHeader`'s `title` is rendered as an `<h2>` by default.
- `CardActionArea` has been redesigned to no longer wrap the entire card content. Instead, it should be used in the **Card's** title.

## Examples

### Actions

Add multiple actions, at the foot of the **Card**, with the [`CardActions`](https://mui.com/material-ui/api/card-actions/) component.

::example{src="mui/Card.actions"}

:::caution
**Cards** with `CardActions` must not include `CardActionArea`, which is better suited when the entire **Card** is actionable.
:::

### Menu and metadata

Add metadata and a [**Menu**](/components/menu) to [`CardHeader`](https://mui.com/material-ui/api/card-header/) using the `subheader` and `action` props.

::example{src="mui/Card.menu" min-height="325px"}

### Heading levels

Use `slotProps` to give the [`CardHeader`](https://mui.com/material-ui/api/card-header/)’s `title` [an appropriate heading level](https://www.a11yproject.com/posts/how-to-accessible-heading-structure/). The second level (`<h2>`) is the default.

```jsx {8}
<CardHeader
	title={
		<CardActionArea render={<a href="#" />} nativeButton={false}>
			Stadium
		</CardActionArea>
	}
	slotProps={{
		title: { render: <h3 /> },
	}}
/>
```

## ✅ Do

- Choose [an appropriate heading level](https://www.a11yproject.com/posts/how-to-accessible-heading-structure/) for the `CardHeader` title.
- Organize multiple **Cards** into an unordered list, where each list item contains a single **Card**.
- Use [`CardActionArea`](https://mui.com/material-ui/api/card-action-area/) when there is only a single action and the entire card should be clickable.
- Use [`CardActions`](https://mui.com/material-ui/api/card-actions/) when the **Card** has multiple actions.

## 🚫 Don't

- Don’t use a **Card** to group unrelated content or actions.
- Don’t use **Card** just to highlight some content belonging to a larger subject.
- Don’t wrap the entire contents of the **Card** in a `CardActionArea`. Typically, it should be passed into the `CardHeader`'s `title`.
