---
"@stratakit/foundations": minor
---

Removed the default `#icon` URL fragment applied to the specified `href` prop from the `Icon`. It is recommended to append the required symbol manually for now.

```diff
- <Icon href={svgPlaceholder} />
+ <Icon href={`${svgPlaceholder}#icon`} />
```
