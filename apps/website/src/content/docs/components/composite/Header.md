---
title: Header
description: Introduces a page and can contain its identity, breadcrumbs, and actions.
---

::example{src="composite/Header.default"}

Use a native [`<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) for introductory content at the top of a page. This example combines a page heading, project and model buttons grouped with MUI `Breadcrumbs`, and utility actions.

## ✅ Do

- Place the page-level header before the main content.
- Give each navigation landmark a descriptive accessible name.
- Use links for navigation and buttons for actions.

## 🚫 Don't

- Don't add more than one page-level `<header>` to a page.
- Don't use a page-level header for a section or widget; use a heading element instead.

## API reference

- [`Breadcrumbs`](https://mui.com/material-ui/api/breadcrumbs/)
- [`Icon`](/reference/mui/Icon)
- [`IconButton`](https://mui.com/material-ui/api/icon-button/)
- [`Link`](https://mui.com/material-ui/api/link/)
- [`Typography`](https://mui.com/material-ui/api/typography/)
- [`<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header)
