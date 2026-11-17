---
"@stratakit/foundations": minor
"@stratakit/mui": minor
---

Removed best-effort fallback sanitization from `Icon`. If a non-HTTP `href` value is passed, it will throw an error in browsers that do not support the Sanitizer API.
