---
title: Radio
description: Radio buttons are for choosing one of multiple predefined inputs.
links:
  muiDocs: https://mui.com/material-ui/react-radio-button/
  apiReference: https://mui.com/material-ui/api/radio/
---

::example{src="mui/RadioGroup.default"}

## StrataKit modifications

- The `color` prop is not supported. Color is determined automatically based on state (e.g., checked, disabled, error).
- The `size` prop does not support `small` and defaults to `medium`.
- The radio implementation differs from the default `svg` approach and uses custom pseudo-elements.
- Includes full `forced-colors` support.

## Examples

### Error

::example{src="mui/RadioGroup.error"}
