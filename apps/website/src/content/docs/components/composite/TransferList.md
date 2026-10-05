---
title: Transfer list
description: Enables the user to move one or more list items between lists.
links:
  muiDocs: https://mui.com/material-ui/react-transfer-list/
---

::example{src="composite/TransferList.default"}

This example is adapted from the [MUI documentation for TransferList](https://mui.com/material-ui/react-transfer-list/) with minor modifications.

## Use cases

A **transfer list** enables the user to move one or more list items between lists.

| Use case                                            | Transfer list | Single list with checkboxes |
| --------------------------------------------------- | ------------- | --------------------------- |
| Identifying items that meet a yes/no criteria       | ❌            | ✅                          |
| Classifying items as one of two possible named sets | ✅            | ❌                          |

## Structure

A **transfer list** consists of:

- Two [listboxes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/listbox_role) representing two non-overlapping sets.
- A group of buttons to move the selected items in one set to the other set.

## API reference

- [`IconButton`](https://mui.com/material-ui/api/icon-button/)
- [`Grid`](https://mui.com/material-ui/api/grid)
- [`ListItemText`](https://mui.com/material-ui/api/list-item-text/)
- [`MenuItem`](https://mui.com/material-ui/api/menu-item/)
- [`MenuList`](https://mui.com/material-ui/api/menu-list/)
- [`Paper`](https://mui.com/material-ui/api/paper/)
- [`Stack`](https://mui.com/material-ui/api/stack/)
- [`Typography`](https://mui.com/material-ui/api/typography)
