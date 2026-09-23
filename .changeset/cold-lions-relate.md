---
"@stratakit/icons": patch
---

Added typed named exports for every icon, available from subpaths without the `.svg` extension. These provide complete URLs for all icon variations, without having to manually manage SVG symbol fragments. Example usage:

```tsx
import { svgPlaceholder, svgPlaceholderLarge } from "@stratakit/icons/placeholder";

<Icon href={svgPlaceholder} />;
<Icon href={svgPlaceholderLarge} size="large" />;
```

Existing default imports from `.svg` subpaths remain supported and unchanged, but the new named exports are the recommended way to use icons going forward.

<details>
<summary>Migration examples</summary>

If the default import name differs from the new named exports, update the name as needed.

```diff
- import placeholderIcon from "@stratakit/icons/placeholder.svg";
+ import { svgPlaceholder } from "@stratakit/icons/placeholder";

- <Icon href={placeholderIcon} />
+ <Icon href={svgPlaceholder} />
```

Aliases can be used to maintain previous import names for convenience.

```diff
- import placeholderIcon from "@stratakit/icons/placeholder.svg";
+ import { svgPlaceholder as placeholderIcon } from "@stratakit/icons/placeholder";

<Icon href={svgPlaceholder} />
```

Any manually appended symbol fragments will need to be removed, as they are now included in the complete URLs provided by the named exports.

```diff
- import svgPlaceholder from "@stratakit/icons/placeholder.svg";
+ import { svgPlaceholder, svgPlaceholderLarge } from "@stratakit/icons/placeholder";

- <Icon href={`${svgPlaceholder}#icon`} />
+ <Icon href={svgPlaceholder} />

- <Icon href={`${svgPlaceholder}#icon-large`} size="large" />
+ <Icon href={svgPlaceholderLarge} size="large" />
```

</details>

**Note:** The new modules import SVG files internally and therefore still require bundler configuration to load SVGs as asset URLs.
