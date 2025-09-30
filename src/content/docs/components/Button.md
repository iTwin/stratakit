---
title: Button
description: Buttons are used to initiate actions.
status: ready
associated:
  - Icon
links:
  demo: tests/button
  github: packages/bricks/src/Button.tsx
  figma: https://www.figma.com/design/EfvaViHLAhb6v1ghEBXpSB/documentation--WIP-?node-id=161-1161&t=fRRXvPQ4CL1HizqP-4
---

## Use cases

Make sure the **Button** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                          | [Button](/components/button) | [IconButton](/components/iconbutton) | [Switch](/components/switch) | [Anchor](/components/anchor) |
| ----------------------------------------------------------------- | :--------------------------: | :----------------------------------: | :--------------------------: | :--------------------------: |
| Submit forms, confirm or cancel dialogs, create or delete content |              ✅              |                  ❌                  |              ❌              |              ❌              |
| Select an option within a toolbar                                 |              ❌              |                  ✅                  |              ❌              |              ❌              |
| Make a binary choice (switching a setting on or off)              |              ❌              |                  ❌                  |              ✅              |              ❌              |
| Navigate between interface screens or sections                    |              ❌              |                  ❌                  |              ❌              |              ✅              |

## Anatomy

### Structure

```jsx
<Button variant="outline" tone="accent" onClick={() => {}}>
	Create new
</Button>
```

- `<Button>`: The Button component renders as an HTML [`<button>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button), which is implicitly keyboard and screen reader accessible.
  - `variant` (default: `"solid"`) : The chosen [variant](#variants).
  - `tone` (default: `"neutral"`) : The chosen [tone](#tones).
  - `onClick`: Handler for the [`click` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event).
  - `children`: The accessible, text-based label.

## Usage

### Variants

- **Solid:** Default button styling. If you're not sure what tone to use, use this one.
- **Outline:** Reduce the visual weight. Use for secondary actions or to unclutter the UI.
- **Ghost:** Minimal visual weight. Useful in tight spaces where other variants would create superfluous boxes. Commonly used for actionable icons, such as in table rows.

::example{src="Button.variants"}

| Use case               | Solid | Outline | Ghost                          |
| ---------------------- | ----- | ------- | ------------------------------ |
| Primary call-to-action | ✅    | ❌      | ❌                             |
| Modal confirm          | ✅    | ✅      | ❌                             |
| Modal cancel           | ✅    | ✅      | ✅                             |
| Table cell             | ❌    | ❌      | ✅ (with an accompanying icon) |

### Tones

- **Neutral:** The default tone. If unsure, use this.
- **Accent:** Reserved for key actions, tools, and call-to-actions like form submissions or dialog confirmations. Use sparingly—one per page or section. Multiple accent-toned buttons dilute impact and create visual noise.

::example{src="Button.tones"}

| Use case                              | Neutral | Accent |
| ------------------------------------- | ------- | ------ |
| Primary call-to-action                | ✅      | ✅     |
| Modal confirmation or form submission | ❌      | ✅     |

### Icons

An [**Icon**](/components/icon) can be prepended or appended to the button’s text label. It’s important the **Icon’s** `alt` is omitted, since the text already provides the accessible label. In the following example, a “+” icon is appended to the text “Add new”.

```jsx
<Button onClick={() => {}}>
	Create new
	<Icon href={addIcon} />
</Button>
```

### ✅ Do

- Use **Button** for form submissions, modal confirmations, and other non-navigational calls-to-action.
- Include a clear and concise label, describing the action the Button will take.
- Include supplementary Icons before and/or after the label to assist with apprehension. For example, a “+” icon after “Add new”.
- Use two buttons together, defining alternative or opposing actions, such as “Confirm” and “Cancel”.
- Accompany ghost variants with icons, to increase affordance. Otherwise, they are less likely to be perceived as interactive.

### 🚫 Don’t

- Use **Button** for navigation. Use an [**Anchor**](/components/anchor) or simple text link instead.
- Include multiple **Buttons** with the same label.
- Use unclear or superfluous icons. The text label is paramount.
- Include **Buttons** in a [**Toolbar**](/components/toolbar). Use [**IconButtons**](/components/iconbutton) instead.
- Use a tone that creates an insufficient [contrast](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable/Color_contrast) between the **Button** and the background color of the interface.
