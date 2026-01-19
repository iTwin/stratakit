---
title: Divider
status: stable
description: Dividers are used to separate actions or information.
links:
  demo: tests/divider
  github: packages/bricks/src/Divider.tsx
  figma: https://www.figma.com/design/VcGw3L2IIlboxNlOdsKdai/%F0%9F%A5%9D-Kiwi-Component-Library?m=auto&node-id=1436-52654&t=OKtGv13S6JSnqhiU-1
---

## Use cases

The **Divider** comes in two forms: _semantic_ and _presentational_. By default, the **Divider** is semantic; it programmatically communicates a separation of content or functionality. However, in some cases, the semantics may be superfluous. In these cases, you should apply the `presentational` prop.

| Use case                                                                                            | default | `presentational` |
| --------------------------------------------------------------------------------------------------- | :-----: | :--------------: |
| As a horizontal rule, separating paragraphs and other flow content                                  |   ✅    |        ❌        |
| As a separator, marking a division between options, such as in a [**Toolbar**](/components/toolbar) |   ✅    |        ❌        |
| As a visual indicator marking the separation of two lists                                           |   ❌    |        ✅        |

## Usage

::example{src="Divider.default"}

### In a toolbar

A **Divider** is commonly used to separate groups of related options in a [**Toolbar**](/components/toolbar).

::example{src="Toolbar.divider"}

```jsx
<Toolbar.Group variant="solid" orientation="vertical">
  <Toolbar.Item render={…} />
  <Toolbar.Item render={…} />
  <Divider />
  <Toolbar.Item render={…} />
  <Toolbar.Item render={…} />
</Toolbar.Group>
```

### Separating flow content

In the following example, [from the HTML5 specification](https://html.spec.whatwg.org/multipage/grouping-content.html#the-hr-element), the **Divider** separates topics within a section.

```jsx
<p>There are various methods of communication. This section
covers a few of the important ones used by the project.</p>

<Divider />

<p>Communication stones seem to come in pairs and have mysterious
properties:</p>
<ul>…</ul>
```

### Separating lists of options

Your navigation may be subdivided into multiple lists. You can use the **Divider**, with the [`presentational`](/reference/bricks/Divider/#Divider.presentational) prop, to visually mark where one list ends and the next begins.

```jsx 'presentational'
<ul>
  ...
  <li>
    <a href="/dashboard">Dashboard</a>
  </li>
  <li>
    <a href="/create">Create</a>
  </li>
<ul>
<Divider presentational />
<ul>
  <li>
    <a href="/account">Account</a>
  </li>
  <li>
    <a href="/notifications">Notifications</a>
  </li>
  ...
<ul>
```

## Configurations

### Orientation

By default, the **Divider** appears in a horizontal orientation. Reorientate it using [`orientation="vertical"`](/reference/bricks/Divider#Divider.orientation).

::example{src="Divider.vertical"}

A [**Toolbar**](/components/toolbar) with a horizontal orientation (default), must use vertical **Dividers**.

```jsx 'orientation="vertical"'
<Toolbar.Group variant="solid">
  <Toolbar.Item render={…} />
  <Toolbar.Item render={…} />
  <Divider orientation="vertical" />
  <Toolbar.Item render={…} />
  <Toolbar.Item render={…} />
</Toolbar.Group>
```

:::caution[Orientation semantics]

**Divider** uses `aria-orientation` to communicate the orientation programmatically. Where the [`presentational`](/reference/bricks/Divider/#Divider.presentational) prop is also applied, neither the **Divider** nor its orientation are made available.

:::

## ✅ Do

- Use the **Divider** to separate [**Toolbar**](/components/toolbar) options.
- Use the **Divider** to break up flow content.
- Use the **Divider** to indicate divisions between grouped content such as lists.

## 🚫 Don’t

- Don’t use a **Divider** where a heading would better introduce a section of content.
- Don’t omit [`presentational`](/reference/bricks/Divider/#Divider.presentational) in cases where the semantics are superfluous, such as at the intersection between two unordered lists.
