---
title: IconButton
description: Icon buttons are compact buttons used for toolbar and supplementary actions.
links:
  muiDocs: https://mui.com/material-ui/react-button/#icon-button
  apiReference: https://mui.com/material-ui/api/icon-button/
---

::example{src="mui/IconButton.default"}

## Use cases

Make sure the **IconButton** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                                                         | [Button](/components/button) | [IconButton](/components/iconbutton) |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------ |
| Call-to-action                                                                                                   | ✅                           | ❌                                   |
| Commit/submit (modal, workflow, form)                                                                            | ✅                           | ❌                                   |
| Inside a [toolbar](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role) | ❌                           | ✅                                   |
| Table cell (inline action)                                                                                       | ❌                           | ✅                                   |

## StrataKit MUI modifications

- The `"default"`, `"info"`, `"success"`, `"warning"`, `"inherit"` colors have been removed. The default color is now `"secondary"`.
- The `size` options (`small`, `medium`, `large`) have all been decreased in height.
- A `label` prop has been added. When specified, it is used as the **IconButton’s** accessible name and is also shown in a tooltip on hover and focus.

## Examples

### Badge

Use a [**Badge**](/components/badge) component to indicate the functionality behind the **IconButton** is in need of attention. For example, an **IconButton** for notifications can indicate _unread_ notifications.

::example{src="mui/Badge.default"}

Make sure to provide an accessible description in the form of a visually hidden text explaining the significance of the badge’s presence. In this case, the value is _“You have 4 unread notifications”_.

### Sizes

- **Small:** Use in compact interfaces where space is limited.
- **Medium:** Default size, suitable for most use cases.
- **Large:** Use in spacious layouts where a more prominent button is needed.

::example{src="mui/IconButton.sizes"}

## ✅ Do

- Use the `label` prop to provide an accessible name and tooltip for the **IconButton**.
- Use in [toolbars](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role).
- Use it only when a stand-alone icon effectively communicates the action.

## 🚫 Don’t

- Don’t use to replace buttons.
- Don’t use if an icon doesn’t clearly convey the action. Use a [**Button**](/components/button) with a text label or a more suitable icon.
