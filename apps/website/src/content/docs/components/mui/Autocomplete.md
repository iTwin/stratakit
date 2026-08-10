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
- Added [`role="group"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/group_role) to the root element.
- Added [`role="list"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/list_role) and [`role="listitem"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/listitem_role) semantics to [**Chips**](/components/chip) ("tags") used in [multiple selection](#multiple-values).
- Tags are now focusable. Input is the first focusable element, followed by tags in the order they were added.
- The default portal container is now the [root portal container](/components/root/#portal-container).
- The icons is not customizable. `clearIcon`, `popupIcon` and `forcePopupIcon` are not supported.

## Examples

### Multiple values

::example{src="mui/Autocomplete.multiple"}

### Sizes

- **Small:** Use in compact interfaces where space is limited.
- **Medium:** Default size, suitable for most use cases.

::example{src="mui/Autocomplete.sizes"}
