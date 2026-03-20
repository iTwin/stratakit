---
title: Select
description: Selects are a form input offering a dropdown menu of predefined options.
links:
  muiDocs: https://mui.com/material-ui/react-select/
  apiReference: https://mui.com/material-ui/api/select/
---

::example{src="mui/Select.default"}

## Use cases

Make sure the **Select** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                 | [Select](/components/select) | [DropdownMenu](/components/dropdownmenu) |
| ---------------------------------------- | ---------------------------- | ---------------------------------------- |
| Choosing an input value (e.g. a country) | ✅                           | ❌                                       |
| Form input                               | ✅                           | ❌                                       |
| Triggering an action or setting a state  | ❌                           | ✅                                       |
| Grouping related command                 | ❌                           | ✅                                       |

## Examples

### Icon

::example{src="mui/Select.icon"}

### Multiple values

::example{src="mui/Select.multiple"}

### Native

::example{src="mui/NativeSelect.default"}

### Variants

Set the variant using the `Select.HtmlSelect` element’s `variant` prop’. The default value is ‘solid’.

::example{src="Select.variants"}

| Use case                     | solid | outline | ghost |
| ---------------------------- | ----- | ------- | ----- |
| Primary form fields          | ✅    | ❌      | ❌    |
| Secondary, optional fields   | ❌    | ✅      | ❌    |
| Filters or toolbar dropdowns | ✅    | ❌      | ✅    |

## ✅ Do

- Use **Selects** for form fields. A **Select’s** `<option>`s represent a choice of predefined input values.
- Programmatically associate labels and descriptions to the **Select** for screen reader compatibility. This is made easier using the [**Field**](/components/field) component.
- Write helpful labels, descriptions, and error messages, so users can avoid errors.

## 🚫 Don’t

- Don’t steal keyboard focus and move it away from the **Select** when an `<option>` is chosen.
- Don’t change application state without employing a [live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) to alert screen reader users of that change.
- Don’t make **Select** `<option>`s behave like buttons/commands. Use the [**DropdownMenu**](/components/dropdownmenu) component instead.
