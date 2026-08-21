---
title: Menu
description: Dropdown menus are used to display a list of quick actions in a floating surface.
links:
  muiDocs: https://mui.com/material-ui/react-menu/
  apiReference: https://mui.com/material-ui/api/menu/
---

::example{src="mui/Menu.default"}

## StrataKit MUI modifications

- Restyled using StrataKit's visual language.
- Removed [`role="dialog"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role) semantics from the [`paper`](https://mui.com/material-ui/api/menu/#Menu-css-MuiMenu-paper) slot.
- Added fallback mechanism for automatically labelling the [`list`](https://mui.com/material-ui/api/menu/#Menu-css-MuiMenu-list) slot using the trigger element (`anchorEl`).
- Includes full `forced-colors` support.
- `disableScrollLock` is used to prevent scroll locking when the menu is open.
- The default [`container`](https://mui.com/material-ui/api/modal/#modal-prop-container) now resolves from StrataKit's portal context, which defaults to [`portalContainer`](https://stratakit.bentley.com/docs/components/root/#portal-container).

## Examples

### Dense

Pass the [`dense`](https://mui.com/material-ui/api/list/#list-prop-dense) prop through [`slotProps.list`](https://mui.com/material-ui/api/menu/#menu-prop-slotProps) to make the **Menu** smaller. This is useful when space is limited, or when the **Menu** is triggered by a small button.

The `dense` prop is also available via [`MenuList`](https://mui.com/material-ui/api/menu-list/).

::example{src="mui/Menu.dense"}

## Selectable

To make `MenuItem`s selectable, override the default `role` to either:

- [`role="menuitemradio"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menuitemradio_role) when only one item within a group is selectable
- [`role="menuitemcheckbox"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/menuitemcheckbox_role) when the items are individually selectable.

With the appropriate role in place, use [`aria-checked="true"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-checked) and the [`selected`](https://mui.com/material-ui/api/menu-item/#menu-item-prop-selected) prop to mark the selected item(s).

::example{src="mui/Menu.selectable"}

:::caution[Labelling the menu button]

Make sure the triggering button starts with a predictable label that stays consistent regardless of the selected item. In the example above, the text "Sort by:" remains stable, while the text following it changes based on the selected item. This allows assistive technology users to easily find and operate the menu button.

:::
