---
"@stratakit/foundations": patch
"@stratakit/mui": patch
---

Fixed a race condition where stylesheets could be prematurely removed in cases where multiple components that use the same styles were conditionally rendered.
