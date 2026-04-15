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
- The listbox now matches the visual styling of [`Menu`](/components/menu), with individual options using the `MuiMenuItem-root` class via a theme-level [`renderOption`](https://mui.com/material-ui/api/autocomplete/#autocomplete-prop-renderOption) prop.
- Added [role="group"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/group_role) to the root element.

## Examples

### Multiple values

::example{src="mui/Autocomplete.multiple"}
