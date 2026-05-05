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

### ToggleButton

In the example below, one of the toolbar items is rendered as a [**ToggleButton**](/components/togglebutton/).

::example{src="structures/Toolbar.toggle"}
