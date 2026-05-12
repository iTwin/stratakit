---
title: Toolbar
description: Toolbars are used for grouping related tools in applications.
status: unstable
links:
  apiReference: /reference/structures/Toolbar
---

::example{src="structures/Toolbar.default"}

The **Toolbar** component groups related interactive elements together. It follows the [ARIA Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) for reducing the number of tab stops.

Use the [`render`](/reference/structures/Toolbar#Toolbar.Item.render) prop of the [`Toolbar.Item`](/reference/structures/Toolbar#Toolbar.Item) component to display individual items within the toolbar.

## Examples

### Divider

Use the [**Divider**](/components/divider/) component to visually and semantically separate groups of items within the toolbar.

::example{src="structures/Toolbar.divider"}

:::note[Divider orientation]

The divider should be perpendicular to the **Toolbar**. [Reorientate](/components/divider/#orientation) it when changing the **Toolbar's** [orientation](#orientation).

:::

### Orientation

By default, the **Toolbar** is horizontal. Use the [`orientation`](/reference/structures/Toolbar#Toolbar.Group.orientation) prop to change it to vertical.

Additionally, adjust tooltip placement to avoid overlapping the **Toolbar** and make the [divider perpendicular](#divider).

::example{src="structures/Toolbar.vertical" min-height="250px"}

In the example above, `labelPlacement="right"` is set on [**IconButtons**](/components/iconbutton/) and the **Divider** retains its default horizontal orientation.

### ToggleButton

In the example below, one of the toolbar items is rendered as a [**ToggleButton**](/components/togglebutton/).

::example{src="structures/Toolbar.toggle"}

### Menu

In the example below, the toolbar item for selecting the font family is using a [**Menu**](/components/menu/). Menu items use [`role="menuitemradio"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menuitemradio_role), since only one font family can be selected at a time.

::example{src="structures/Toolbar.menu" min-width="300px"}
