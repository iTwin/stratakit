---
title: Autocomplete
description: Autocomplete inputs are used to provide suggestions while users type.
links:
  muiDocs: https://mui.com/material-ui/react-autocomplete/
  apiReference: https://mui.com/material-ui/api/autocomplete/
---

::example{src="mui/Autocomplete.default"}

## StrataKit MUI modifications

- Restyled using StrataKit's visual language.
- The "clear" indicator is now keyboard focusable and remains visible to improve accessibility.
- Autocomplete menu matches the visual styling of [`Menu`](menu), with individual Autocomplete options using the `MuiMenuItem-root` class via `renderOption`.

## Examples

### Multiple values

::example{src="mui/Autocomplete.multiple"}
