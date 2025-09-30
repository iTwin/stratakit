---
title: Switch
description: Switches are toggles for Boolean values.
status: ready
associated:
  - Field
  - Label
links:
  demo: tests/switch
  github: packages/bricks/src/Switch.tsx
  figma: https://www.figma.com/design/EfvaViHLAhb6v1ghEBXpSB/documentation--WIP-?node-id=1553-13991&t=lYI9n3rvhBkJwWph-1
---

## Use cases

Make sure the **Switch** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                          | [Button](/components/button) | [IconButton](/components/iconbutton) | [Switch](/components/switch) | [Checkbox](/components/checkbox) | [Anchor](/components/anchor) |
| ----------------------------------------------------------------- | :--------------------------: | :----------------------------------: | :--------------------------: | :------------------------------: | :--------------------------: |
| Submit forms, confirm or cancel dialogs, create or delete content |              ✅              |                  ❌                  |              ❌              |                ❌                |              ❌              |
| Select an option within a Toolbar                                 |              ❌              |                  ✅                  |              ❌              |                ❌                |              ❌              |
| Make an instantaneous, binary choice (switch a setting on or off) |              ❌              |                  ❌                  |              ✅              |                ❌                |              ❌              |
| Confirm an input for a form submission                            |              ❌              |                  ❌                  |              ❌              |                ✅                |              ❌              |
| Navigate between interface screens or sections                    |              ❌              |                  ❌                  |              ❌              |                ❌                |              ✅              |

## Anatomy

### Structure

```jsx
<Switch checked onChange={() => {}} />
```

- `<Switch>`: The component itself renders as a native HTML [`<input type="checkbox">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/checkbox).
  - `defaultChecked` (type: `boolean`): the [initial](https://react.dev/reference/react-dom/components/input#providing-an-initial-value-for-an-input) checked state, set on first render.
  - `checked` (type: `boolean`): the [controlled](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable) checked state.
  - `onChange`: Handler for responding to checked state changes ([`change` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)).

:::note[Composition]
You must use the **Switch** in conjunction with a label. See [Usage](#usage).
:::

## Usage

The **Switch** must have an accessible label. Use the [**Field**](/components/field) components to automatically associate the label to the **Switch**:

```jsx
<Field.Root>
	<Field.Control render={<Switch checked={checkedState} />} />
	<Field.Label>Dark mode</Field.Label>
</Field.Root>
```

Otherwise, you’ll have to make the association manually, using `htmlFor`:

```jsx
const switchId = React.useId();

<Switch id={switchId} />
<Label htmlFor={switchId}>Dark mode</Label>
```

### ✅ Do

- Use a clear, descriptive label for each **Switch**.
- Group related switches (settings) into a `<fieldset>`, using a `<legend>` as a label for the group.
- Use a **Switch** when the effect is instantaneous (no confirmation or submission is required).

### ❌ Don’t

- Use switches for mandatory actions. The checked state of a switch can never be _invalid_.
- Use one switch to change multiple settings simultaneously.
- Use switches inside a form that needs submission. Use [**Checkbox**](/components/checkbox) instead.
