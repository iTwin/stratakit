---
"@stratakit/mui": minor
---

Changed [MUI's spacing unit](https://mui.com/material-ui/customization/spacing/) to match StrataKit's. This will impact any spacing values provided to the `Stack` or `Grid` components, as well as any values passed to the `sx` prop. Double any existing values to maintain the same computed distance.
