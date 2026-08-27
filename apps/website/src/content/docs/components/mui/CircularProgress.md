---
title: CircularProgress
description: Progress indicators are used to display a loading state or visualize the progress of an operation.
links:
  muiDocs: https://mui.com/material-ui/react-progress/
  apiReference: https://mui.com/material-ui/api/circular-progress/
---

::example{src="mui/CircularProgress.default"}

## StrataKit MUI modifications

- The `color` prop does not support `"inherit"` or `"info"`.
- The `disableShrink`, `enableTrackSlot`, and `thickness` props are not supported.
- Restyled using StrataKit's visual language.
- Includes full `forced-colors` support.

## Examples

### Colors

- **Primary:** The default. Use when indicating the primary loading state on a page.
- **Secondary:** Use when indicating a secondary loading state or when multiple loading states are shown at once.

::example{src="mui/CircularProgress.colors"}

### Determinate

Set the `variant` prop to `"determinate"` when the completion percentage is known.

::example{src="mui/CircularProgress.determinate"}
