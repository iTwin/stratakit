---
title: LinearProgress
description: Progress indicators are used to display a loading state or visualize the progress of an operation.
links:
  muiDocs: https://mui.com/material-ui/react-progress/
  apiReference: https://mui.com/material-ui/api/linear-progress/
---

::example{src="mui/LinearProgress.default" min-width="300px"}

## StrataKit MUI modifications

- The `color` prop does not support `"inherit"` or `"info"`.
- Added an end marker when the `variant` prop is set to `"determinate"` or `"buffer"`.
- Restyled using StrataKit's visual language.
- Includes full `forced-colors` support.

## Examples

### Colors

- **Primary:** The default. Use when indicating the primary loading state on a page.
- **Secondary:** Use when indicating a secondary loading state or when multiple loading states are shown at once.

::example{src="mui/LinearProgress.colors" min-width="300px"}

### Determinate

Set the `variant` prop to `"determinate"` when the completion percentage is known.

::example{src="mui/LinearProgress.determinate" min-width="300px"}

### Buffer

Set the `variant` prop to `"buffer"` when progress and buffered work are tracked separately.

::example{src="mui/LinearProgress.buffer" min-width="300px"}
