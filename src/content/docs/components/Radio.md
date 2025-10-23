---
title: Radio
description: Radio buttons are for choosing one of multiple predefined inputs.
links:
  demo: tests/radio
  github: packages/bricks/src/Radio.tsx
  figma: https://www.figma.com/design/VcGw3L2IIlboxNlOdsKdai/%F0%9F%A5%9D-Kiwi-Component-Library?m=auto&node-id=1436-51197&t=JoF9HetUFB9sXGL7-1
---

## Use cases

Make sure the **Radio** is suitable for your use case. There may be other, more appropriate components available. The differences between [**Checkboxes**](/components/checkbox) and [**Radios**](/components/radio) are clear when used in groups:

| Use case                        | [Checkboxes](/components/checkbox) | [Radios](/components/radio) | [Select](/component/select) |
| ------------------------------- | ---------------------------------- | --------------------------- | --------------------------- |
| Choose one or more inputs       | ✅                                 | ❌                          | ❌                          |
| Choose just one of a few inputs | ❌                                 | ✅                          | ✅                          |
| Choose just one of many inputs  | ❌                                 | ❌                          | ✅                          |

## Usage

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
