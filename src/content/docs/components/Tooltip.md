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

Make sure the **Tooltip** is suitable for your use case. In some cases, a static text label is preferred. In others, the **Tooltip** can supplement a static text label. For [**IconButton**](/components/iconbutton), **Tooltip** is the only labeling mechanism available and invoked using the `label` prop’.

| Use case                                                                | [Tooltip](/components/tooltip) | Static text     |
| ----------------------------------------------------------------------- | ------------------------------ | --------------- |
| [IconButton](/components/iconbutton) (**Tooltip** via the `label` prop) | ✅ (required)                  | ❌              |
| [Button](/components/button) or [Anchor](/components/anchor)            | ✅ (optional)                  | ✅ (required)   |
| [TextBox](/components/textbox) _primary label_                          | ❌                             | ✅ (required)   |
| [TextBox](/components/textbox) _validation hints_                       | ✅ (or static text)            | ✅ (or tooltip) |
| [TextBox](/components/textbox) and other input _descriptions_           | ❌                             | ✅              |
| Text longer than a short phrase or sentence                             | ❌                             | ✅              |
| Mobile-first interfaces, where `hover` is not available                 | ❌                             | ✅              |

## Anatomy

The **Tooltip** component must wrap a _single, interactive element_. This is included in the anatomy for context.

### Structure

```jsx
<Tooltip content="The description" type="description" placement="top">
	<Button>The label</Button>
</Tooltip>
```

- `<Tooltip>`: Displayed as a popover in the rendered HTML.
  - `content` (`string`; required): The content of the tooltip itself.
  - `type` (`string`; default: “description”): One of “description”, “label”, or “none”. What role the tooltip should take.
  - `placement` (`string`): Physical position in relation to the invoking element (`<Button/>`, in this case): “top”, “top-start”, “top-end” “bottom”, “bottom-start”, “bottom-end”, “left”, or “right”. This only sets the _preferred_ placement. The tooltip position changes automatically to prevent it becoming obscured.

:::note[IconButtons]
The **Tooltip** is integrated into the [IconButton](/components/iconbutton) component and available as a `prop`. See [Usage](#usage) for more information.
:::

## Usage

The Tooltip can be used with any interactive element (such as a [**Button**](/components/button)) which already has an accessible label. Treat the text in an associated tooltip as supplementary only and use `type="description"` (the default).

```jsx
<Tooltip content="402KB file size" type="description">
	<Button>Download</Button>
</Tooltip>
```

Were `type="label"` used in this case, screen reader users would only hear _“402KB file size”_ and not _“download”_. Selecting the **Button** by voice activation would also become problematic, since the visible label and programmatic label would differ.

### IconButton

[IconButtons](/components/iconbutton) do not display text labels by default. Instead, their `label` prop defines the content for an integrated **Tooltip**. Choose a `label` value that adequately explains the **IconButton’s** purpose.

::example{src="IconButton.default"}

```jsx
<IconButton label="Download" icon={downloadIcon} />
```

The label is critical for accessibility, hence the `label` property is required.

### ✅ Do

- Use **Tooltips** as labels for **IconButton** components.
- Use **Tooltips** as descriptions for **Button** elements, supplementing the **Button’s** existing label.
- Keep tooltip content **brief**, **relevant**, and **helpful**.

### 🚫 Don’t

- Don’t use tooltips for the labels or descriptions of form inputs. Use inline text elements instead.
- Don’t use tooltips for revealing truncated text.
- Don’t use the “none” `type` value unless an [accessible label/name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name) is in place by other means.
