---
title: Color picker
description: Color pickers let users choose a color value.
---

::example{src="composite/ColorPicker.default"}

Use the native [`<input type="color">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color) element to let users select a color.

:::caution[Opacity]

The native color input does not currently have good support for [`alpha`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color#alpha). If `alpha` is required, handle it separately with a [`Slider`](/components/slider) or [TextField](/components/textfield).

:::

## Use cases

Make sure the **color picker** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                          | Color picker | [Select](/components/select) | [TextField](/components/textfield) |
| ------------------------------------------------- | ------------ | ---------------------------- | ---------------------------------- |
| Choose a value from a color field                 | ✅           | ❌                           | ❌                                 |
| Pick between a small number of predefined choices | ❌           | ✅                           | ❌                                 |
| Enter a color code value                          | ❌           | ❌                           | ✅                                 |

## ✅ Do

- Use a clear label or adjacent text that explains what the color controls.
- Keep the selected value visible so users can confirm the result.
- Use the native input when a single color value is the only required choice.

## 🚫 Don't

- Don't use a **color picker** when users need to choose from many color options with custom previews or alpha editing.
- Don't rely on color alone to communicate meaning; pair it with text or a label.

## API reference

- [`Input`](https://mui.com/material-ui/api/input/)
- [`FormControlLabel`](https://mui.com/material-ui/api/form-control-label/)
