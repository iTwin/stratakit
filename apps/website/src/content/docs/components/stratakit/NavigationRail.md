---
title: NavigationRail
description: Navigation rails are used for primary navigation in an app.
status: unstable
links:
  apiReference: /reference/structures/NavigationRail
---

::example{src="structures/NavigationRail.default" min-height="450px" min-width="450px" vertical-stretch}

The **NavigationRail** component provides a persistent and convenient way to navigate between primary destinations in an application. It is designed to present the top-level navigation in a vertical orientation that is always visible on the left side of the screen.

## Use cases

Make sure the **NavigationRail** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                                  | [NavigationRail](/components/navigationrail) | [AppBar](/components/appbar) | [BottomNavigation](/components/bottomnavigation) | [Pagination](/components/pagination) |
| --------------------------------------------------------- | -------------------------------------------- | ---------------------------- | ------------------------------------------------ | ------------------------------------ |
| Persistent, application-wide navigation and functionality | ✅                                           | ❌                           | ❌                                               | ❌                                   |
| Information and actions about the current screen only     | ❌                                           | ✅                           | ❌                                               | ❌                                   |
| Navigating between primary application views              | ❌                                           | ❌                           | ✅                                               | ❌                                   |
| Navigating queried data, such as the results of a search  | ❌                                           | ❌                           | ❌                                               | ✅                                   |

## Structure

**NavigationRail** is divided into three sections:

- [`NavigationRail.Header`](/reference/structures/NavigationRail#NavigationRail.Header): For the application branding and [`NavigationRail.ToggleButton`](/reference/structures/NavigationRail#NavigationRail.ToggleButton), for expanding the rail and revealing full text labels for the navigation options.
- [`NavigationRail.Content`](/reference/structures/NavigationRail#NavigationRail.Content): For principle destinations; the main screens of the application.
- [`NavigationRail.Footer`](/reference/structures/NavigationRail#NavigationRail.Footer): For secondary, supplementary destinations such as settings and account preferences.

Group related destinations using the [`NavigationRail.List`](/reference/structures/NavigationRail#NavigationRail.List) and [`NavigationRail.ListItem`](/reference/structures/NavigationRail#NavigationRail.ListItem) components. Place a [**Divider**](/components/divider/) between instances of `Navigation.List` for clear visual demarcation.

```jsx
<NavigationRail.List>
  ...
</NavigationRail.List>
<Divider
  className={styles.divider}
  role="presentation"
/>
<NavigationRail.List>
  ...
</NavigationRail.List>
```

:::note[Presentational dividers]

Note that the [**Divider**](/components/divider/) takes `role="presentation"`. The closing of one list and the opening of the next is already determinable. An explicit `role="separator"` element is not needed.

See the [presentational dividers](https://stratakit.bentley.com/docs/components/divider/#presentational-dividers) section in the **Divider** guide.

:::

## Interaction

Each [`NavigationRail.ListItem`](/reference/structures/NavigationRail#NavigationRail.ListItem) must take either a [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor) or a [`NavigationRail.Button`](/reference/structures/NavigationRail#NavigationRail.Button), depending on the type of interaction.

| Component                                                                             | Interaction                                          |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor) | Navigation between screens                           |
| [`NavigationRail.Button`](/reference/structures/NavigationRail#NavigationRail.Button) | Action on the current screen (e.g. opening a dialog) |

Mark the current link destination with the [`active`](/reference/structures/NavigationRail#NavigationRail.Anchor.active) prop. Use the [`suffix`](/reference/structures/NavigationRail#NavigationRail.Anchor.suffix) prop to display additional information. For example, for items that open in a new tab, render an icon with the alternate text "(opens in new tab)".

:::caution[Routing]

Each [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor) must take the user to a separate screen belonging to the application. Each screen/page must have a unique `<title>`. If you are using a single-page application architecture, the `<title>` will have to be updated dynamically. Your router component may do this for you already.

:::

## Examples

### Comprehensive

Combine **NavigationRail** with other components to create a more complex navigation experience.

::example{src="structures/NavigationRail.comprehensive" min-height="450px" min-width="450px" vertical-stretch}

- The [`NavigationRail.Root`](/reference/structures/NavigationRail/#NavigationRail.Root) state is controlled via the [`expanded`](/reference/structures/NavigationRail#NavigationRail.Root.expanded) and [`setExpanded`](/reference/structures/NavigationRail#NavigationRail.Root.setExpanded) props, enabling conditional rendering based on whether the rail is expanded or collapsed.
- The [**Badge**](/components/badge/) component is used to display a notification indicator for the "Notifications" item.
  - When the rail is collapsed, a dot badge is shown next to the icon. The [`suffix`](/reference/structures/NavigationRail/#NavigationRail.Button.suffix) prop is used to display the notification count via the tooltip, so that the resulting tooltip reads "Notifications (3)".
  - When the rail is expanded, an [inline badge](/components/badge/#inline) with the notification count "3" is displayed next to the label via the `suffix` prop.
  - In both states, the `suffix` prop contributes to the accessible name by adding a "(3 unread)" message, resulting in the accessible name "Notifications (3 unread)".
- The [**Menu**](/components/menu/) component is used to expose multiple related actions for the "Account" item.

## ✅ Do

- Include a [`NavigationRail.Header`](/reference/structures/NavigationRail#NavigationRail.Header), [`NavigationRail.Content`](/reference/structures/NavigationRail#NavigationRail.Content), and [`NavigationRail.Footer`](/reference/structures/NavigationRail#NavigationRail.Footer), in that order.
- Organize related items into [`NavigationRail.List`s](/reference/structures/NavigationRail#NavigationRail.List) separated by [**Dividers**](/components/divider/).
- Use [`NavigationRail.Button`](/reference/structures/NavigationRail#NavigationRail.Button) for any items that do not navigate the user away from the current screen.

## 🚫 Don't

- Include interactive components other than [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor) or [`NavigationRail.Button`](/reference/structures/NavigationRail#NavigationRail.Button) in [`NavigationRail.ListItem`](/reference/structures/NavigationRail#NavigationRail.ListItem).
- Insert [**Dividers**](/components/divider/) between [`NavigationRail.ListItem`s](/reference/structures/NavigationRail#NavigationRail.ListItem).
- Place important navigation links in [`NavigationRail.Footer`](/reference/structures/NavigationRail#NavigationRail.Footer)
