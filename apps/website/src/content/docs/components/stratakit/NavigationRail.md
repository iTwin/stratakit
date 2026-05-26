---
title: NavigationRail
description: Navigation rails are used for primary navigation in an app.
status: unstable
links:
  apiReference: /reference/structures/NavigationRail
---

::example{src="structures/NavigationRail.default" min-height="450px" min-width="450px" vertical-stretch}

The **NavigationRail** component provides a persistent and convenient way to navigate between primary destinations in an application. It is designed to present the top-level navigation in a vertical orientation that is always visible on the left side of the screen.

## Examples

### Comprehensive

Combine **NavigationRail** with other components to create a more complex navigation experience.

In the example below:

- The [**Badge**](/components/badge/) component is used to display a notification indicator for the "Notifications" item. When the rail is collapsed, a dot badge is shown near the icon. When expanded, the badge count is displayed inline next to the label using the [`suffix`](https://stratakit.bentley.com/docs/reference/structures/NavigationRail/#NavigationRail.Anchor.suffix) prop.
- The [**Menu**](/components/menu/) component is used to expose multiple actions for the "Account" item.

::example{src="structures/NavigationRail.comprehensive" min-height="450px" min-width="450px" vertical-stretch}
