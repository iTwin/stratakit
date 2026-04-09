---
"@stratakit/mui": minor
---

Updated `ButtonBase` and derived components to use the new [`nativeButton`](https://mui.com/material-ui/api/button-base/#button-base-prop-nativeButton) prop. When rendering buttons as non-`<button>` elements (e.g. `<a>`), make sure to also set `nativeButton={false}`.
