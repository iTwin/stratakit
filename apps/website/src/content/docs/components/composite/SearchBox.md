---
title: Search box
description: Lets users enter and clear search queries.
---

::example{src="composite/SearchBox.default"}

Compose a search box from MUI [`FormControlLabel`](https://mui.com/material-ui/api/form-control-label/) and [`Input`](https://mui.com/material-ui/api/input/) components with `type="search"`. A leading search icon reinforces the field's purpose, and a clear button appears after the user enters a query.

## ✅ Do

- Give the field a clear label.
- Use an accessible name for the clear button.
- Return focus to the input after clearing the query.

## 🚫 Don't

- Don't show a clear button when the field is empty.

## API reference

- [`FormControlLabel`](https://mui.com/material-ui/api/form-control-label/)
- [`Icon`](/reference/mui/Icon)
- [`IconButton`](https://mui.com/material-ui/api/icon-button/)
- [`Input`](https://mui.com/material-ui/api/input/)
- [`InputAdornment`](https://mui.com/material-ui/api/input-adornment/)
