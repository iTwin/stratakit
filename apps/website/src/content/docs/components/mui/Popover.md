---
title: Popover
description: Popovers display content in a non-modal window overlay that is positioned relative to a trigger element.
links:
  muiDocs: https://mui.com/material-ui/react-popover/
  apiReference: https://mui.com/material-ui/api/popover/
---

::example{src="mui/Popover.default"}

## StrataKit MUI modifications

- Added [`role="dialog"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role) to the [`paper`](https://mui.com/material-ui/api/popover/#Popover-css-MuiPopover-paper) slot.
- Added fallback mechanism for automatically labelling the `paper` slot using the trigger element (`anchorEl`).
- `disableScrollLock` is used to prevent scroll locking when the popover is open.
- The default [`container`](https://mui.com/material-ui/api/popover/#popover-prop-container) is now the [root portal container](/components/root/#portal-container).
- `elevation` is not supported.
- `marginThreshold` is not supported.

## ✅ Do

- Consider [labelling](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role#labeling) the **Popover's** `paper` slot using an `aria-labelledby` attribute pointing to a heading inside the popover.

## 🚫 Don't

- Don't forget to validate that the **Popover** has an appropriate accessible [label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role#labeling).
