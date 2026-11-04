---
title: DataGrid
description: A fast and extensible React data table and React data grid, with filtering, sorting, aggregation, and more.
links:
  muiDocs: https://mui.com/x/react-data-grid/
  apiReference: "#api-reference"
---

::example{src="mui/DataGrid.default" min-height="500px"}

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

**DataGrid** supports [editing values](https://mui.com/x/react-data-grid/editing/) of different data types.

::example{src="mui/DataGrid.datatypes" min-height="775px"}

### Non-selectable rows

By default the **DataGrid** is configured to allow row selection. To use without row selection:

- Set `checkboxSelection={false}` to hide the selection checkbox in the first column.
- Set `isRowSelectable={()=>false}` to mark all rows as non selectable.

::example{src="mui/DataGrid.nonselectable" min-height="500px"}

## ✅ Do

- Use a **DataGrid** to handle large amounts of editable data.
- Set the `label` prop to provide an accessible name for the grid.

## 🚫 Don't

- Don't use **DataGrid** where a simpler **Table** would work.
- Don't remove the selection checkbox without also removing the ability to select rows. The checkbox is required to help identify selected rows.

## API reference

- [`DataGrid`](https://mui.com/x/api/data-grid/data-grid/)
