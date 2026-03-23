---
title: TextField
description: Text fields are used to input single or multiple lines of text.
links:
  muiDocs: https://mui.com/material-ui/react-text-field/
  apiReference: https://mui.com/material-ui/api/text-field/
---

::example{src="mui/TextField.default"}

## Examples

### Sizes

::example{src="mui/TextField.sizes"}

### Icon

::example{src="mui/TextField.icon"}

### Error

Use the `error` prop to display the `helperText` in an error state. Consider adding a visually hidden "Error:" prefix to the `helperText` if the error message is not clear on its own.

::example{src="mui/TextField.error"}

### Multiline

::example{src="mui/TextField.multiline"}

## Use cases

Make sure the **TextBox** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                     | TextBox.Input | TextBox.Textarea | [Select](/components/select) | [Radios](/components/radio) | [Button](/components/button) |
| ------------------------------------------------------------ | ------------- | ---------------- | ---------------------------- | --------------------------- | ---------------------------- |
| Short text entry (name, email, phone, number, password, etc) | ✅            | ❌               | ❌                           | ❌                          | ❌                           |
| Longer text entry (description, comment, note)               | ❌            | ✅               | ❌                           | ❌                          | ❌                           |
| Predefined option selection (many options)                   | ❌            | ❌               | ✅                           | ❌                          | ❌                           |
| Predefined option selection (few options)                    | ❌            | ❌               | ❌                           | ✅                          | ❌                           |
| Changing application state                                   | ❌            | ❌               | ❌                           | ❌                          | ✅                           |

## Usage

### Input

::example{src="TextBox.input"}

The `TextBox.Input` component renders a standard HTML [`<input>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input) and supports all `<input>` attributes/properties.

Use the [**Field**](/components/field) component to provide an accessible, programmatic label association:

```jsx
<Field.Root>
	<Field.Label>Name</Field.Label>
	<Field.Control render={<TextBox.Input />} />
</Field.Root>
```

### Textarea

::example{src="TextBox.textarea"}

The `TextBox.Textarea` component renders a standard HTML [`<textarea>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea) and supports all `<textarea>` attributes/properties.

```jsx
<Field.Root>
	<Field.Label>Bio</Field.Label>
	<Field.Control render={<TextBox.Textarea />} />
</Field.Root>
```

## ✅ Do

- Use the `Field.Root`, `Field.Label` and `Field.Description` (or `Field.ErrorMessage`) elements to programmatically associate the label and description to the `Field.Control`.
- Use descriptive labels and helpful error messages.
- Use the `placeholder` attribute for examples or hints, not for essential instructions.

## 🚫 Don’t

- Don't omit a label.
- Don't place the label below or to the right of the input.
- Don't resort to generic error messages.
