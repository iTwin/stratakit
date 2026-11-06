---
title: Dialog
description: Dialogs are used to display additional actions and information on a floating surface.
links:
  muiDocs: https://mui.com/material-ui/react-dialog/
  apiReference: "#api-reference"
---

::example{src="mui/Dialog.default"}

## StrataKit MUI modifications

- Restyled using StrataKit's visual language.
- Added `slotProps.header` to `DialogTitle` for customizing the [header element](#header).
- Added `actions` prop to `DialogTitle` for displaying [header actions](#header-actions).
- The default [`container`](https://mui.com/material-ui/api/modal/#modal-prop-container) now resolves from StrataKit's portal context, which defaults to [root portal container](/components/root/#portal-container).
- Nested popup elements now use the **Dialog** as the portal container.
- The `PaperComponent` prop is not supported.
- The `dividers` prop of `DialogContent` is not supported.

## Examples

### Confirmation

Dialogs that guard sensitive actions and warrant explicit user confirmation should only close when the user interacts with the dialog's primary actions. Check the `reason` argument of the [`onClose`](https://mui.com/material-ui/api/dialog/#dialog-prop-onClose) prop to prevent the **Dialog** from closing when the backdrop is clicked or the escape key is pressed. Additionally, avoid displaying a dismiss button within the **Dialog** header.

::example{src="mui/Dialog.confirmation"}

### Header

The header element is rendered only when [header actions](#header-actions) are provided. It wraps the title and header actions of the **Dialog**. Use the `slotProps.header` of `DialogTitle` to customize it.

```tsx
slotProps={{
  header: {
    className: "draggable-header",
    onPointerDown: handlePointerDown,
  },
}}
```

### Header actions

Use the `actions` prop of `DialogTitle` to display additional actions within the **Dialog** header. Most commonly, this is used to provide a dismiss button, but it can accommodate multiple controls relevant to the **Dialog**.

::example{src="mui/Dialog.header-actions"}

## API reference

- [`Dialog`](https://mui.com/material-ui/api/dialog/)
- [`DialogTitle`](https://mui.com/material-ui/api/dialog-title/)
- [`DialogContent`](https://mui.com/material-ui/api/dialog-content/)
- [`DialogContentText`](https://mui.com/material-ui/api/dialog-content-text/)
- [`DialogActions`](https://mui.com/material-ui/api/dialog-actions/)
