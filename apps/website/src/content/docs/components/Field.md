---
title: Field
description: The Field helper manages ID associations for form controls, and provides a consistent layout.
status: stable
links:
  demo: tests/field
  github: packages/bricks/src/Field.tsx
associated:
  - Checkbox
  - Radio
  - Select
  - TextBox
---

## Use cases

Make sure the **Field** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                     | [Field](/components/field) | [Label](/components/label) |
| ---------------------------------------------------------------------------- | :------------------------: | :------------------------: |
| Automatic accessible label association, with limited layout flexibility      |             ✅             |             ❌             |
| Manual accessible label association, with relatively high layout flexibility |             ❌             |             ✅             |

## Usage

::example{src="Field.default"}

The `Field.Control` sub-component houses the form control, which can be one of [**TextBox**](/components/textbox), [**Checkbox**](/components/checkbox), [**Radio**](/components/radio), or [**Select**](/components/select). The control—in this case `TextBox.Input`—is rendered using the `render` prop.

```jsx
<Field.Root>
	<Field.Label>Name</Field.Label>
	<Field.Control render={<TextBox.Input />} />
</Field.Root>
```

:::note[No `htmlFor`]
Unlike with [**Label**](/components/label), you do not need to think up or generate a value for your `htmlFor` and `id` attributes. Label association is taken care of automatically.
:::

### Description

::example{src="Field.description"}

You can provide a supplementary description for your form control using the `Field.Description` element. This is automatically programmatically associated to the `Field.Control` using `aria-describedby`. The description is announced after the label in screen reader software.

```jsx
<Field.Root>
	<Field.Label>Bio</Field.Label>
	<Field.Description>Tell us a little about yourself.</Field.Description>
	<Field.Control render={<TextBox.Textarea />} />
</Field.Root>
```

### Error message

::example{src="Field.error"}

`Field.ErrorMessage` is another kind of description. Where `Field.Description` and `Field.ErrorMessage` are both provided, they together form the accessible description.

In addition to associating the error message to the form control, the control itself also automatically acquires the `aria-invalid="true"` attribution.

### Layout

For form controls like [**Checkbox**](/components/checkbox) and [**Radio**](/components/radio), the label is automatically placed inline with the control.

::example{src="Field.checkbox"}

For these inputs, place `Field.Control` first, making the input render to the left of the label:

```jsx
<Field.Root>
	<Field.Control render={<Checkbox />} />
	<Field.Label>Enable experimental features</Field.Label>
</Field.Root>
```

For [**TextBox**](/components/textbox) and [**Select**](/components/select), supply `layout="inline"` to `Field.Root`.

::example{src="Field.select"}

In these cases, `Field.Control` must come _after_ `Field.Label`:

```jsx
<Field.Root layout="inline">
	<Field.Label>Design system</Field.Label>
	<Field.Control
		render={(controlProps) => (
			<Select.Root>
				<Select.HtmlSelect {...controlProps}>
					<option value="stratakit">StrataKit</option>
					<option value="itwinui">iTwinUI</option>
					<option value="other">Other</option>
				</Select.HtmlSelect>
			</Select.Root>
		)}
	/>
</Field.Root>
```

## ✅ Do

- Provide a label for each form control.
- Ensure each label’s wording clearly identifies the purpose of the control.
- Use **Field** to automatically associate labels, descriptions, and errors to their respective form controls.
- Place descriptions alongside labels and error messages below controls.
- Ensure color isn’t the only way the error state is identified. Use an icon or the prefix “Error:”

## 🚫 Don’t

- Don’t omit a label. Provide one using either [**Label**](/components/label) or **Field**.
- Don’t visually hide the `Field.Label`.
- Don’t use `Field.Control` to render elements or components that do not belong in forms.
