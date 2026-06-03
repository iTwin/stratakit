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
- `<Tab>` default value for `iconPosition` is now `"start"`.
- Restyled using StrataKit's visual language.
- Includes full `forced-colors` support.

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

::example{src="mui/Tabs.scrollable"}

### Sizes

- **Small:** Use in compact interfaces where space is limited.
- **Medium:** Default size, suitable for most use cases.
- **Large:** Use in spacious layouts where more prominent tabs are needed.

::example{src="mui/Tabs.sizes"}
