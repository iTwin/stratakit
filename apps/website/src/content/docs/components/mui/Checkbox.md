---
title: Checkbox
description: Checkboxes are for confirming a predefined input.
links:
  muiDocs: https://mui.com/material-ui/react-checkbox/
  apiReference: https://mui.com/material-ui/api/checkbox/
---

::example{src="mui/Checkbox.default"}

## Use cases

Make sure the **Checkbox** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                                                                          | [Checkbox](/components/checkbox) | [Radio](/components/radio) | [Switch](/components/switch) | [ToggleButton](/components/togglebutton) |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | -------------------------- | ---------------------------- | ---------------------------------------- |
| Confirm an input for a form submission                                                                                            | ✅                               | ❌                         | ❌                           | ❌                                       |
| Select a single option from multiple choices for a form submission                                                                | ❌                               | ✅                         | ❌                           | ❌                                       |
| Make an instantaneous, binary choice (switch a setting on or off)                                                                 | ❌                               | ❌                         | ✅                           | ❌                                       |
| Toggle an option within a [toolbar](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role) | ❌                               | ❌                         | ❌                           | ✅                                       |

## StrataKit MUI modifications

- The `color` prop is not supported. Color is determined automatically based on state (e.g., checked, disabled, error).
- The `icon` prop is not supported.
- The `size` prop defaults to `"medium"`, and does not support `"small"` or `"large"`.
- The checkbox implementation and styling differ from the default `svg` approach and use custom pseudo-elements.
- The interactive hit area extends beyond the visual bounds of the checkbox. The additional hit area does not consume layout space, so be mindful when placing the checkbox next to adjacent elements or container boundaries.
- Includes full `forced-colors` support.

## Examples

### Checked

Use the `defaultChecked` prop to set the initial checked state. Alternatively, use the `checked` and `onChange` props to control the checked state.

::example{src="mui/Checkbox.checked"}

### Indeterminate

Use the `indeterminate` prop to display the **Checkbox** in an [indeterminate state](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox#indeterminate_state_checkboxes).

::example{src="mui/Checkbox.indeterminate"}

### Group

Group related **Checkboxes** using the `FormGroup` component. Render `FormControl` as a [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset) and `FormLabel` as a [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/legend) to label the group.

::example{src="mui/Checkbox.group" min-height="200px"}

### Error

Use the `error` prop on `FormControl` to display the `FormHelperText` in an error state. Consider adding a visually hidden "Error:" prefix to the `FormHelperText` if the error message is not clear on its own.

::example{src="mui/Checkbox.error" min-height="200px"}

## ✅ Do

- Use a clear, descriptive label for each **Checkbox**.
- Group related **Checkboxes** into a `<fieldset>`, using a `<legend>` as a label for the group.
- Use **Checkboxes** inside a form that needs submission.

## 🚫 Don’t

- Don’t omit a programmatically associated label.
- Don’t use the `checked` state of one **Checkbox** to alter the `checked` state of others (don't use **Checkboxes** as [**Radios**](/components/radio)).
- Don’t use a **Checkbox** when the effect of checking it is instantaneous (no confirmation or submission is required). Use [**Switch**](/components/switch) instead.
