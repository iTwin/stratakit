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
- **ToggleButtons** are styled to match the visual appearance of the [**IconButton**](/components/iconbutton) component. Borders are displayed only when the buttons are wrapped in a `ToggleButtonGroup`. [Standalone](#standalone) **ToggleButtons** do not have borders.

## Examples

### Standalone

Use the `selected` and `onChange` props to control the selected state of a standalone **ToggleButton** when it is not nested within a [`ToggleButtonGroup`](https://mui.com/material-ui/api/toggle-button-group/) component.

::example{src="mui/ToggleButton.standalone"}

### Sizes

- **Small:** Use in compact interfaces where space is limited.
- **Medium:** Default size, suitable for most use cases.
- **Large:** Use in spacious layouts where a more prominent button is needed.

::example{src="mui/ToggleButton.sizes"}

### Text

To display text within a **ToggleButton**, use the `render` prop to render a [**Button**](/components/button) with a `"text"` variant. Additionally, the `label` prop should be omitted, as the visible text already provides an accessible name.

::example{src="mui/ToggleButton.text"}

## ✅ Do

- Use **ToggleButton** for actions that have an on/off state.
- Use the `label` prop in icon only **ToggleButtons** to provide a descriptive, accessible name.
- Use `ToggleButtonGroup` to group multiple related **ToggleButtons**.

## 🚫 Don’t

- Don’t use to replace buttons.
- Don’t mix text and icon only **ToggleButtons** in the same group.
