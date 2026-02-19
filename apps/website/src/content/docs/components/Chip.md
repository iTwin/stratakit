---
title: Chip
description: Chips are used to filter content or trigger actions.
links:
  muiDocs: https://mui.com/material-ui/react-chip/
  apiReference: https://mui.com/material-ui/api/chip/
---

::example{src="mui/Chip.default"}

## StrataKit modifications of MUI

- The root element is no longer interactive. Instead, a deletable **Chip** now renders an interactive delete button, and a clickable **Chip** renders its label as an interactive button.
- Added a `deleteLabel` prop to provide an accessible label for the delete button.

## Examples

### Outlined

::example{src="mui/Chip.outlined"}

### Clickable

::example{src="mui/Chip.clickable"}

### Deletable

::example{src="mui/Chip.deletable"}
