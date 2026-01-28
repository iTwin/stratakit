# Changelog

## 0.2.1

- [#1188](https://github.com/iTwin/design-system/pull/1188): Fixed a race condition where stylesheets could be prematurely removed in cases where multiple components that use the same styles were conditionally rendered.
- Updated dependencies:
  - @stratakit/foundations@0.4.6

## 0.2.0

### Potentially breaking changes

This release includes a few API changes in MUI components. Make sure to include `@stratakit/mui/types.d.ts` in your project to get the correct types.

- [#1157](https://github.com/iTwin/design-system/pull/1157): Updated the default value of `Tooltip`'s `describeChild` prop to `true`.
- `color` prop:
  - [#1152](https://github.com/iTwin/design-system/pull/1152), [#1158](https://github.com/iTwin/design-system/pull/1158): Removed the following values from the `color` prop of `Button` and `IconButton` components: `"info"`, `"success"`, `"warning"`, and `"inherit"`.
  - [#1183](https://github.com/iTwin/design-system/pull/1183): Removed all values for the `color` prop from form controls (i.e. `Checkbox`, `FormLabel`, `Radio`, `Select`, `Switch` and `TextField` components).
  - [#1161](https://github.com/iTwin/design-system/pull/1161): Removed the following values from `Fab`'s `color` prop: `"info"`, `"success"`, `"warning"`, `"error"`, `"default"`, and `"inherit"`. The default value is now `"primary"`.
  - [#1176](https://github.com/iTwin/design-system/pull/1176): Removed all values from `Slider`'s `color` prop (except the default `"primary"`).

- `variant` prop:
  - [#1179](https://github.com/iTwin/design-system/pull/1179): Removed `variant="standard"` from `Alert` and changed the default to `variant="outlined"`.
  - [#1153](https://github.com/iTwin/design-system/pull/1153): Deprecated the `variant` prop in `TextField`.

### Non-breaking changes

- [#1139](https://github.com/iTwin/design-system/pull/1139): Removed floating label and re-styled inputs to match the height of buttons.
- [#1162](https://github.com/iTwin/design-system/pull/1162): Fixed input `outline` and label `color` on focus.
- [#1170](https://github.com/iTwin/design-system/pull/1170): Updated global color mappings for various components, e.g. `Alert`, `Avatar`, `LinearProgress`, `Skeleton`, `Snackbar`, `TableCell`.
- [#1171](https://github.com/iTwin/design-system/pull/1171): Fixed `ButtonGroup` default props to use `color="secondary"` and `disableRipple`.
- [#1180](https://github.com/iTwin/design-system/pull/1180): Fixed `Link` color contrast.
- [#1178](https://github.com/iTwin/design-system/pull/1178): Fixed `IconButton` color contrast.
- [#1160](https://github.com/iTwin/design-system/pull/1160): Updated padding for `Dialog` actions.
- [#1175](https://github.com/iTwin/design-system/pull/1175): Updated padding for `Card` actions.
- [#1159](https://github.com/iTwin/design-system/pull/1159): Updated colors in `Accordion`, `Card` and `Chip` components.
- [#1159](https://github.com/iTwin/design-system/pull/1159): Updated `AppBar` component to use neutral colors and no box-shadow.
- [#1156](https://github.com/iTwin/design-system/pull/1156): Updated `ButtonBase` disabled styles to use `cursor: not-allowed` and not prevent `pointer-events`.
- Updated dependencies:
  - @stratakit/icons@0.3.0

## 0.1.3

- [#1150](https://github.com/iTwin/design-system/pull/1150): Added a new `/types.d.ts` file for augmenting the types from MUI. This file should be included in all projects that rely on `@stratakit/mui`.
- [#1146](https://github.com/iTwin/design-system/pull/1146): Updated `Button` to use `variant="contained"` by default.

## 0.1.2

- [#1137](https://github.com/iTwin/design-system/pull/1137): Updated `border-radius` of `IconButton` component.

## 0.1.1

- [#1131](https://github.com/iTwin/design-system/pull/1131): Fixed the values for **warning** palette.
- [#1135](https://github.com/iTwin/design-system/pull/1135): Global focus styles have been moved from `@layer stratakit` to `@layer reset`.
- Updated dependencies:
  - @stratakit/foundations@0.4.5

## 0.1.0

Initial release 🥳
