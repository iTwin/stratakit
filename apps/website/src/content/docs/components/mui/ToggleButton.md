---
title: ToggleButton
description: Toggle buttons are used to represent the pressed state.
links:
  muiDocs: https://mui.com/material-ui/react-toggle-button/
  apiReference: https://mui.com/material-ui/api/toggle-button/
---

::example{src="mui/ToggleButton.default"}

## StrataKit MUI modifications

- A `label` prop has been added. When specified, it is used as the **ToggleButton’s** accessible name and is also shown in a tooltip on hover and focus.
- [Standalone](#standalone) **ToggleButtons** are styled to match the visual appearance of the [**IconButton**](/components/iconbutton) component.

## Examples

### Standalone

Use the `selected` and `onChange` props to control the selected state of a standalone **ToggleButton** when it is not nested within a `ToggleButtonGroup` component.

::example{src="mui/ToggleButton.standalone"}

### Sizes

- **Small:** Use in compact interfaces where space is limited.
- **Medium:** Default size, suitable for most use cases.
- **Large:** Use in spacious layouts where a more prominent button is needed.

::example{src="mui/ToggleButton.sizes"}
