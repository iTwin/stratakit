---
title: BottomNavigation
description: Bottom navigation bars are used to navigate between primary application views.
links:
  muiDocs: https://mui.com/material-ui/react-bottom-navigation/
  apiReference: https://mui.com/material-ui/api/bottom-navigation/
---

::example{src="mui/BottomNavigation.default" min-width="450px"}

## StrataKit MUI modifications

- The _selected_ state of `BottomNavigationAction` has been visually reinforced, and semantically conveyed using the [`aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current) attribute.
- The markup of `BottomNavigationAction` now includes a wrapper element around the icon and label.
- Includes `forced-colors` support.
