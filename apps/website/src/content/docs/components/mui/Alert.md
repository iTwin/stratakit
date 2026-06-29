---
title: Alert
description: Alerts are used to provide feedback without interrupting the user's workflow.
links:
  muiDocs: https://mui.com/material-ui/react-alert/
  apiReference: https://mui.com/material-ui/api/alert/
---

::example{src="mui/Alert.default"}

## Examples

### Actions

Providing an `onClose` prop with include a close icon button on the `Alert`. Other actions can be provided using the `actions` prop. See the [Material UI Component documentation for Alert actions](https://mui.com/material-ui/react-alert/#actions) for more examples.

::example{src="mui/Alert.close"}

## StrataKit MUI modifications

- Restyled using StrataKit's visual language.
- The `"standard"` variant has been removed. The default variant is now `"outlined"`.
- The default severity is now a new `"none"` value instead of `"success"`.
- The **Alert** will no longer create a [live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) by default. It now uses [`role="group"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/group_role) instead of [`role="alert"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role).
