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
- Deprecated `hideSortIcon` and `IconComponent` property of `TableSortLabel`. The icon is not customizable.

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

The [`TableSortLabel`](https://mui.com/material-ui/api/table-sort-label) component renders an interactive sort button and displays the current sort direction. A hidden description (`"change sort"`) can be associated with each sort button using `aria-describedby` to provide additional context for assistive technologies without affecting the column header.

The [`sortDirection`](https://mui.com/material-ui/api/table-cell/#table-cell-prop-sortDirection) prop on `TableCell` sets the appropriate [`aria-sort`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-sort) value on the column header so assistive technologies can announce the current sort state.

This example is adapted from the [MUI Table Sorting example](https://mui.com/material-ui/react-table/#sorting-selecting) and follows the accessibility guidance described in [Adrian Roselli's article on sortable table columns](https://adrianroselli.com/2021/04/sortable-table-columns.html).

::example{src="mui/Table.sort"}
