---
title: TextField
description: Text fields are used to input single or multiple lines of text.
links:
  muiDocs: https://mui.com/material-ui/react-text-field/
  apiReference: https://mui.com/material-ui/api/text-field/
---

::example{src="mui/TextField.default"}

## Use cases

Make sure the **TextField** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                     | [TextField](/components/textfield) | [TextField (multiline)](/components/textfield#multiline) | [Autocomplete](/components/autocomplete) |
| ------------------------------------------------------------ | ---------------------------------- | -------------------------------------------------------- | ---------------------------------------- |
| Short text entry (name, email, phone, number, password, etc) | ✅                                 | ❌                                                       | ❌                                       |
| Longer text entry (description, comment, note)               | ❌                                 | ✅                                                       | ❌                                       |
| Predefined option selection                                  | ❌                                 | ❌                                                       | ✅                                       |
| Search input with suggestions                                | ❌                                 | ❌                                                       | ✅                                       |

## StrataKit MUI modifications

Modifications to `FormControl` (applies to all MUI components that extend `FormControl`):

- The `color`, `focused`, `hiddenLabel` and `variant` props are not supported.
- The `margin` prop is not supported. Use CSS grid, CSS flexbox, [`Grid`](https://mui.com/material-ui/react-grid/) , or [`Stack`](https://mui.com/material-ui/react-stack/) to handle spacing between form controls.

Modifications specific to `TextField`:

- The `select` prop is not supported.
- The `color` prop is not supported. Color is applied automatically based on state (e.g., disabled, error).
- The `variant` prop is not supported. Only the `"outlined"` variant is supported.
- Removed the [floating label](https://mui.com/material-ui/react-text-field/#floating-label) behavior. The label is always displayed above the input.

## Examples

### Sizes

- **Small:** Use in compact interfaces where space is limited.
- **Medium:** Default size, suitable for most use cases.

::example{src="mui/TextField.sizes"}

### Icon

An [**Icon**](/components/icon) can be displayed before or after the **TextField's** input using the `startAdornment` or `endAdornment` props.

::example{src="mui/TextField.icon"}

### Error

Use the `error` prop to display the `helperText` in an error state. Consider adding a visually hidden "Error:" prefix to the `helperText` if the error message is not clear on its own.

::example{src="mui/TextField.error" min-height="200px"}

### Multiline

Use the [`multiline`](https://mui.com/material-ui/api/input/#input-prop-multiline) prop to make it a [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea). The underlying implementation uses MUI's [`TextareaAutosize`](https://mui.com/material-ui/api/textarea-autosize/) component, which automatically expands based on the number of lines entered by the user.

::example{src="mui/TextField.multiline" min-height="200px"}

## ✅ Do

- Use descriptive labels and helpful error messages.

## 🚫 Don't

- Don't omit a label.
- Don't place the label below or to the right of the input.
- Don't resort to generic error messages.
- Don't use the `placeholder` attribute for essential instructions.
