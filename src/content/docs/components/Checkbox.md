---
title: Checkbox
status: stable
description: Checkboxes are for confirming a predefined input.
links:
  demo: tests/checkbox
  github: packages/bricks/src/Checkbox.tsx
  figma: https://www.figma.com/design/VcGw3L2IIlboxNlOdsKdai/%F0%9F%A5%9D-Kiwi-Component-Library?m=auto&node-id=1436-51063&t=JoF9HetUFB9sXGL7-1
associated:
  - Field
---

## Use cases

Make sure the **Checkbox** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                          | [Button](/components/button) | [IconButton](/components/iconbutton) | [Switch](/components/switch) | [Checkbox](/components/checkbox) | [Anchor](/components/anchor) |
| ----------------------------------------------------------------- | ---------------------------- | ------------------------------------ | ---------------------------- | -------------------------------- | ---------------------------- |
| Submit forms, confirm or cancel dialogs, create or delete content | ✅                           | ❌                                   | ❌                           | ❌                               | ❌                           |
| Select an option within a Toolbar                                 | ❌                           | ✅                                   | ❌                           | ❌                               | ❌                           |
| Make an instantaneous, binary choice (switch a setting on or off) | ❌                           | ❌                                   | ✅                           | ❌                               | ❌                           |
| Confirm an input for a form submission                            | ❌                           | ❌                                   | ❌                           | ✅                               | ❌                           |
| Navigate between interface screens or sections                    | ❌                           | ❌                                   | ❌                           | ❌                               | ✅                           |

## Usage

::example{src="Checkbox.default"}

The **Checkbox** is rendered as an HTML `<input>` of `type="checkbox"` and supports all the attributes/properties of the `<input>` element’s API. Use the [**Field**](/components/field) component to automatically associate the label to the **Checkbox**.

```jsx
<Field.Root>
	<Field.Control render={<Checkbox />} />
	<Field.Label>Don’t show again</Field.Label>
</Field.Root>
```

Without the [**Field**](/components/field) component, you will need to manually associate labels and descriptions by creating and targeting `id` values:

```jsx
<Checkbox id="usage" name="usage" aria-describedby="usage-description" />
<Label htmlFor="usage">Don’t show again</Label>
<Description id="usage-description">You will no longer see these notifications</Description>
```

## ✅ Do

- Use a clear, descriptive label for each **Checkbox**.
- Group related **Checkboxes** into a `<fieldset>`, using a `<legend>` as a label for the group.
- Use **Checkboxes** inside a form that needs submission.

## 🚫 Don’t

- Don’t omit a programmatically associated label.
- Don’t use the `checked` state of one **Checkbox** to alter the `checked` state of others (don't use **Checkboxes** as [**Radios**](/components/radio)).
- Don’t use a **Checkbox** when the effect of checking it is instantaneous (no confirmation or submission is required). Use [**Switch**](/components/switch) instead.
