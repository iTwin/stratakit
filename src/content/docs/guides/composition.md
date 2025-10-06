---
title: Composition
description: Using and combining StrataKit components
---

StrataKit’s inventory is categorized according to complexity: foundations, bricks, and structures.

1. **Foundations**: The most elemental of components and settings, including design tokens and icons.
2. **Bricks**: Small, simple components built on **Foundations**.
3. **Structures**: Compound components built on **Foundations** and incorporating multiple **Bricks**.

Wherever you are using StrataKit, you must install and configure **Foundations** first (see [Getting Started](/getting-started/)).

In `@stratakit/foundations`, you’ll find the `Root` component. This creates a context for StrataKit theming and functionality. **Bricks** and **Structures** are added, as descendants, to `Root`, where applicable.

In terms of how many, in what order, and in what relationships you incorporate the provided components, StrataKit provides a high degree of flexibility. To a large extent, _composition_ is a matter for your team’s discretion. However, there are certain things to bear in mind, or you will risk causing errors and introducing accessibility issues.

## Component status

Check the status before choosing to use a component in your product. You may be unwilling to undertake certain risks and uncertainties. You can find the status in the metadata at the top of each component’s documentation page. It will have one of the following values:

- <status-badge>Draft</status-badge>: The component is still being designed. Consider the documentation a specification for what is to come.
- <status-badge>Unstable</status-badge>: The component is available for consumption but is not comprehensively tested and may undergo breaking changes. As an early adopter, please provide feedback.
- <status-badge>Stable</status-badge>: The component is established and meets our compatibility and accessibility standards.
- <status-badge>Deprecated</status-badge>: The component is no longer supported or recommended. Remove or replace it at your earliest convenience.
- <status-badge>Unknown</status-badge>: The status is currently unsettled. You may be able to help settle it.

## Use cases

Finding the right component for your use case is the first step toward an accessible user experience. That’s why each component guide leads with **Use cases**. You’ll find a table that matches similar, sometimes conflated or confused components against the use cases for which they are suitable.

As in the use cases table for [Anchor](/components/anchor), each component is linked for redirection:

| Use case                                                                         | [Anchor](/components/anchor) | [Button](/components/button) |
| -------------------------------------------------------------------------------- | :--------------------------: | :--------------------------: |
| Navigating between interface screens or sections                                 |              ✅              |              ❌              |
| Submitting forms, confirming or cancelling dialogs, creating or deleting content |              ❌              |              ✅              |

## Required props

You are required to provide certain props (properties). For example, the [IconButton’s](/components/iconbutton) `label` prop is required.

```ts
/**
 * Accessible name for the button.
 *
 * This label gets used by assistive technology to identify the button,
 * and also gets shown in a tooltip by default.
 */
label: string;
```

Labels, even where invisible to some, are important for comprehension to others. You are asked not just to satisfy the requirement of providing a string, but to put consideration into its wording.

## Decomposition

Many components have a limited API surface by default. This is for ease of use. However, there may be circumstances which demand finer control over the component’s structure. In these cases, you are able to _decompose_ and _recompose_ the component from its parts.

For example, a simple [TextBox](/components/textbox) might look like this:

```jsx
<TextBox.Input name="firstName" />
```

However, to incorporate an icon, the component has to be _decomposed_ first. In this case, the more complex composition uses the `TextBox.Root` and `TextBox.Icon` sub-components.

```jsx
<TextBox.Root>
  <TextBox.Input name="firstName" />
  <TextBox.Icon href={…} />
</TextBox.Root>
```

:::caution[Accessible labels are required]
The above examples show the **TextBox** alone. A real-world example would include an accessible label. See [**Associated components**](#associated-components).
:::

## Associated components

The metadata for any one component’s documentation may include **associated components**. These are components that can be used in conjunction with the current component to build more complex patterns.

For example, the [Field](/components/field) component is associated with [TextBox](/components/textbox). The **Field** automatically takes care of programmatic label association.

```jsx
<Field.Root>
  <Field.Label>First name</Field.Label>
  <Field.Control
    render={(controlProps) => (
      <TextBox.Root>
        <TextBox.Input name="firstName" {...controlProps} />
        <TextBox.Icon href={…} />
      </TextBox.Root>
    )}
  />
</Field.Root>
```

Were you not to use [Field](/components/field), label association would have to be implemented manually: the `htmlFor` and `id` values must match.

```jsx 'htmlFor="firstName"' 'id="firstName"'
<Label htmlFor="firstName">First name</Label>
<TextBox.Root>
  <TextBox.Input name="firstName" id="firstName" />
  <TextBox.Icon href={…} />
</TextBox.Root>
```

Both [Field](/components/field) and [Label](/components/label) are associated components for [TextBox](/components/textbox). While it is expected labeling is more convenient using [Field](/components/field), there may be circumstances where [Label](/components/label) is needed instead. For example, where the `id` value is predetermined and cannot be changed.
