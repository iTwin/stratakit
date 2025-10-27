---
"@stratakit/foundations": minor
---

Renamed a few CSS variables:

- `--stratakit-color-bg-page-zebra` is now `--stratakit-color-bg-control-table-zebra`.
- `--stratakit-color-brand-logo` is now `--stratakit-color-brand-logo-fill`.
- All component-specific shadow tokens are now prefixed with `control-`.
  - `--stratakit-shadow-button-base-drop` → `--stratakit-shadow-control-button-base-drop`
  - `--stratakit-shadow-button-base-inset` → `--stratakit-shadow-control-button-base-inset`
  - `--stratakit-shadow-dialog-base` → `--stratakit-shadow-control-dialog-base`
  - `--stratakit-shadow-dropdown-base` → `--stratakit-shadow-control-dropdown-base`
  - `--stratakit-shadow-input-base` → `--stratakit-shadow-control-input-base`
  - `--stratakit-shadow-table-strong` → `--stratakit-shadow-control-table-strong`
  - `--stratakit-shadow-toolbar-base` → `--stratakit-shadow-control-toolbar-base`
  - `--stratakit-shadow-tooltip-base` → `--stratakit-shadow-control-tooltip-base`

⚠️ To handle these breaking changes, do a find-and-replace for all existing references in your code base.
