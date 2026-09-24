---
title: Breadcrumbs
description: Breadcrumbs display the current page's location within a navigational hierarchy.
links:
  muiDocs: https://mui.com/material-ui/react-breadcrumbs/
  apiReference: "#api-reference"
---

::example{src="mui/Breadcrumbs.default"}

## StrataKit MUI modifications

- Updated the examples to use [`aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current) on the current breadcrumb for improved accessibility.

## Examples

### Buttons

Breadcrumb items are typically rendered as links. If a breadcrumb item triggers in-page navigation without changing the URL, the [**Button**](/components/button) style may be more appropriate.

::example{src="mui/Breadcrumbs.button"}

### Truncation

When the full hierarchy does not fit, hide intermediate breadcrumb items and use a [**Menu**](/components/menu) to provide access to them.

::example{src="mui/Breadcrumbs.menu"}

## API reference

- [`Breadcrumbs`](https://mui.com/material-ui/api/breadcrumbs/)
- [`Link`](https://mui.com/material-ui/api/link/)
- [`Button`](https://mui.com/material-ui/api/button/)
- [`Menu`](https://mui.com/material-ui/api/menu/)
