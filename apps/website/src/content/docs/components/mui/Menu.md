---
title: Menu
description: Dropdown menus are used to display a list of quick actions in a floating surface.
links:
  muiDocs: https://mui.com/material-ui/react-menu/
  apiReference: https://mui.com/material-ui/api/menu/
---

::example{src="mui/Menu.default"}

## StrataKit MUI modifications

- Restyled using StrataKit's visual language.
- Removed [`role="dialog"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role) semantics from the [`paper`](https://mui.com/material-ui/api/menu/#Menu-css-MuiMenu-paper) slot. The **Menu** is no longer treated as a dialog by assistive technologies.
- Includes full `forced-colors` support.

## Examples

### Dense

Pass the [`dense`](https://mui.com/material-ui/api/list/#list-prop-dense) prop through [`slotProps.list`](https://mui.com/material-ui/api/menu/#menu-prop-slotProps) to make the **Menu** smaller. This is useful when space is limited, or when the **Menu** is triggered by a small button.

The `dense` prop is also available via [`MenuList`](https://mui.com/material-ui/api/menu-list/).

::example{src="mui/Menu.dense"}
