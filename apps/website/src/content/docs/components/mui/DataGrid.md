---
title: DataGrid
description: A fast and extensible React data table and React data grid, with filtering, sorting, aggregation, and more.
links:
  muiDocs: https://mui.com/x/react-data-grid/
  apiReference: "#api-reference"
---

::example{src="mui/DataGrid.default" min-height="509px"}

The **DataGrid** is a complex control with many options for editing, filtering, sorting, pagination, and virtualization. The [MUI DataGrid documentation](https://mui.com/x/react-data-grid/) contains numerous examples.

**DataGrid** offers three different feature levels: community (free), pro (paid), and premium (paid). Consult the [DataGrid package list](https://mui.com/x/react-data-grid/#data-grid-packages) and [MUI X licensing plans](https://mui.com/x/introduction/licensing/#plans) to determine which plan is needed for the features you will use.

When using the community level **DataGrid** there are several limitations to be aware of:

- Limited to 100 rows displayed at one time. Need to use pagination to show larger data sets.
- Sorting is limited to a single column.
- Filtering is limited to a single condition.

## Use cases

Make sure the **DataGrid** is suitable for your use case. **DataGrid** and [**Table**](/components/table) are both capable of displaying tabular data.

**DataGrid** supports tabular display with a significant amount of interactivity.
It has row and cell selection and editing as first class concepts. The grid is a single tab stop with individual cells accessed by using the arrow keys.

**Table** provides a straightforward user interface for data with limited interactivity. Controls are accessed with the keyboard as normal by tabbing through each one individually.

| Use case                                                          | [DataGrid](/components/datagrid) | [Table](/components/table) |
| ----------------------------------------------------------------- | -------------------------------- | -------------------------- |
| Displaying data with no interactivity                             | ❌                               | ✅                         |
| Selecting rows only                                               | ❌                               | ✅                         |
| Displaying data with multiple interactive components per row      | ✅                               | ✅                         |
| Spreadsheet experience where the user adjusts the values of cells | ✅                               | ❌                         |

## StrataKit MUI modifications

- Restyled using StrataKit's visual language.
- Changed default for `checkboxSelection` to true.
- The `showCellVerticalBorder` and `showColumnVerticalBorder` props are not supported.

## Examples

### Editing data types

**DataGrid** supports editing values of different data types.

::example{src="mui/DataGrid.datatypes" min-height="720px"}

## ✅ Do

- Use a **DataGrid** to handle large amounts of editable data.
- Wrap **DataGrid** in a `<div role="group" aria-labelledby={...}>` and provide a label as in the examples. This helps semantically connect the header toolbar and footer toolbar to the grid as well as insure that the grid has an accessible name.

## 🚫 Don't

- Use **DataGrid** where a simpler **Table** would work.
- Remove the selection checkbox without also removing the ability to select rows . The color contrast of the selected background is too low to indicate selection on its own. The checkbox is required to help identify selected rows. Use `isRowSelectable={() => false}` to insure that rows cannot be selected with the keyboard or pointer.

## API reference

- [`DataGrid`](https://mui.com/x/api/data-grid/data-grid/)
