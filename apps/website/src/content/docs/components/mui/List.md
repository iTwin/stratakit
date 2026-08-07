---
title: List
description: Lists are used to display a collection of items.
links:
  muiDocs: https://mui.com/material-ui/react-list/
  apiReference: https://mui.com/material-ui/api/list/
---

::example{src="mui/List.default" min-width="300px" min-height="200px"}

## StrataKit MUI modifications

- Spacing and sizing has been adjusted to better align with StrataKit's more compact visual design language.
- The `subheader` props of `List` is not supported. Use the `ListSubheader` component instead.
- The `color` prop of `ListSubheader` is not supported.
- The `action` prop of `ListButtonItem` is not supported by StrataKit.
- Ripple effect removed from `ListItemButton`. The `centerRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `TouchRippleProps` and `touchRippleRef` props are not supported.

## Examples

### ListItemAvatar

::example{src="mui/List.avatar" min-width="300px" min-height="200px"}

### ListSubheader

::example{src="mui/List.subheader" min-width="300px"}
