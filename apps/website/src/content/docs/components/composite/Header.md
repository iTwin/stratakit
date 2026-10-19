---
title: Header
description: Introduces a page and can contain its identity, breadcrumbs, and actions.
---

::example{src="composite/Header.default" min-width="450px"}

Use the HTML [`<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) element for introductory content at the top of a page. This example shows the application name with the [**Breadcrumbs**](/components/breadcrumbs/) component.

## ✅ Do

- Place the page-level **header** before the main content.
- Give each navigation landmark a descriptive accessible name.
- Use links for navigation and buttons for actions.
- On narrow viewports, follow the [**Breadcrumbs** truncation example](/components/breadcrumbs/#truncation) to keep long trails compact and make hidden items available through a labeled control.

## 🚫 Don't

- Don't add more than one page-level **header** to a page.
- Don't use the page-level **header** for a section or widget.

## API reference

- [`Breadcrumbs`](https://mui.com/material-ui/api/breadcrumbs/)
- [`Divider`](https://mui.com/material-ui/api/divider/)
- [`Link`](https://mui.com/material-ui/api/link/)
- [`Typography`](https://mui.com/material-ui/api/typography/)
- [`<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header)
