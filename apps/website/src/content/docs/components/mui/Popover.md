---
title: Popover
description: Popovers display content in a non-modal window overlay that is positioned relative to a trigger element.
links:
  muiDocs: https://mui.com/material-ui/react-popover/
  apiReference: https://mui.com/material-ui/api/popover/
---

::example{src="mui/Popover.default"}

## StrataKit MUI modifications

- Added [`role="dialog"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role) to the `paper` slot.

## ✅ Do

- [Label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role#labeling) the **Popover's** `paper` slot using an `aria-labelledby` attribute pointing to a heading inside the popover or the trigger element's `id`.

## 🚫 Don't

- Don't forget to provide an accessible [label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role#labeling)
