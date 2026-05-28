---
title: NavigationRail
description: Navigation rails are used for primary navigation in an app.
status: unstable
links:
  apiReference: /reference/structures/NavigationRail
---

::example{src="structures/NavigationRail.default" min-height="450px" min-width="450px" vertical-stretch}

The **NavigationRail** component provides a persistent and convenient way to navigate between primary destinations in an application. It is designed to present the top-level navigation in a vertical orientation that is always visible on the left side of the screen.

Place the application branding in the [`NavigationRail.Header`](/reference/structures/NavigationRail#NavigationRail.Header) alongside the [`NavigationRail.ToggleButton`](/reference/structures/NavigationRail#NavigationRail.ToggleButton), which allows users to expand or collapse the rail. Render the primary destinations in the [`NavigationRail.Content`](/reference/structures/NavigationRail#NavigationRail.Content). Stick secondary destinations, such as settings or account preferences, to the bottom of the **NavigationRail** using the [`NavigationRail.Footer`](/reference/structures/NavigationRail#NavigationRail.Footer).

Group related destinations using the [`NavigationRail.List`](/reference/structures/NavigationRail#NavigationRail.List) and [`NavigationRail.ListItem`](/reference/structures/NavigationRail#NavigationRail.ListItem) components. Additionally, use the [**Divider**](/components/divider/) to visually separate destinations.

Use the [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor) for links and the [`NavigationRail.Button`](/reference/structures/NavigationRail#NavigationRail.Button) for actions. Mark the current link destination with the [`active`](/reference/structures/NavigationRail#NavigationRail.Anchor.active) prop. Use the [`suffix`](/reference/structures/NavigationRail#NavigationRail.Anchor.suffix) prop to display additional information — for example, for items that open in a new tab, render an icon with the alternate text "(opens in new tab)".

## Examples

### Comprehensive

Combine **NavigationRail** with other components to create a more complex navigation experience.

In the example below:

- The [`NavigationRail.Root`](/reference/structures/NavigationRail/#NavigationRail.Root) state is controlled via the [`expanded`](/reference/structures/NavigationRail#NavigationRail.Root.expanded) and [`setExpanded`](/reference/structures/NavigationRail#NavigationRail.Root.setExpanded) props, enabling conditional rendering based on whether the rail is expanded or collapsed.
- The [**Badge**](/components/badge/) component is used to display a notification indicator for the "Notifications" item.
  - When the rail is collapsed, a dot badge is shown near the icon. The [`suffix`](/reference/structures/NavigationRail/#NavigationRail.Button.suffix) prop is used to expose the notification count via the tooltip, so that the resulting tooltip reads "Notifications (3)".
  - When the rail is expanded, an [inline badge](/components/badge/#inline) with the notification count "3" is displayed next to the label via the `suffix` prop.
  - For both collapsed and expanded states, the `suffix` prop adds a "(3 unread)" message, resulting in the final accessible name of the button being "Notifications (3 unread)".
- The [**Menu**](/components/menu/) component is used to expose multiple related actions for the "Account" item.

::example{src="structures/NavigationRail.comprehensive" min-height="450px" min-width="450px" vertical-stretch}
