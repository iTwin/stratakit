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

| Use case                                                     | [NavigationRail](/components/navigationrail) | [AppBar](/components/appbar) | [BottomNavigation](/components/bottomnavigation) | [Pagination](/components/pagination) | [List](/components/list) |
| ------------------------------------------------------------ | -------------------------------------------- | ---------------------------- | ------------------------------------------------ | ------------------------------------ | ------------------------ |
| Persistent, application-wide navigation and functionality    | ✅                                           | ❌                           | ❌                                               | ❌                                   | ❌                       |
| Information and actions about the current screen only        | ❌                                           | ✅                           | ❌                                               | ❌                                   | ❌                       |
| Navigating between primary application views                 | ❌                                           | ❌                           | ✅                                               | ❌                                   | ❌                       |
| Navigating queried data, such as the results of a search     | ❌                                           | ❌                           | ❌                                               | ✅                                   | ❌                       |
| Grouping generic items of content and making them enumerable | ❌                                           | ❌                           | ❌                                               | ❌                                   | ✅                       |

## Structure

**NavigationRail** is divided into three main sections:

- [`NavigationRail.Header`](#navigationrailheader)
- [`NavigationRail.Content`](#navigationrailcontent)
- [`NavigationRail.Footer`](#navigationrailfooter)

These are used to create the following basic structure. Note that `NavigationRail.Footer` is nested inside `NavigationRail.Content`.

```jsx
<NavigationRail.Root>
	<NavigationRail.Header>...</NavigationRail.Header>
	<NavigationRail.Content>
		...
		<NavigationRail.Footer>...</NavigationRail.Footer>
	</NavigationRail.Content>
</NavigationRail.Root>
```

### [NavigationRail.Header](/reference/structures/NavigationRail#NavigationRail.Header)

This is for the application branding and [`NavigationRail.ToggleButton`](/reference/structures/NavigationRail#NavigationRail.ToggleButton), for expanding the rail and revealing full text labels for the navigation options.

```jsx
<NavigationRail.Header>
	<Icon alt="Acme app" href={`${svgBentley}#icon-large`} size="large" />
	<NavigationRail.ToggleButton />
</NavigationRail.Header>
```

### [NavigationRail.Content](/reference/structures/NavigationRail#NavigationRail.Content)

The `NavigationRail.Content` component houses a number of [interactive navigation components](#interaction). These can each be one of [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor) or [`NavigationRail.Button`](/reference/structures/NavigationRail#NavigationRail.Button).

You can group related navigation components using the [`NavigationRail.List`](/reference/structures/NavigationRail#NavigationRail.List) and [`NavigationRail.ListItem`](/reference/structures/NavigationRail#NavigationRail.ListItem) components. Place a [**Divider**](/components/divider/) between groups for clear visual demarcation.

```jsx
<NavigationRail.Content>
	<NavigationRail.List>
		<NavigationRail.ListItem>...</NavigationRail.ListItem>
		<NavigationRail.ListItem>...</NavigationRail.ListItem>
		<NavigationRail.ListItem>...</NavigationRail.ListItem>
	</NavigationRail.List>
	<Divider role="presentation" />
	<NavigationRail.List>
		<NavigationRail.ListItem>...</NavigationRail.ListItem>
		<NavigationRail.ListItem>...</NavigationRail.ListItem>
	</NavigationRail.List>
	<Divider role="presentation" />
	<NavigationRail.Anchor>...</NavigationRail.Anchor>

	<NavigationRail.Footer>...</NavigationRail.Footer>
</NavigationRail.Content>
```

Note the _standalone_ [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor). Not all items belong to groups.

:::note[Presentational dividers]

Note that the [**Divider**](/components/divider/) takes `role="presentation"`. The closing of one list and the opening of the next is already determinable. An explicit `role="separator"` element is not needed.

See the [presentational dividers](/components/divider/#presentational-dividers) section in the **Divider** guide.

:::

### [NavigationRail.Footer](/reference/structures/NavigationRail#NavigationRail.Footer)

Any supplementary items, such as settings or account preferences, should be placed in the `Footer`. The same grouping rules apply.

```jsx
<NavigationRail.Footer>
	<NavigationRail.List>
		<NavigationRail.ListItem>
			<NavigationRail.Button icon={`${svgSettings}#icon-large`} label="Settings" />
		</NavigationRail.ListItem>
		<NavigationRail.ListItem>
			<NavigationRail.Anchor icon={`${svgAccount}#icon-large`} label="Account" />
		</NavigationRail.ListItem>
	</NavigationRail.List>
</NavigationRail.Footer>
```

## Interaction

Choose a [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor) or [`NavigationRail.Button`](/reference/structures/NavigationRail#NavigationRail.Button), depending on the type of interaction.

| Component                                                                             | Interaction                                          |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor) | Navigation between screens                           |
| [`NavigationRail.Button`](/reference/structures/NavigationRail#NavigationRail.Button) | Action on the current screen (e.g. opening a dialog) |

[`NavigationRail.ListItem`](/reference/structures/NavigationRail#NavigationRail.ListItem) is not itself interactive. It houses either a [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor) or a [`NavigationRail.Button`](/reference/structures/NavigationRail#NavigationRail.Button).

### The `active` prop

Mark a [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor)’s current link destination with the [`active`](/reference/structures/NavigationRail#NavigationRail.Anchor.active) prop. This prop is not supported on [`NavigationRail.Button`](/reference/structures/NavigationRail#NavigationRail.Button).

:::caution[Routing]

Each [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor) must take the user to a separate screen belonging to the application. Each screen/page must have a [unique title](/guides/language-and-labels/#the-page-title). If you are using a single-page application architecture, the `<title>` will have to be updated dynamically. When the new screen is rendered, keyboard focus must be relocated. Typically, this will be to the `<h1>` heading of the new screen, giving context to screen reader users.

Your router component may implement some of these behaviors for you.

:::

### The `suffix` prop

Use the [`suffix`](/reference/structures/NavigationRail#NavigationRail.Anchor.suffix) prop to display additional information. For example, for items that open in a new tab, render an icon with the alternate text "(opens in a new tab)".

```jsx
<NavigationRail.Anchor suffix="(opens in a new tab)">Help</NavigationRail.Anchor>
```

## Examples

### Comprehensive

Combine **NavigationRail** with other components to create a more complex navigation experience.

In the example below:

- The [`NavigationRail.Root`](/reference/structures/NavigationRail/#NavigationRail.Root) state is controlled via the [`expanded`](/reference/structures/NavigationRail#NavigationRail.Root.expanded) and [`setExpanded`](/reference/structures/NavigationRail#NavigationRail.Root.setExpanded) props, enabling conditional rendering based on whether the rail is expanded or collapsed.
- The [**Badge**](/components/badge/) component is used to display a notification indicator for the "Notifications" item.
  - When the rail is collapsed, a dot badge is shown next to the icon. The [`suffix`](/reference/structures/NavigationRail/#NavigationRail.Button.suffix) prop is used to display the notification count via the tooltip, so that the resulting tooltip reads "Notifications (3)".
  - When the rail is expanded, an [inline badge](/components/badge/#inline) with the notification count "3" is displayed next to the label via the `suffix` prop.
  - In both states, the `suffix` prop contributes to the accessible name by adding a "(3 unread)" message, resulting in the accessible name "Notifications (3 unread)".
- The [**Menu**](/components/menu/) component is used to expose multiple related actions for the "Account" item.

::example{src="structures/NavigationRail.comprehensive" min-height="450px" min-width="450px" vertical-stretch}

## ✅ Do

- Include a [`NavigationRail.Header`](/reference/structures/NavigationRail#NavigationRail.Header), [`NavigationRail.Content`](/reference/structures/NavigationRail#NavigationRail.Content), and [`NavigationRail.Footer`](/reference/structures/NavigationRail#NavigationRail.Footer), in that order.
- Organize related items into [`NavigationRail.List`s](/reference/structures/NavigationRail#NavigationRail.List) separated by presentational [**Dividers**](/components/divider/).
- Use the [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor) and [`NavigationRail.Button`](/reference/structures/NavigationRail#NavigationRail.Button) components for navigational items.
- Use [`NavigationRail.Button`](/reference/structures/NavigationRail#NavigationRail.Button) for any items that do not navigate the user away from the current screen.

## 🚫 Don't

- Don't insert [**Dividers**](/components/divider/) between [`NavigationRail.ListItem`s](/reference/structures/NavigationRail#NavigationRail.ListItem).
- Don't place important navigation items in [`NavigationRail.Footer`](/reference/structures/NavigationRail#NavigationRail.Footer).
- Don't make multiple [`NavigationRail.Anchor`](/reference/structures/NavigationRail#NavigationRail.Anchor)s `active` at the same time.
