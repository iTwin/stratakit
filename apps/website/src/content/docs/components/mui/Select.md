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

| Use case                                   | [Select](/components/select) | [Menu](/components/menu) |
| ------------------------------------------ | ---------------------------- | ------------------------ |
| Choosing an input value (e.g. a user role) | ✅                           | ❌                       |
| Form input                                 | ✅                           | ❌                       |
| Triggering an action or setting a state    | ❌                           | ✅                       |
| Grouping related commands                  | ❌                           | ✅                       |

## StrataKit MUI modifications

- Restyled using StrataKit's visual language.
- The active option implementation and styling differ from the default approach. A checkmark icon has been added using a pseudo-element.
- Includes full `forced-colors` support.
- The `color` prop is not supported.

## Examples

### Icon

An [**Icon**](/components/icon) can be displayed before or after the option’s text label using the [`ListItemIcon`](https://mui.com/material-ui/api/list-item-icon/) component. It’s important the **Icon’s** `alt` is omitted, since the text already provides the accessible label.

::example{src="mui/Select.icon"}

### Multiple values

Use the [`multiple`](https://mui.com/material-ui/api/select/#select-prop-multiple) prop to allow users to select more than one option from the list.

::example{src="mui/Select.multiple"}

### Native

Use the [`NativeSelect`](https://mui.com/material-ui/api/native-select/) component to render a native [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select) element. The native select has fewer customization options, however, it is more accessible and works much better on mobile devices. The native select also has the benefit of participating in the browser’s built-in form validation and autofill.

::example{src="mui/NativeSelect.default"}

## ✅ Do

- Use **Selects** for form fields. A **Select’s** options represent a choice of predefined input values.
- Programmatically associate labels and descriptions to the **Select** for compatibility with assistive technologies.
- Write helpful labels, descriptions, and error messages, so users can avoid errors.

## 🚫 Don’t

- Don’t steal keyboard focus and move it away from the **Select** when an option is chosen.
- Don’t change application state without employing a [live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) to alert screen reader users of that change.
- Don’t make **Select** options behave like buttons/commands. Use the [**Menu**](/components/menu) component instead.
