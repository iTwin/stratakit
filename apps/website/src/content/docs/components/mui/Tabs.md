---
title: Tabs
description: Tabs are used to alternate between views.
links:
  muiDocs: https://mui.com/material-ui/react-tabs/
  apiReference: https://mui.com/material-ui/api/tabs/
---

::example{src="mui/Tabs.default"}

## StrataKit MUI modifications

- Added [`size`](#sizes) prop.
- `<Tabs>` does not support the `indicatorColor` prop.
- `<Tabs>` does not support `textColor="inherit"`.
- `<Tabs>` does not support `allowScrollButtonsMobile` or `scrollButtons`. Scroll buttons are automatically shown for mouse users and hidden for touch users.
- `<Tab>` default value for `iconPosition` is now `"start"`.
- The `action` prop of `Tab` is not supported.
- Ripple effect removed from `Tab`. The `centerRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `TouchRippleProps` and `touchRippleRef` props are not supported.
- Restyled using StrataKit's visual language.
- Includes full `forced-colors` support.
- StrataKit does not support use of `TabScrollButton`. The scroll buttons are handled automatically when `variant="scrollable"`.

## Examples

### Colors

Use the `textColor` prop to set the tabs theme.

- **Primary:** The default.
- **Secondary:** Use when less emphasis is required.

::example{src="mui/Tabs.colors"}

### Icons

An [**Icon**](/components/icon) can accompany a tab. The position of the icon be changed using the [`iconPosition` prop](https://mui.com/material-ui/api/tab/#tab-prop-iconPosition).

::example{src="mui/Tabs.icon"}

Use a [**Tooltip**](/components/tooltip) with `describeChild={false}` when a tab has an icon only and no label.

::example{src="mui/Tabs.icon-only"}

### Scrollable

When there are too many tabs, the tab list becomes scrollable. A fade indicates additional content, and scroll buttons appear for mouse users.

::example{src="mui/Tabs.scrollable"}

### Sizes

- **Small:** Use in compact interfaces where space is limited.
- **Medium:** Default size, suitable for most use cases.

::example{src="mui/Tabs.sizes"}
