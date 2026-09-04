---
title: Dialog
description: Dialogs are used to display additional actions and information on a floating surface.
links:
  muiDocs: https://mui.com/material-ui/react-dialog/
  apiReference: https://mui.com/material-ui/api/dialog/
---

::example{src="mui/Dialog.default"}

## StrataKit MUI modifications

- Restyled using StrataKit's visual language.
- The default [`container`](https://mui.com/material-ui/api/modal/#modal-prop-container) now resolves from StrataKit's portal context, which defaults to [root portal container](/components/root/#portal-container).
- Nested popup elements now use the **Dialog** as the portal container.
- The `PaperComponent` prop is not supported.
- The `dividers` prop of `DialogContent` is not supported.
