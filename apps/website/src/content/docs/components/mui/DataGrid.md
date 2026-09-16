---
title: DataGrid
description: A fast and extensible React data table and React data grid, with filtering, sorting,   aggregation, and more.
links:
  muiDocs: https://mui.com/x/react-data-grid/
---

::example{src="mui/DataGrid.default"}

The MUI DataGrid is a complex control with many options for editing, filtering, sorting, pagination, and virtualization. The [MUI DataGrid documentation](https://mui.com/x/react-data-grid/) contains numerous examples

## Use cases

`DataGrid` and [`Table`](/components/table) are both capable of displaying tabular data.

`DataGrid` supports tabular display with a significant amount of interactivity.
It has row and cell selection and editing as first class concepts. The grid is a single tab stop with individual cells accessed by using the arrow keys.

`Table` provides a straightforward user interface for data with limited interactivity. Controls are accessed with the keyboard as normal by tabbing through each one individually.

| Use case                                                         | DataGrid | Table |
| ---------------------------------------------------------------- | -------- | ----- |
| Displaying data with no interactive components                   | ❌       | ✅    |
| Selecting rows with no editing                                   | ❌       | ✅    |
| Displaying data with multiple interactive components per row     | ✅       | ✅    |
| Spreadsheet experience where the user adjust the values of cells | ✅       | ❌    |

## Examples

### Editing Data Types

This example shows how editing can work with multiple different types of data.

::example{src="mui/DataGrid.datatypes"}
