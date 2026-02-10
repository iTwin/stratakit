---
title: IconButton
description: Icon buttons are compact buttons used for toolbar and supplementary actions.
links:
  muiDocs: https://mui.com/material-ui/react-button/#icon-button
  apiReference: https://mui.com/material-ui/api/icon-button/
---

## Use cases

Make sure the **IconButton** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                                                                         | [Button](/components/button) | [IconButton](/components/iconbutton) |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------ |
| Call-to-action                                                                                                   | ✅                           | ❌                                   |
| Commit/submit (modal, workflow, form)                                                                            | ✅                           | ❌                                   |
| Inside a [toolbar](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role) | ❌                           | ✅                                   |
| Table cell (inline action)                                                                                       | ❌                           | ✅                                   |

## Usage

::example{src="mui/IconButton.default"}

The **IconButton** component renders as an HTML [`<button>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button). It supports the `<button>` element’s API, including all of its attributes.

### Badge

Use a **Badge** component to indicate the functionality behind the **IconButton** is in need of attention. For example, an **IconButton** for notifications can indicate _unread_ notifications.

::example{src="mui/Badge.default"}

Make sure to provide an accessible description in the form of a visually hidden text explaining the significance of the badge’s presence. In this case, the value is _“You have 4 unread notifications”_.

## ✅ Do

- Use in [toolbars](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role).
- Use it only when a stand-alone icon effectively communicates the action.

## 🚫 Don’t

- Don’t use to replace buttons.
- Don’t use if an icon doesn’t clearly convey the action. Use a [**Button**](/components/button) with a text label or a more suitable icon.
