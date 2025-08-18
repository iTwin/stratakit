---
"@stratakit/structures": minor
---

`Toolbar.Item` component no longer automatically uses the large version of the icon.

`#icon-large` must now be explicitly added to the URL to select the large icons from `@stratakit/icons`. For example:

```diff
  <Toolbar.Item
-   render={<IconButton icon={placeholderIcon} />}
+   render={<IconButton icon={`${placeholderIcon}#icon-large`} />}
  />
```
