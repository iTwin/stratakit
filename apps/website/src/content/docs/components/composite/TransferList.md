---
title: Transfer List
description: Enables the user to move one or more list items between lists.
links:
  muiDocs: https://mui.com/material-ui/react-transfer-list/
---

::example{src="composite/TransferList.default"}

This example is taken from the [MUI documentation for TransferList](https://mui.com/material-ui/react-transfer-list/) with only minor modifications.

### StrataKit Modifications

- Removing non-supported props.
- Use StrataKit icons instead of text for chevrons.
- Adding `elevation` to `Paper` to provide explicit visual grouping.

## Use Cases

A Transfer list enables the user to move one or more list items between lists.

| Use case                                                   | Transfer List | Single list with checkboxes |
| ---------------------------------------------------------- | ------------- | --------------------------- |
| Identifying which items should be included in a single set | ❌            | ✅                          |
| Classifying items as one of two possible named sets        | ✅            | ❌                          |

## Anatomy

A Transfer list consists of:

- Two lists representing two non-overlapping sets.
- Buttons to move the selected items in one set to the other set.

It may also include buttons to move all items from one set to the other set if that is a typical action the user may do.
