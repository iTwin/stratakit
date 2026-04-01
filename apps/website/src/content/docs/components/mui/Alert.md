---
title: Alert
description: Alerts are used to provide feedback without interrupting the user's workflow.
links:
  muiDocs: https://mui.com/material-ui/react-alert/
  apiReference: https://mui.com/material-ui/api/alert/
---

::example{src="mui/Alert.default"}

## StrataKit MUI modifications

- Restyled using StrataKit's visual language.
- The `"standard"` variant has been removed. The default variant is now `"outlined"`.
- The [`role="alert"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role) has been removed. The **Alert** will no longer create a [live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) by default.

## Examples

### AlertTitle

::example{src="mui/Alert.title"}
