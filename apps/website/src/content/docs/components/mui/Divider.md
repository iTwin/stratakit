---
title: Divider
description: Dividers are used to separate actions or information.
links:
  muiDocs: https://mui.com/material-ui/react-divider/
  apiReference: https://mui.com/material-ui/api/divider/
---

::example{src="mui/Divider.default" min-width="300px"}

## Use cases

The **Divider** comes in two forms: _semantic_ and _presentational_. By default, the **Divider** is semantic; it programmatically communicates a separation of content or functionality. However, in some cases, the semantics may be superfluous. In these cases, you should turn it into a [_presentational_ **Divider**](#presentational-dividers).

| Use case                                                                                                                                                                 | _semantic_ | _presentational_ |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ---------------- |
| As a horizontal rule, separating paragraphs and other flow content                                                                                                       | ✅         | ❌               |
| As a separator, marking a division between options, such as in a [toolbar](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role) | ✅         | ❌               |
| As a visual indicator marking the separation of two lists                                                                                                                | ❌         | ✅               |

## StrataKit MUI modifications

- Renders a semantic [`<hr>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/hr) by default, switching to a `<div>` when it has [children](#children), is [vertical](#orientation), or is [presentational](#presentational-dividers).
- Added [`margin`](#margin) prop.

## Examples

### Separating flow content

In the following example, [from the HTML5 specification](https://html.spec.whatwg.org/multipage/grouping-content.html#the-hr-element), the **Divider** separates topics within a section.

::example{src="mui/Divider.semantic" min-height="200px"}

### Presentational dividers

You may wish to make a **Divider** _presentational_ by removing its semantics, i.e. by passing [`role="presentation"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/presentation_role).

For example, your navigation may be subdivided into multiple lists which are already separated semantically. You can use a _presentational_ **Divider** to visually mark where one list ends and the next begins.

::example{src="mui/Divider.presentational" min-height="200px"}

### Orientation

By default, the **Divider** appears in a horizontal orientation. Reorientate it using `orientation="vertical"`.

::example{src="mui/Divider.vertical" min-height="200px"}

:::caution[Orientation semantics]

**Divider** uses [`aria-orientation`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-orientation) to convey its orientation programmatically. When the _presentational_ **Divider** is used, neither the element nor its orientation is exposed to assistive technologies.

:::

### Margin

The `margin` prop can be set to include some space before and after the **Divider**.

::example{src="mui/Divider.margin"}

### Variant

The variant can control how much of the container the **Divider** spans. The default is `"fullWidth"`.

::example{src="mui/Divider.variant"}

### Children

When the `children` prop is passed, the **Divider** will render as a generic `<div>` (without [`separator`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/separator_role) semantics). It is recommended to supplement the **Divider** with alternative semantics, such as a heading.

::example{src="mui/Divider.children" min-width="300px"}

## ✅ Do

- Use the **Divider** to break up flow content.
- Use the **Divider** to indicate divisions between grouped content such as lists.
- Use _presentational_ **Divider** in cases where the semantics are superfluous, such as at the intersection between two unordered lists.

## 🚫 Don't

- Don't use a **Divider** where a heading would better introduce a section of content.
