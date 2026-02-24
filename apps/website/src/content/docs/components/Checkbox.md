---
title: Checkbox
description: Checkboxes are for confirming a predefined input.
links:
  muiDocs: https://mui.com/material-ui/react-checkbox/
  apiReference: https://mui.com/material-ui/api/checkbox/
---

::example{src="mui/Checkbox.default"}

## StrataKit modifications

- The `color` prop is not supported. Color is determined automatically based on state (e.g., checked, disabled, error).
- The `icon` prop is not supported.
- The `size` prop does not support `small` or `large` and defaults to `medium`.
- The checkbox implementation differs from the default `svg` approach and uses custom pseudo-elements.
- The touch target does not consume layout space. Be mindful when placing the checkbox next to adjacent elements or container boundaries.
- Includes full `forced-colors` support.

## Examples

### Checked

::example{src="mui/Checkbox.checked"}

### Indeterminate

::example{src="mui/Checkbox.indeterminate"}

### Group

::example{src="mui/FormControl.group"}

### Error

::example{src="mui/FormControl.error"}
