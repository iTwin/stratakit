---
title: Pagination
description: Pagination is used to navigate through a set of data by dividing it into chunks.
links:
  muiDocs: https://mui.com/material-ui/react-pagination/
  apiReference: https://mui.com/material-ui/api/pagination/
---

::example{src="mui/Pagination.default"}

## StrataKit MUI modifications

- The `shape` prop now defaults to `"rounded"` instead of `"circular"`.
- Lightly styled using StrataKit's visual language.
- The `color`, `shape` and `variant` props of `Pagination` and `PaginationItem` are not supported.
- Ripple effect removed from `PaginationItem`. The `centerRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `TouchRippleProps` and `touchRippleRef` props are not supported.
- The `action` prop of `PaginationItem` is not supported.
