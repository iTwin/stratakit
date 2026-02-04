---
title: IconButton
description: Icon buttons are compact buttons used for toolbar and supplementary actions.
---

## Use cases

Make sure the **IconButton** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                    | [Button](/components/button) | [IconButton](/components/iconbutton) |
| ------------------------------------------- | ---------------------------- | ------------------------------------ |
| Call-to-action                              | ✅                           | ❌                                   |
| Commit/submit (modal, workflow, form)       | ✅                           | ❌                                   |
| Inside a [**Toolbar**](/components/toolbar) | ❌                           | ✅                                   |
| Table cell (inline action)                  | ❌                           | ✅                                   |

## Usage

::example{src="mui/IconButton.default"}

### Badge

Use a **Badge** component to indicate the functionality behind the **IconButton** is in need of attention. For example, an **IconButton** for notifications can indicate _unread_ notifications.

::example{src="mui/Badge.default"}

Make sure to provide an accessible description in the form of a visually hidden text explaining the significance of the badge’s presence. In this case, the value is _“You have 4 unread notifications”_.

## Configurations

### Variants

- **Solid:** Default button styling. If you’re not sure what tone to use, use this one.
- **Outline:** Reduce the visual weight. Use for secondary actions or to unclutter the UI.
- **Ghost:** Minimal visual weight. Useful in tight spaces where other variants would create excess boxes. Commonly used for actionable icons such as in table cells.

::example{src="IconButton.variants"}

| Use case                                | Solid | Outline | Ghost |
| --------------------------------------- | ----- | ------- | ----- |
| Table cell (inline action)              | ❌    | ❌      | ✅    |
| Inside a [Toolbar](/components/toolbar) | ✅    | ✅      | ✅    |

## ✅ Do

- Use in [**Toolbars**](/components/toolbar).
- Use it only when a stand-alone icon effectively communicates the action.

## 🚫 Don’t

- Don’t use to replace buttons.
- Don’t use if an icon doesn’t clearly convey the action. Use a [**Button**](/components/button) with a text label or a more suitable icon.
