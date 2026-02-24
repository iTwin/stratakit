---
title: Radio
description: Radio buttons are for choosing one of multiple predefined inputs.
links:
  muiDocs: https://mui.com/material-ui/react-radio-button/
  apiReference: https://mui.com/material-ui/api/radio/
---

::example{src="mui/RadioGroup.default"}

## StrataKit MUI modifications

- The `color` prop is not supported. Color is determined automatically based on state (e.g., checked, disabled, error).
- The `size` prop defaults to `"medium"` and does not support `"small"`.
- The radio implementation differs from the default `svg` approach and uses custom pseudo-elements.
- The touch target does not consume layout space. Be mindful when placing the checkbox next to adjacent elements or container boundaries.
- Includes full `forced-colors` support.

## Examples

### Error

::example{src="mui/RadioGroup.error"}
