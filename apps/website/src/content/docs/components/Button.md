---
title: Button
description: Buttons are used to initiate actions.
---

::example{src="mui/Button.default"}

## Use cases

Make sure the **Button** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                          | [Button](/components/button) | [IconButton](/components/iconbutton) | [Switch](/components/switch) | [Link](/components/link) |
| ----------------------------------------------------------------- | :--------------------------: | :----------------------------------: | :--------------------------: | :----------------------: |
| Submit forms, confirm or cancel dialogs, create or delete content |              ✅              |                  ❌                  |              ❌              |            ❌            |
| Select an option within a toolbar                                 |              ❌              |                  ✅                  |              ❌              |            ❌            |
| Make a binary choice (switching a setting on or off)              |              ❌              |                  ❌                  |              ✅              |            ❌            |
| Navigate between interface screens or sections                    |              ❌              |                  ❌                  |              ❌              |            ✅            |

## Examples

### Icons

An [**Icon**](/components/icon) can be prepended or appended to the **Button’s** text label. It’s important the **Icon’s** `alt` is omitted, since the text already provides the accessible label. In the following example, a “+” icon is appended to the text “Add new”.

::example{src="mui/Button.icon"}

### Variants

- **Contained:** Default button styling. If you're not sure what tone to use, use this one.
- **Outlined:** Reduce the visual weight. Use for secondary actions or to unclutter the UI.
- **Text:** Minimal visual weight. Useful in tight spaces where other variants would create superfluous boxes. Commonly used for actionable icons, such as in table rows.

::example{src="mui/Button.variants"}

| Use case               | Contained | Outlined | Text                           |
| ---------------------- | --------- | -------- | ------------------------------ |
| Primary call-to-action | ✅        | ❌       | ❌                             |
| Modal confirm          | ✅        | ✅       | ❌                             |
| Modal cancel           | ✅        | ✅       | ✅                             |
| Table cell             | ❌        | ❌       | ✅ (with an accompanying icon) |

### Tones

- **Secondary:** The default, neutral tone. If unsure, use this.
- **Primary:** Reserved for key actions, tools, and call-to-actions like form submissions or dialog confirmations. Use sparingly—one per page or section. Multiple accent-toned buttons dilute impact and create visual noise.
- **Error:** Reserved for destructive or potentially harmful actions, such as deleting content or cancelling subscriptions. Use sparingly to avoid desensitizing users to its significance.

::example{src="mui/Button.colors"}

| Use case                              | Secondary | Primary | Error |
| ------------------------------------- | --------- | ------- | ----- |
| Primary call-to-action                | ✅        | ✅      | ❌    |
| Modal confirmation or form submission | ❌        | ✅      | ❌    |
| Destructive call-to-action            | ❌        | ❌      | ✅    |

## UX guidelines

### ✅ Do

- Use **Button** for form submissions, modal confirmations, and other non-navigational calls-to-action.
- Include a clear and concise label, describing the action the Button will take.
- Include supplementary Icons before and/or after the label to assist with apprehension. For example, a “+” icon after “Add new”.
- Use two buttons together, defining alternative or opposing actions, such as “Confirm” and “Cancel”.
- Accompany text variants with icons, to increase affordance. Otherwise, they are less likely to be perceived as interactive.

### 🚫 Don’t

- Don't use **Button** for navigation. Use an [**Link**](/components/link) or simple text link instead.
- Don't include multiple **Buttons** with the same label.
- Don't use unclear or superfluous icons. The text label is paramount.
- Don't include **Buttons** in a [toolbar](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role). Use [**IconButtons**](/components/iconbutton) instead.
- Don't use a tone that creates an insufficient [contrast](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable/Color_contrast) between the **Button** and the background color of the interface.
