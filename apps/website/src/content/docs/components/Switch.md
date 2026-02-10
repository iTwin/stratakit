---
title: Switch
description: Switches are toggles for Boolean values.
---

## Use cases

Make sure the **Switch** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                          | [Button](/components/button) | [IconButton](/components/iconbutton) | [Switch](/components/switch) | [Checkbox](/components/checkbox) | [Link](/components/link) |
| ----------------------------------------------------------------- | ---------------------------- | ------------------------------------ | ---------------------------- | -------------------------------- | ------------------------ |
| Submit forms, confirm or cancel dialogs, create or delete content | ✅                           | ❌                                   | ❌                           | ❌                               | ❌                       |
| Select an option within a toolbar                                 | ❌                           | ✅                                   | ❌                           | ❌                               | ❌                       |
| Make an instantaneous, binary choice (switch a setting on or off) | ❌                           | ❌                                   | ✅                           | ❌                               | ❌                       |
| Confirm an input for a form submission                            | ❌                           | ❌                                   | ❌                           | ✅                               | ❌                       |
| Navigate between interface screens or sections                    | ❌                           | ❌                                   | ❌                           | ❌                               | ✅                       |

## Usage

::example{src="mui/Switch.default"}

The **Switch** must have an accessible label. Use the [**FormControlLabel**](https://mui.com/material-ui/api/form-control-label/) component to automatically associate the label to the **Switch**.

## ✅ Do

- Use a clear, descriptive label for each **Switch**.
- Group related switches (settings) into a `<fieldset>`, using a `<legend>` as a label for the group.
- Use a **Switch** when the effect is instantaneous (no confirmation or submission is required).

## 🚫 Don’t

- Don't use switches for mandatory actions. The checked state of a switch can never be _invalid_.
- Don't use one switch to change multiple settings simultaneously.
- Don't use switches inside a form that needs submission. Use [**Checkbox**](/components/checkbox) instead.
