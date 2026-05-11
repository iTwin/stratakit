---
title: Radio
description: Radio buttons are for choosing one of multiple predefined inputs.
links:
  muiDocs: https://mui.com/material-ui/react-radio-button/
  apiReference: https://mui.com/material-ui/api/radio/
---

::example{src="mui/RadioGroup.default" min-height="200px"}

## Use cases

Make sure the **Radio** is suitable for your use case. There may be other, more appropriate components available. The differences between [**Checkboxes**](/components/checkbox) and [**Radios**](/components/radio) are clear when used in groups:

| Use case                                                                                                                                    | [Checkboxes](/components/checkbox) | [Radios](/components/radio) | [Select](/components/select) | [ToggleButtons](/components/togglebutton) |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | --------------------------- | ---------------------------- | ----------------------------------------- |
| Choose one or more inputs                                                                                                                   | ✅                                 | ❌                          | ❌                           | ❌                                        |
| Choose just one of a few inputs                                                                                                             | ❌                                 | ✅                          | ✅                           | ❌                                        |
| Choose just one of many inputs                                                                                                              | ❌                                 | ❌                          | ✅                           | ❌                                        |
| Toggle one or more options within a [toolbar](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role) | ❌                                 | ❌                          | ❌                           | ✅                                        |

## StrataKit MUI modifications

- The `color` prop is not supported. Color is determined automatically based on state (e.g., checked, disabled, error).
- The `size` prop defaults to `"medium"` and does not support `"small"`.
- The radio implementation and styling differ from the default `svg` approach and use custom pseudo-elements.
- The interactive hit area extends beyond the visual bounds of the radio. The additional hit area does not consume layout space, so be mindful when placing the radio next to adjacent elements or container boundaries.
- Includes full `forced-colors` support.

## Examples

### Default value

Use the `defaultValue` prop of the `RadioGroup` component to define which radio button is selected initially. Alternatively, use the `value` and `onChange` props to control the value state.

::example{src="mui/RadioGroup.defaultValue" min-height="200px"}

### Error

Use the `error` prop on `FormControl` to display the `FormHelperText` in an error state. Consider adding a visually hidden "Error:" prefix to the `FormHelperText` if the error message is not clear on its own.

::example{src="mui/RadioGroup.error" min-height="200px"}

## ✅ Do

- Use **Radios** where there is only a handful of input options on offer.
- Use **Radios** where there is only one correct answer, such as in a test.
- Group the **Radio** options using a [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset) and label the group using a [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/legend). Make sure [`role="radiogroup"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/radiogroup_role) is set on the `<fieldset>` element rather than on the `RadioGroup` component.
- Use a clear, descriptive label for each **Radio**.

## 🚫 Don't

- Don't use one **Radio** in isolation. For a single option, use [**Checkbox**](/components/checkbox).
- Don't add `tabindex="0"` to **Radios**. Only the checked/selected **Radio** should be focusable using the <kbd>Tab</kbd> key.
- Don't use **Radios** where there are many options, such as choosing a country. Use [**Select**](/components/select) or [**Autocomplete**](/components/autocomplete) instead.
