---
title: DatePicker
description: A calendar view to simplify selection of dates.
links:
  muiDocs: https://mui.com/x/react-date-pickers/date-picker/
  apiReference: "#api-reference"
---

::example{src="mui/DatePicker.default" min-height="150px"}

## StrataKit MUI modifications

- `dayOfWeekFormatter` defaults to a locale-aware 2-character weekday label.

## Examples

### Sizes

Use [`slotProps.textField`](https://mui.com/x/api/date-pickers/date-picker/#date-picker-prop-slotProps) to set the [`size`](https://mui.com/x/api/date-pickers/pickers-text-field/#pickers-text-field-prop-size) of the DatePicker input.

- **Small:** Use in compact interfaces where space is limited.
- **Medium:** Default size, suitable for most use cases.

::example{src="mui/DatePicker.sizes" min-height="150px"}

### Calendar

Use [`DateCalendar`](https://mui.com/x/api/date-pickers/date-calendar/) when users should select a date directly from an inline calendar without opening a text field.

::example{src="mui/DatePicker.calendar" min-height="400px"}

## API reference

- [`DatePicker`](https://mui.com/x/api/date-pickers/date-picker/)
- [`DateCalendar`](https://mui.com/x/api/date-pickers/date-calendar/)
