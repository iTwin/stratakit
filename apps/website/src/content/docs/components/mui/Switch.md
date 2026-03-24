---
title: Switch
description: Switches are toggles for Boolean values.
links:
  muiDocs: https://mui.com/material-ui/react-switch/
  apiReference: https://mui.com/material-ui/api/switch/
---

::example{src="mui/Switch.default"}

## Use cases

Make sure the **Switch** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                          | [Button](/components/button) | [IconButton](/components/iconbutton) | [Switch](/components/switch) | [Checkbox](/components/checkbox) | [Link](/components/link) |
| ----------------------------------------------------------------- | ---------------------------- | ------------------------------------ | ---------------------------- | -------------------------------- | ------------------------ |
| Submit forms, confirm or cancel dialogs, create or delete content | ✅                           | ❌                                   | ❌                           | ❌                               | ❌                       |
| Select an option within a toolbar                                 | ❌                           | ✅                                   | ❌                           | ❌                               | ❌                       |
| Make an instantaneous, binary choice (switch a setting on or off) | ❌                           | ❌                                   | ✅                           | ❌                               | ❌                       |
| Confirm an input for a form submission                            | ❌                           | ❌                                   | ❌                           | ✅                               | ❌                       |
| Navigate between interface screens or sections                    | ❌                           | ❌                                   | ❌                           | ❌                               | ✅                       |

## StrataKit MUI modifications

- The `color` prop is not supported. Color is determined automatically based on state (e.g., checked, disabled).
- Restyled using StrataKit's visual language.
- Includes full `forced-colors` support.

## Examples

### Checked

Use the `defaultChecked` prop to set the initial checked state. Alternatively, use the `checked` and `onChange` props to control the checked state.

::example{src="mui/Switch.checked"}

### Sizes

- **Small:** Use in compact interfaces where space is limited.
- **Medium:** Default size, suitable for most use cases.

::example{src="mui/Switch.sizes"}

## ✅ Do

- Use a clear, descriptive label for each **Switch**.
- Use a **Switch** when the effect is instantaneous (no confirmation or submission is required).

## 🚫 Don’t

- Don't use switches for mandatory actions. The checked state of a switch can never be _invalid_.
- Don't use one switch to change multiple settings simultaneously.
- Don't use switches inside a form that needs submission. Use [**Checkbox**](/components/checkbox) instead.
