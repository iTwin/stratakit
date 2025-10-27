---
title: Tooltip
description: Tooltips are used to convey additional context on interactive elements.
status: stable
associated:
  - Button
  - IconButton
links:
  demo: tests/tooltip
  github: packages/bricks/src/Tooltip.tsx
  figma: https://www.figma.com/design/VcGw3L2IIlboxNlOdsKdai/%F0%9F%A5%9D-Kiwi-Component-Library?m=auto&node-id=1436-52842&t=Tl3xrwwMxztNHNtb-1
---

## Use cases

Make sure the **Tooltip** is suitable for your use case. In some cases, a static text label is preferred. In others, the **Tooltip** can supplement a static text label. For [**IconButton**](/components/iconbutton), **Tooltip** is the only labeling mechanism available, and it is invoked using the `label` prop’.

| Use case                                                                | [Tooltip](/components/tooltip) | Static text     |
| ----------------------------------------------------------------------- | ------------------------------ | --------------- |
| [IconButton](/components/iconbutton) (**Tooltip** via the `label` prop) | ✅ (required)                  | ❌              |
| [Button](/components/button) or [Anchor](/components/anchor)            | ✅ (optional)                  | ✅ (required)   |
| [TextBox](/components/textbox) _primary label_                          | ❌                             | ✅ (required)   |
| [TextBox](/components/textbox) _validation hints_                       | ✅ (or static text)            | ✅ (or tooltip) |
| [TextBox](/components/textbox) and other input _descriptions_           | ❌                             | ✅              |
| Text longer than a short phrase or sentence                             | ❌                             | ✅              |
| Mobile-first interfaces, where `hover` is not available                 | ❌                             | ✅              |

## Usage

### General

::example{src="Tooltip.default"}

The **Tooltip** component must wrap a _single, interactive element_. It can be used with any interactive element (such as a [**Button**](/components/button)) which already has an accessible label. Treat the text in an associated tooltip as _supplementary only_ and use `type="description"` (the default).

```jsx
<Tooltip content="Save is disabled until you finish reading the documentation." type="description">
	<Button disabled>Save</Button>
</Tooltip>
```

### IconButton

::example{src="IconButton.default"}

The **Tooltip** is integrated into the [**IconButton**](/components/iconbutton) component and available via the `label` prop. The **Tooltip** component is not needed.

Since the **IconButton’s** tooltip represents its principle—and only—label, choose a `label` value that adequately explains the **IconButton’s** purpose.

## ✅ Do

- Use **Tooltips** as labels for **IconButton** components.
- Use **Tooltips** as descriptions for **Button** elements, supplementing the **Button’s** existing label.
- Keep tooltip content **brief**, **relevant**, and **helpful**.

## 🚫 Don’t

- Don’t use tooltips for the labels or descriptions of form inputs. Use inline text elements instead.
- Don’t use tooltips for revealing truncated text.
- Don’t use the “none” `type` value unless an [accessible label/name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name) is in place by other means.
