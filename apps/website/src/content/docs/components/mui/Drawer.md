---
title: Drawer
description: Drawers are used to display navigation in a sliding panel.
links:
  muiDocs: https://mui.com/material-ui/react-drawer/
  apiReference: https://mui.com/material-ui/api/drawer/
---

::example{src="mui/Drawer.default"}

## StrataKit MUI modifications

- The default portal container is now the [root portal container](/components/root/#portal-container).
- The default [`container`](https://mui.com/material-ui/api/modal/#modal-prop-container) now resolves from StrataKit's portal context, which defaults to [`portalContainer`](https://stratakit.bentley.com/docs/components/root/#portal-container).

## Examples

### SwipeableDrawer

::example{src="mui/SwipeableDrawer.default"}
