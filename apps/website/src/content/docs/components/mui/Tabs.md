---
title: Tabs
description: Tabs are used to alternate between views.
links:
  muiDocs: https://mui.com/material-ui/react-tabs/
  apiReference: https://mui.com/material-ui/api/tabs/
---

::example{src="mui/Tabs.default"}

## StrataKit MUI modifications

- `<Tabs>` does not support the `indicatorColor` prop.
- `<Tabs>` `textColor="inherit"` has been removed.
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

Use a [**Tooltip**](/components/tooltip) when a tab has an icon only and no label.

::example{src="mui/Tabs.icon-only"}

### Scrollable

::example{src="mui/Tabs.scrollable"}
