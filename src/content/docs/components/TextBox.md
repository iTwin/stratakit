---
title: TextBox
description: Text boxes are used to input single or multiple lines of text.
status: ready
links:
  demo: tests/text-box
  github: packages/bricks/src/TextBox.tsx
associated:
  - Field
---

## Use cases

Make sure the **TextBox** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                     | TextBox.Input | TextBox.Textarea | [Select](/components/select) | [Radios](/components/radio) | [Button](/components/button) |
| ------------------------------------------------------------ | :-----------: | :--------------: | :--------------------------: | :-------------------------: | :--------------------------: |
| Short text entry (name, email, phone, number, password, etc) |      ✅       |        🚫        |              🚫              |             🚫              |              🚫              |
| Longer text entry (description, comment, note)               |      🚫       |        ✅        |              🚫              |             🚫              |              🚫              |
| Predefined option selection (many options)                   |      🚫       |        🚫        |              ✅              |             🚫              |              🚫              |
| Predefined option selection (few options)                    |      🚫       |        🚫        |              🚫              |             ✅              |              🚫              |
| Changing application state                                   |      🚫       |        🚫        |              🚫              |             🚫              |              ✅              |

## Anatomy

### Structure

#### Input

```jsx
<TextBox.Input name="password" type="password" />
```

- `<TextBox.Input>`: The `TextBox.Input` component renders as a standard HTML [`<input>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input), and supports all `input` attributes/properties.
  - `name`: The standard `name` prop identifies the input in submission data.
  - `type`: Only a subset of input types are supported: `text`, `email`, `password`, `search`, `tel`, `url`, `number`, `date`.
  - `onChange` or `onInput`: Handler for input value changes ([`input` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event)).

#### Textarea

```jsx
<TextBox.Textarea name="comment" disabled />
```

- `<TextBox.Textarea>`: The `TextBox.Textarea` component renders as a standard HTML [`<textarea>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea), and supports all `textarea` attributes/properties.
  - `name`: The standard `name` prop identifies the textarea in submission data.
  - `onChange` or `onInput`: Handler for textarea value changes ([`input` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event)).

## Usage

Create an accessible input field with the associated [**Field**](/components/field) components. Here is an example of a `TextBox.Input` with a label and an error message. The label and error message are programmatically associated to the input.

```jsx
<Field.Root>
	<Field.Label>Name</Field.Label>
	<Field.Control render={<TextBox.Input />} />
	<Field.ErrorMessage>Your name is required</Field.ErrorMessage>
</Field.Root>
```

### ✅ Do

- Use the `Field.Root`, `Field.Label` and `Field.Description` (or `Field.ErrorMessage`) elements to programmatically associate the label and description to the `Field.Control`
- Use descriptive labels and helpful error messages
- Use the `placeholder` attribute for examples or hints, not for essential instructions.

### 🚫 Don’t

- Omit a label
- Place the label below or to the right of the input
- Resort to generic error messages
