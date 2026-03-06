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
- The radio implementation and styling differ from the default `svg` approach and use custom pseudo-elements.
- The interactive hit area extends beyond the visual bounds of the radio. The additional hit area does not consume layout space, so be mindful when placing the radio next to adjacent elements or container boundaries.
- Includes full `forced-colors` support.

## Examples

### Error

::example{src="mui/RadioGroup.error"}
