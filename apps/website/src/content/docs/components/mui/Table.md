---
title: Table
description: Tables are used to display information from a data set.
links:
  muiDocs: https://mui.com/material-ui/react-table/
  apiReference: https://mui.com/material-ui/api/table/
---

::example{src="mui/Table.default"}

## StrataKit MUI modifications

- Removed `role="rowgroup"` semantics from `TableBody`, as it is not necessary and can cause issues with some assistive technologies.
- Enabled `TableRow`'s [`hover`](https://mui.com/material-ui/api/table-row/#table-row-prop-hover) prop by default, except when used inside `TableHead`.

## Examples

### Footer

::example{src="mui/Table.footer"}

### Dense

Use `size="small"` for compact interfaces with limited screen real estate or when displaying large datasets.

::example{src="mui/Table.small"}

### Row selection

Use a [**Checkbox**](/components/checkbox) within the **Table**'s first column to give the user a clear indicator that rows can be selected. Combine it with the `TableRow`'s [`selected`](https://mui.com/material-ui/api/table-row/#table-row-prop-selected) prop to visually reinforce selected rows.

::example{src="mui/Table.select"}

:::caution
Placing a "select all" checkbox within the column header is not recommended.
:::

### Sorting

Allows sorting by a single column. Uses the `TableSortLabel` for displaying the sort button. An additional sort description is included the buttons based on [Sortable Table Columns](https://adrianroselli.com/2021/04/sortable-table-columns.html) by Adrian Roselli.

- [Material UI Table Sorting Example](https://mui.com/material-ui/react-table/#sorting-selecting)
- [TableSortLabel API](https://mui.com/material-ui/api/table-sort-label)

::example{src="mui/Table.sort"}
