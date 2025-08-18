---
"@stratakit/foundations": minor
---

`Icon` component no longer automatically adjusts the URL based on `size`.

`#icon-large` must now be explicitly added to the URL to select the large icons from `@stratakit/icons`. For example:

```diff
- <Icon href={placeholderIcon} size="large" />
+ <Icon href={`${placeholderIcon}#icon-large`} size="large" />
```
