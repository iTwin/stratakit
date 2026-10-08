---
title: Footer
description: A footer displays legally required links at the bottom of entry pages.
---

::example{src="composite/Footer.default"}

Use a native [`<footer>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer) containing a list of links. The footer is only required on pages that are a main entry point into your application, such as the sign-in and home pages.

## ✅ Do

- Place the footer at the bottom of the page, after the main content.
- When page content is too short to fill the screen, use the page layout to keep the footer at the bottom while keeping it in normal document flow.
- Keep link labels short and localized.
- Append additional links to the end of the list.

## 🚫 Don't

- Don't add more than one page-level `<footer>` to a page.
- Don't use `position: sticky` to keep the footer visible while scrolling; let it follow the page content.
- Don't add a footer to pages with infinite scrolling, since users can't reach it.
- Don't add a footer inside widgets or deeper pages within an application.

## API reference

- [`Link`](https://mui.com/material-ui/api/link/)
- [`Typography`](https://mui.com/material-ui/api/typography/)
- [`<footer>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer)
