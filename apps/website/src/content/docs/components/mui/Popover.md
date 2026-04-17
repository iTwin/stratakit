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

:::tip
The `paper` slot needs to be labelled via [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role#labeling) since it is now a `dialog`. This can either be a static label that describes the popover, or the `id` of the trigger element, which will label the popover with the trigger element's inner text.
:::
