---
"@stratakit/mui": minor
---

MUI styling engine changes:

- Unnecessary vendor prefixes have been removed from the generated CSS using a custom Styling plugin.
- Emotion's `speedy` mode is enabled in both development and production. As a result, MUI styles are now injected directly into the CSSOM using `insertRule`.
- Order of styles has been changed so that MUI styles are injected at the end of the `<head>` element, preventing issues where `@layer mui` would be added before other low-priority layers.
