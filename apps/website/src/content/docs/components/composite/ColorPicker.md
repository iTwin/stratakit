---
title: Color picker
description: Color pickers let users choose a color value.
---

::example{src="composite/ColorPicker.default"}

Use the native [`<input type="color">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color) element to let users select a color.

:::caution[Opacity]

The native color input does not currently have good support for [`alpha`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color#alpha). If `alpha` is required, handle it separately with a [`Slider`](/components/slider) or [`TextField`](/components/textfield).

:::

## Use cases

Make sure the **color picker** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                          | [Color picker](/components/colorpicker) | [Select](/components/select) | [TextField](/components/textfield) |
| ------------------------------------------------- | --------------------------------------- | ---------------------------- | ---------------------------------- |
| Choose a value from a color field                 | ✅                                      | ❌                           | ❌                                 |
| Pick between a small number of predefined choices | ❌                                      | ✅                           | ❌                                 |
| Enter a color code value                          | ❌                                      | ❌                           | ✅                                 |

## ✅ Do

- Use a clear, descriptive label to explain what the color controls.
- Display the selected color so users can confirm the result.
- Use the native color input to select a single color.

## 🚫 Don't

- Don't use a native color input to limit selection to one of predefined color values.

## API reference

- [`FormControlLabel`](https://mui.com/material-ui/api/form-control-label/)
- [`Input`](https://mui.com/material-ui/api/input/)
- [`<input type="color">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color)
