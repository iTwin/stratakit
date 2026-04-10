---
title: Tooltip
description: Tooltips are used to convey additional context on interactive elements.
links:
  muiDocs: https://mui.com/material-ui/react-tooltip/
  apiReference: https://mui.com/material-ui/api/tooltip/
---

::example{src="mui/Tooltip.default"}

## Use cases

Make sure the **Tooltip** is suitable for your use case. In some cases, a static text label is preferred. In others, the **Tooltip** can supplement a static text label. For [**IconButton**](/components/iconbutton), **Tooltip** is the only labeling mechanism available, and it is invoked using the `label` prop.

| Use case                                                          | [Tooltip](/components/tooltip)     | [Popover](/components/popover) | Static text   |
| ----------------------------------------------------------------- | ---------------------------------- | ------------------------------ | ------------- |
| [IconButton](/components/iconbutton) _primary label_              | ✅ (required via the `label` prop) | ❌                             | ❌            |
| [Button](/components/button) or [Link](/components/link)          | ✅ (optional)                      | ✅ (optional)                  | ✅ (required) |
| [TextField](/components/textfield) _primary label_                | ❌                                 | ❌                             | ✅ (required) |
| [TextField](/components/textfield) _validation hints_             | ✅                                 | ❌                             | ✅            |
| [TextField](/components/textfield) and other input _descriptions_ | ❌                                 | ❌                             | ✅            |
| Text longer than a short phrase or sentence                       | ❌                                 | ✅                             | ✅            |
| Mobile-first interfaces, where `:hover` is not available          | ❌                                 | ❌                             | ✅            |
| Rich, structured and interactive content                          | ❌                                 | ✅                             | ❌            |

## StrataKit MUI modifications

- Restyled using StrataKit's visual language.
- The [`describeChild`](https://mui.com/material-ui/api/tooltip/#tooltip-prop-describeChild) prop defaults to `true`.
- Change default placement from `"bottom"` to `"top"`.
- Includes full `forced-colors` support.

## Examples

### Direction

The **Tooltip** supports 12 [`placement`](https://mui.com/material-ui/api/tooltip/#tooltip-prop-placement) options. The example highlights 4 of the most common.

::example{src="mui/Tooltip.direction"}

### Label

Use the `describeChild` prop to provide an accessible label via [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label), instead of the default behavior, which supplies a description via [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby).

::example{src="mui/Tooltip.label"}

### IconButton

The **Tooltip** is integrated into the [**IconButton**](/components/iconbutton) component and available via the `label` prop. The **Tooltip** component is _not_ needed.

Since the **IconButton’s** tooltip represents its principle label, choose a `label` value that adequately explains the **IconButton’s** purpose.

::example{src="mui/IconButton.default"}

## ✅ Do

- Use **IconButton** `label` prop to automatically apply **Tooltip**.
- Use **Tooltips** as descriptions for **Button** elements, supplementing the **Button’s** existing label.
- Keep tooltip content _brief_, _relevant_, and _helpful_.

## 🚫 Don’t

- Don’t use **Tooltips** around static elements (e.g. `<div>` or `<span>`).
- Don’t place interactive elements _inside_ the **Tooltip** content. Use [**Popover**](/components/popover) instead.
- Don’t use **Tooltips** for the labels or descriptions of form inputs. Use inline text elements instead.
- Don’t use **Tooltips** for revealing truncated text.
- Don’t omit a programmatically associated label or description unless an [accessible label/name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name) is in place by other means.
