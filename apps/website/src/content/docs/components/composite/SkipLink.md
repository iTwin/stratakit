---
title: Skip link
description: A skip link lets keyboard users bypass repeated navigation and jump straight to the main content.
---

::example{src="composite/SkipLink.default"}

Large applications often have many navigation links and other focusable elements before the main content. A skip link lets keyboard users bypass them. It is visually hidden until it receives keyboard focus, so users typically reach it by pressing <kbd>Tab</kbd> at the start of the page.

:::note
This documentation site has its own skip link. Reload the page and press <kbd>Tab</kbd> to see "Skip to content" appear in the top corner.
:::

A skip link needs two elements:

- The target element to skip to, with an `id` and `tabindex="-1"` so it receives focus.
- The link pointing to that target, with its `href` set to the target's `id` (including the `#` prefix).

## ✅ Do

- Place the skip link as the first focusable element on the page.
- Point the skip link to the main content of the page.
- Provide a clear, localized label such as "Skip to main content".

## 🚫 Don't

- Don't keep the skip link hidden when it has keyboard focus.
- Don't point the skip link to an element that cannot receive focus.

## API reference

- [`Button`](https://mui.com/material-ui/api/button/)
