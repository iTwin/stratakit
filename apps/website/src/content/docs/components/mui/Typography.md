---
title: Typography
description: Typography is for applying style to runs of text.
links:
  muiDocs: https://mui.com/material-ui/react-typography/
  apiReference: https://mui.com/material-ui/api/typography/
---

::example{src="mui/Typography.default"}

## StrataKit MUI modifications

- The `font-family` has been changed to `InterVariable`. See [self-hosting fonts](/getting-started/develop/self-hosting-the-fonts).
- The typography scale has been adjusted to better align with StrataKit's more compact visual language.
- The default `variant` is now `"body2"` instead of `"body1"`.
- A warning will be logged during development if a heading variant is used without explicitly setting the `render` prop.
