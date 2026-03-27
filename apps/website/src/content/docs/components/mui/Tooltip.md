---
title: Tooltip
description: Tooltips are used to convey additional context on interactive elements.
links:
  muiDocs: https://mui.com/material-ui/react-tooltip/
  apiReference: https://mui.com/material-ui/api/tooltip/
---

::example{src="mui/Tooltip.default"}

## Use cases

Make sure the **Tooltip** is suitable for your use case. In some cases, a static text label is preferred. In others, the **Tooltip** can supplement a static text label. For [**IconButton**](/components/iconbutton), **Tooltip** is the only labeling mechanism available, and it is invoked using the `label` prop’.

| Use case                                                                | [Tooltip](/components/tooltip) | Static text     |
| ----------------------------------------------------------------------- | ------------------------------ | --------------- |
| [IconButton](/components/iconbutton) (**Tooltip** via the `label` prop) | ✅ (required)                  | ❌              |
| [Button](/components/button) or [Link](/components/Link)            | ✅ (optional)                  | ✅ (required)   |
| [TextBox](/components/textbox) _primary label_                          | ❌                             | ✅ (required)   |
| [TextBox](/components/textbox) _validation hints_                       | ✅ (or static text)            | ✅ (or tooltip) |
| [TextBox](/components/textbox) and other input _descriptions_           | ❌                             | ✅              |
| Text longer than a short phrase or sentence                             | ❌                             | ✅              |
| Mobile-first interfaces, where `hover` is not available                 | ❌                             | ✅              |

## StrataKit MUI modifications

- The `describeChild` prop defaults to `true`.

## Examples

### Label

Use the `describeChild` prop to provide an accessible label via [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label), instead of the default behavior, which supplies a description via [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby).

::example{src="mui/Tooltip.label"}

### IconButton

The **Tooltip** is integrated into the [**IconButton**](/components/iconbutton) component and available via the `label` prop. The **Tooltip** component is not needed.

Since the **IconButton’s** tooltip represents its principle label, choose a `label` value that adequately explains the **IconButton’s** purpose.

::example{src="mui/IconButton.default"}

## ✅ Do

- Use **IconButton** `label` prop to automatically apply **Tooltip**.
- Use **Tooltips** as descriptions for **Button** elements, supplementing the **Button’s** existing label.
- Keep tooltip content **brief**, **relevant**, and **helpful**.

## 🚫 Don’t

- Don’t use tooltips for the labels or descriptions of form inputs. Use inline text elements instead.
- Don’t use tooltips for revealing truncated text.
- Don’t omit a programmatically associated label or description unless an [accessible label/name](https://developer.mozilla.org/en-US/docs/Glossary/Accessible_name) is in place by other means.
