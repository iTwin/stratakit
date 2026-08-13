---
title: Fab
description: Floating action buttons are used to promote a primary action on a screen.
links:
  muiDocs: https://mui.com/material-ui/react-floating-action-button/
  apiReference: https://mui.com/material-ui/api/fab/
---

::example{src="mui/Fab.default"}

## StrataKit MUI modifications

- Ripple effect removed. The `centerRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `TouchRippleProps` and `touchRippleRef` props are not supported.
- The `action` prop is not supported.
- Only `"primary"` and `"secondary"` colors are supported.
- The default `color` is now `"primary"`.
