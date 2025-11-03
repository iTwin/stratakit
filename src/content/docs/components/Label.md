---
title: Label
description: Labels are used to identify form controls.
status: stable
links:
  demo: tests/field
  github: packages/bricks/src/Label.tsx
associated:
  - Checkbox
  - Radio
  - Select
  - TextBox
---

## Use cases

Make sure the **Label** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                     | [Field](/components/field) | [Label](/components/label) |
| ---------------------------------------------------------------------------- | :------------------------: | :------------------------: |
| Automatic accessible label association, with limited layout flexibility      |             ✅             |             ❌             |
| Manual accessible label association, with relatively high layout flexibility |             ❌             |             ✅             |

:::tip[The **Field** component]
It’s easier to label, describe, and layout form controls using [**Field**](/components/field).
:::

## Usage

::example{src="Label.default"}

The **Label** element is just a styled wrapper over the HTML `<label>` element. To label a form control accessibly, the **Label’s** `htmlFor` attribute and the control’s `id` must share the same value. You can use [`React.useId()`](https://react.dev/reference/react/useId) to generate this value for you.

```jsx 'inputId'
const inputId = React.useId();

<Label htmlFor={inputId}>Name</Label>
<TextBox.Input id={inputId} />
```

## ✅ Do

- Provide a visible label for each form control
- Ensure each label’s wording clearly identifies the purpose of the control
- Match the `htmlFor` and `id` values of the **Label** and

## ❌ Don’t

- Don’t omit a label. Provide one using either **Label** or [**Field**](/component/field).
- Don’t place the **Label** at a distance from its subject form control (or it might not be perceived that they are associated).
- Don’t visually hide the **Label**.
