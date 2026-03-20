---
title: Radio
description: Radio buttons are for choosing one of multiple predefined inputs.
links:
  muiDocs: https://mui.com/material-ui/react-radio-button/
  apiReference: https://mui.com/material-ui/api/radio/
---

::example{src="mui/RadioGroup.default"}

## Use cases

Make sure the **Radio** is suitable for your use case. There may be other, more appropriate components available. The differences between [**Checkboxes**](/components/checkbox) and [**Radios**](/components/radio) are clear when used in groups:

| Use case                        | [Checkboxes](/components/checkbox) | [Radios](/components/radio) | [Select](/component/select) |
| ------------------------------- | ---------------------------------- | --------------------------- | --------------------------- |
| Choose one or more inputs       | ✅                                 | ❌                          | ❌                          |
| Choose just one of a few inputs | ❌                                 | ✅                          | ✅                          |
| Choose just one of many inputs  | ❌                                 | ❌                          | ✅                          |

## StrataKit MUI modifications

- The `color` prop is not supported. Color is determined automatically based on state (e.g., checked, disabled, error).
- The `size` prop defaults to `"medium"` and does not support `"small"`.
- The radio implementation and styling differ from the default `svg` approach and use custom pseudo-elements.
- The interactive hit area extends beyond the visual bounds of the radio. The additional hit area does not consume layout space, so be mindful when placing the radio next to adjacent elements or container boundaries.
- Includes full `forced-colors` support.

## Examples

### Error

Use the `error` prop on `FormControl` to display the `FormHelperText` in an error state. Consider adding a visually hidden "Error:" prefix to the `FormHelperText` if the error message is not clear on its own.

::example{src="mui/RadioGroup.error"}

### WIP

The **Radio** component renders as a standard [`<input type="radio">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/radio) and supports the same attributes/properties.

Unlike a [**Checkbox**](/components/checkbox), a **Radio** cannot be provided in isolation. It represents one of a set of choices offered using multiple **Radios**.

::example{src="Radio.default"}

Group the **Radio** options using a [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/fieldset) and label the group using a [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/legend). This group label is announced alongside the checked/selected **Radio’s** own label in screen reader output.

Each individual **Radio** must have an accessible label. The [**Field**](/components/field) element automatically associates the label to the **Radio** input.

```jsx
<fieldset>
	<legend>Choose a design system:</legend>
	<Field.Root>
		<Field.Control render={<Radio name="design-system" value="StrataKit" />} />
		<Field.Label>StrataKit</Field.Label>
	</Field.Root>

	<Field.Root>
		<Field.Control render={<Radio name="design-system" value="iTwinUI" />} />
		<Field.Label>iTwinUI</Field.Label>
	</Field.Root>
</fieldset>
```

:::caution[The `name` attribute]
Your set of **Radios** will not behave correctly unless they share a common `name` value. In this previous example, that value is ‘design-system’.
:::

Without the [**Field**](/components/field) element, you will have to associate labels with **Radios** manually, by matching `htmlFor` and `id` values:

```jsx
<Radio id="ds-strata" name="design-system" value="StrataKit" />
<Label htmlFor="ds-strata">StrataKit</Label>
<Radio id="ds-itwinui" name="design-system" value="iTwinUI" />
<Label htmlFor="ds-itwinui">iTwinUI</Label>
```

## ✅ Do

- Provide a group label using the `<fieldset>` and `<legend>` elements.
- Use **Radios** where there is only a handful of input options on offer.
- Use **Radios** where there is only one correct answer, such as in a test.

## 🚫 Don’t

- Don’t use one **Radio** in isolation. For a single option, use [**Checkbox**](/components/checkbox).
- Don’t add `tabindex="0"` to **Radios**. Only the checked/selected **Radio** should be focusable using the <kbd>Tab</kbd> key.
- Don’t use **Radios** where there are many options, such as choosing a country. Use [**Select**](/components/select) instead.
