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

### Scrollable

::example{src="mui/Tabs.scrollable"}
