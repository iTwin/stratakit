---
title: IconButton
description: Icon buttons are compact buttons used for toolbar and supplementary actions.
status: stable
associated:
  - Toolbar
links:
  demo: tests/icon-button
  github: packages/bricks/src/IconButton.tsx
  figma: https://www.figma.com/design/VcGw3L2IIlboxNlOdsKdai/%F0%9F%A5%9D-Kiwi-Component-Library?m=auto&node-id=1436-51507&t=n6KvX8mvOruoHUGo-1
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

### Toolbar

Organize **IconButtons** into [**Toolbars**](/components/toolbar). This grouping mechanism is both screen reader and keyboard accessible.

::example{src="IconButton.toolbar"}

```jsx
<Toolbar.Group variant="solid">
	<Toolbar.Item
		render={<IconButton label="Bold" icon={`${boldIcon}#icon-large`} variant="ghost" active />}
	/>
	<Toolbar.Item
		render={<IconButton label="Italic" icon={`${italicIcon}#icon-large`} variant="ghost" />}
	/>
</Toolbar.Group>
```

:::note[The `active` prop]
In this case, the bold button is considered _active_. Indicate active **IconButtons** by applying the `active` prop’ (Boolean). This automatically applies the `aria-pressed="true"` attribution for screen reader accessibility.
:::

### The dot

Include the `dot` prop’ to indicate the functionality behind the **IconButton** is in need of attention. For example, an **IconButton** for notifications can indicate _unread_ notifications.

::example{src="IconButton.dot"}

```jsx
<IconButton label="Notifications" dot="You have unread notifications" icon={notificationsIcon} />
```

Word the `dot` value carefully, since it supplies an accessible description explaining the significance of the dot’s presence. In this case, the value is _“You have unread notifications”_.

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
- Don’t use if an icon doesn’t clearly convey the action. Use a [**Button**](/components/button) with a text label or a more suitable icon.
