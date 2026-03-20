---
title: Divider
description: Dividers are used to separate actions or information.
links:
  muiDocs: https://mui.com/material-ui/react-divider/
  apiReference: https://mui.com/material-ui/api/divider/
---

::example{src="mui/Divider.default"}

## Use cases

The **Divider** comes in two forms: _semantic_ and _presentational_. By default, the **Divider** is semantic; it programmatically communicates a separation of content or functionality. However, in some cases, the semantics may be superfluous. In these cases, you should apply the `role="presentation"` prop and render the divider as a `<div>` element.

| Use case                                                                                                                                                                 | _semantic_ | _presentational_ |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ---------------- |
| As a horizontal rule, separating paragraphs and other flow content                                                                                                       | ✅         | ❌               |
| As a separator, marking a division between options, such as in a [toolbar](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role) | ✅         | ❌               |
| As a visual indicator marking the separation of two lists                                                                                                                | ❌         | ✅               |

## Examples

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

### Orientation

By default, the **Divider** appears in a horizontal orientation. Reorientate it using `orientation="vertical"`.

::example{src="mui/Divider.vertical"}

:::caution[Orientation semantics]

**Divider** uses `aria-orientation` to communicate the orientation programmatically. Where the _presentational_ **Divider** is used, neither it nor its orientation is made available.

:::

## ✅ Do

- Use the **Divider** to break up flow content.
- Use the **Divider** to indicate divisions between grouped content such as lists.
- Use _presentational_ **Divider** in cases where the semantics are superfluous, such as at the intersection between two unordered lists.

## 🚫 Don’t

- Don’t use a **Divider** where a heading would better introduce a section of content.
