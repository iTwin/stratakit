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
