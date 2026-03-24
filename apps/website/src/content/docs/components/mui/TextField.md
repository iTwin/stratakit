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

| Use case                                                     | [TextField](/components/textfield) | [TextField (multiline)](/components/textfield#multiline) | [Select](/components/select) | [Radios](/components/radio) | [Button](/components/button) |
| ------------------------------------------------------------ | ---------------------------------- | -------------------------------------------------------- | ---------------------------- | --------------------------- | ---------------------------- |
| Short text entry (name, email, phone, number, password, etc) | ✅                                 | ❌                                                       | ❌                           | ❌                          | ❌                           |
| Longer text entry (description, comment, note)               | ❌                                 | ✅                                                       | ❌                           | ❌                          | ❌                           |
| Predefined option selection (many options)                   | ❌                                 | ❌                                                       | ✅                           | ❌                          | ❌                           |
| Predefined option selection (few options)                    | ❌                                 | ❌                                                       | ❌                           | ✅                          | ❌                           |
| Changing application state                                   | ❌                                 | ❌                                                       | ❌                           | ❌                          | ✅                           |

## Examples

### Sizes

- **Small:** Use in compact interfaces where space is limited.
- **Medium:** Default size, suitable for most use cases.

::example{src="mui/TextField.sizes"}

### Icon

An [**Icon**](/components/icon) can be displayed before or after the **TextField’s** input using the `startAdornment` or `endAdornment` props.

::example{src="mui/TextField.icon"}

### Error

Use the `error` prop to display the `helperText` in an error state. Consider adding a visually hidden "Error:" prefix to the `helperText` if the error message is not clear on its own.

::example{src="mui/TextField.error" min-height="200px"}

### Multiline

Set the `multiline` prop to render a standard HTML [`<textarea>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea).

::example{src="mui/TextField.multiline" min-height="200px"}

## ✅ Do

- Use descriptive labels and helpful error messages.
- Use the `placeholder` attribute for examples or hints, not for essential instructions.

## 🚫 Don’t

- Don't omit a label.
- Don't place the label below or to the right of the input.
- Don't resort to generic error messages.
