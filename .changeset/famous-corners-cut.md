---
"@stratakit/icons": patch
---

Added `icons-meta.json` file that contains metadata for each SVG icon. Use the icon name (without the `.svg` extension) as the key to access the corresponding metadata object.

Each metadata object contains:

- `aliases` - array of search keywords associated with the icon.
- `symbols` - array of available symbol ids in the icon.
