---
"@stratakit/foundations": patch
---

`Icon` component now supports URLs containing an explicit hash.

```tsx
import placeholderIcon from "@stratakit/icons/placeholder.svg";

<Icon href={`${placeholderIcon}#icon-large`} size="large" />;
```
