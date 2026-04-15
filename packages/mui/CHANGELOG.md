# Changelog

## 0.4.0

### Breaking changes

- [#1400](https://github.com/iTwin/stratakit/pull/1400): **MUI v9** support.
  - Updated peer dependency range of `@mui/material` to `^9.0.0`. Make sure to update your project (see [migration guide](https://mui.com/material-ui/migration/upgrade-to-v9/)).
  - Updated `ButtonBase` and derived components to use the new [`nativeButton`](https://mui.com/material-ui/api/button-base/#button-base-prop-nativeButton) prop. When rendering buttons as non-`<button>` elements (e.g. `<a>`), make sure to also set `nativeButton={false}`.
  - Updated `Stepper` and `Step` to use `<ol>` and `<li>` elements respectively. Explicit `role`s do not need to be set anymore.
- [#1371](https://github.com/iTwin/stratakit/pull/1371): Removed unintentionally exposed `createTheme` function. Use `Root` component to apply the StrataKit theme for MUI.

### Non-breaking changes

- [#1327](https://github.com/iTwin/stratakit/pull/1327): Added `unstable_accentColor` prop to `Root` component. When `"cobalt"` value is specified, the accent color is changed to blue.
- [#1407](https://github.com/iTwin/stratakit/pull/1407): Change default `Tooltip` placement from `"bottom"` to `"top"`.
- [#1404](https://github.com/iTwin/stratakit/pull/1404): Fixed `Dialog` types to add missing `render` prop.
- Styling changes:
  - [#1397](https://github.com/iTwin/stratakit/pull/1397): Styled `Tooltip` to match the Strata visual design language.
  - [#1253](https://github.com/iTwin/stratakit/pull/1253): Styled `Menu` and `MenuItem` to match the Strata visual design language.
  - [#1403](https://github.com/iTwin/stratakit/pull/1403): `Autocomplete` listbox and options now match the visual styling of `Menu` and `MenuItem`. The `renderOption` prop is used to add a class.
  - [#1396](https://github.com/iTwin/stratakit/pull/1396): Adjusted positioning and spacing of `Select` and `NativeSelect`'s dropdown icon.
  - [#1394](https://github.com/iTwin/stratakit/pull/1394): Fixed styling of `IconButton` and `ToggleButton` components when used with large size icons.
  - [#1320](https://github.com/iTwin/stratakit/pull/1320): Added animation to `Switch` when actively pressed.
  - [#1411](https://github.com/iTwin/stratakit/pull/1411): Corrected left alignment for the first chip in each row of multiselect `Autocomplete` and spacing around the expand and clear buttons.
  - [#1414](https://github.com/iTwin/stratakit/pull/1414): The `Autocomplete` input width scales based on the number of buttons.
  - [#1374](https://github.com/iTwin/stratakit/pull/1374): Improved `forced-colors` styling for `Autocomplete`, `Badge`, `BottomNavigation`, `Button`, `Checkbox`, `Drawer`, `IconButton`, `Radio`, `TextField`, `LinearProgress`, `Popover`, `Snackbar`, `Tabs`, and `Tooltip`.
  - [#1412](https://github.com/iTwin/stratakit/pull/1412): Added `background-color` to `TextField`, `Autocomplete` and `Select`.
- Updated dependencies:
  - @stratakit/foundations@0.4.8
  - @mui/material@9.0.0

## 0.3.1

- Styling changes:
  - [#1365](https://github.com/iTwin/stratakit/pull/1365): Updated the border-radii of `Paper`-based components. Affects `Accordion`, `Alert`, `Autocomplete`, `Card`, `Dialog`, `Menu`, `Popover`, `Snackbar`, and `Tooltip`.
  - [#1369](https://github.com/iTwin/stratakit/pull/1369): Updated styling for selected states across various components: `Autocomplete`, `ListItemButton`, `Pagination`, `Select`, `TableRow`, `ToggleButton`.
  - [#1363](https://github.com/iTwin/stratakit/pull/1363): Lightly styled `Stepper` using the Strata visual design language.
  - [#1379](https://github.com/iTwin/stratakit/pull/1379): Reduced the size of various elements inside `Autocomplete`.
  - [#1314](https://github.com/iTwin/stratakit/pull/1314): Styled `Avatar` to match the Strata visual design language.
  - [#1345](https://github.com/iTwin/stratakit/pull/1345): Updated `Accordion` background-color.
  - [#1365](https://github.com/iTwin/stratakit/pull/1365): Updated `Pagination`'s `shape` to `"rounded"`.
  - [#1368](https://github.com/iTwin/stratakit/pull/1368): Updated the font sizes used in `CardHeader`.
  - [#1358](https://github.com/iTwin/stratakit/pull/1358): Use global component size variables in `Chip`.
  - [#1386](https://github.com/iTwin/stratakit/pull/1386): Reduced the font-size of `MenuItem` and `Select` options.
  - [#1373](https://github.com/iTwin/stratakit/pull/1373): Updated the selected state styling and semantics for `BottomNavigation`.
  - [#1357](https://github.com/iTwin/stratakit/pull/1357): Fixed `ListItem` padding when used with `secondaryAction`.
- Markup changes:
  - [#1358](https://github.com/iTwin/stratakit/pull/1358): Replaced the icon used by deletable `Chip`.
  - [#1373](https://github.com/iTwin/stratakit/pull/1373): Updated `BottomNavigationAction` to add a wrapper element around the icon and label.
  - [#1361](https://github.com/iTwin/stratakit/pull/1361): Removed unnecessary `role="rowgroup"` from `TableBody`.
  - [#1359](https://github.com/iTwin/stratakit/pull/1359): Fixed `Divider` to render a `<div>` when `children` is passed.
  - [#1363](https://github.com/iTwin/stratakit/pull/1363): Customized `StepIcon` icon and markup.
- [#1366](https://github.com/iTwin/stratakit/pull/1366): Fixed `React.Fragment can only have "key" and "children" props.` error in `Checkbox` and `Radio`.
- [#1362](https://github.com/iTwin/stratakit/pull/1362): Fixed `CardMedia` to correctly handle `render` prop.
- [#1367](https://github.com/iTwin/stratakit/pull/1367): Fixed type overrides (JSDoc) to correctly display `describeChild` customization of `Tooltip` component.

## 0.3.0

### API changes

The following API changes apply to components exported from `@stratakit/mui`:

- [#1268](https://github.com/iTwin/stratakit/pull/1268): Added `render` prop to the `Root` component.
- [#1335](https://github.com/iTwin/stratakit/pull/1335): Added `rootNode` prop to the `Root` component.

The following API changes apply to components exported from `@mui/material`. Make sure to include `@stratakit/mui/types.d.ts` in your project to get the correct types.

- [#1212](https://github.com/iTwin/stratakit/pull/1212): Introduced a new `render` prop for all overrideable MUI components, replacing the previous `component` prop. The `render` prop is more flexible and aligns better with modern React patterns, while also allowing the StrataKit MUI theme to apply more powerful customizations.

  If you were previously using the `component` prop to override MUI components, you should now use the `render` prop instead. The `component` prop has been marked as deprecated.

  ```diff
  - <Typography component="h2">
  + <Typography render={<h2 />} />
  ```

  Note: Components that did not have a `component` prop previously will not have a `render` prop now.

- [#1321](https://github.com/iTwin/stratakit/pull/1321): Added a new `label` prop to `IconButton` and `ToggleButton`. When specified, the value of this prop will be used as the button's accessible name _and_ will also be shown in a tooltip when the button is hovered or focused.
- [#1287](https://github.com/iTwin/stratakit/pull/1287): Added a new `inline` prop to the `Badge` component to display the badge in normal document flow instead of positioned relative to its child.
- [#1252](https://github.com/iTwin/stratakit/pull/1252): Added a new `deleteLabel` prop to the `Chip` component for better localization.
- [#1259](https://github.com/iTwin/stratakit/pull/1259): ⚠️ Removed all values for the `size` prop from `Checkbox` and `Radio`.
- [#1288](https://github.com/iTwin/stratakit/pull/1288): ⚠️ Removed all values for the `color` prop from `Chip`.
- [#1294](https://github.com/iTwin/stratakit/pull/1294): ⚠️ Removed `"default"` value from `color` prop of `IconButton` component. The default color is now `"secondary"`.
- [#1332](https://github.com/iTwin/stratakit/pull/1332): ⚠️ Removed `LinkComponent` prop from `ButtonBase` (and therefore from all MUI components that extend it). Use the `render` prop instead.
- [#1287](https://github.com/iTwin/stratakit/pull/1287): ⚠️ Removed `"default"` value from `color` prop of `Badge` component. The default color is now `"secondary"`.

### Implementation changes

- [#1312](https://github.com/iTwin/stratakit/pull/1312): MUI styling engine changes:
  - Unnecessary vendor prefixes have been removed from the generated CSS using a custom Stylis plugin.
  - Emotion's `speedy` mode is enabled in both development and production. As a result, MUI styles are now injected directly into the CSSOM using `insertRule`.
  - Order of styles has been changed so that MUI styles are injected at the end of the `<head>` element, preventing issues where `@layer mui` would be added before other low-priority layers.
- [#1305](https://github.com/iTwin/stratakit/pull/1305): Removed [`role="region"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role) semantics from `Accordion` component.
- [#1269](https://github.com/iTwin/stratakit/pull/1269): `Card` will now be rendered as an `<article>` element by default. This should be used in combination with a heading inside the card. In cases where `CardHeader` is used, its `title` will be rendered as `<h2>` by default. In other cases, you can use the `Typography` component with `render` prop to specify the heading level.
- [#1274](https://github.com/iTwin/stratakit/pull/1274): `CardActionArea` has been redesigned to not wrap the entire card content. Instead, it should be used in the card's heading or title area. This improves the card's accessibility structure, while still allowing the entire card to be clickable.
- [#1252](https://github.com/iTwin/stratakit/pull/1252): Updated `Chip` component so the `root` element is no longer interactive. Deletable `Chip` now renders an interactive delete button, and clickable `Chip` renders its label as an interactive button.
- [#1298](https://github.com/iTwin/stratakit/pull/1298): Updated the default `variant` of `Typography` to `"body2"`.
- [#1296](https://github.com/iTwin/stratakit/pull/1296): Updated `Snackbar` to be rendered using a [portal](https://react.dev/reference/react-dom/createPortal).
- [#1213](https://github.com/iTwin/stratakit/pull/1213): Changed `Autocomplete` to make the clear indicator focusable.
- [#1214](https://github.com/iTwin/stratakit/pull/1214): Updated `Autocomplete` to make the clear indicator visible without requiring user interaction.

### Styling changes

- [#1258](https://github.com/iTwin/stratakit/pull/1258): Styled `IconButton` to match the Strata visual design language.
- [#1281](https://github.com/iTwin/stratakit/pull/1281): Styled `Button` icons to match the Strata visual design language.
- [#1244](https://github.com/iTwin/stratakit/pull/1244): Styled `Switch` to match the Strata visual design language.
- [#1254](https://github.com/iTwin/stratakit/pull/1254): Styled `Slider` to match the Strata visual design language.
- [#1186](https://github.com/iTwin/stratakit/pull/1186): Styled `Checkbox` & `Radio` to match the Strata visual design language.
- [#1218](https://github.com/iTwin/stratakit/pull/1218): `Checkbox` & `Radio` touch target area no longer consume space.
- [#1276](https://github.com/iTwin/stratakit/pull/1276): Fixed the colors of various permutations of `Alert`.
- [#1315](https://github.com/iTwin/stratakit/pull/1315): Decreased spacing/sizing of `List` components.
- [#1316](https://github.com/iTwin/stratakit/pull/1316): Adjusted styling for `DialogActions`.
- [#1316](https://github.com/iTwin/stratakit/pull/1316): Adjusted styling for `Backdrop`.
- [#1306](https://github.com/iTwin/stratakit/pull/1306): Fixed color contrast for a few `Button` permutations.
- [#1307](https://github.com/iTwin/stratakit/pull/1307): Fixed color contrast of `BottomNavigation` selected item.
- [#1309](https://github.com/iTwin/stratakit/pull/1309): Use global component size variables in `Button`, `IconButton`, and `ToggleButton`.
- [#1310](https://github.com/iTwin/stratakit/pull/1310): Use global component size variables in inputs.
- [#1208](https://github.com/iTwin/stratakit/pull/1208): `InputLabel` and `FormHelperText` styling improvements.
- [#1273](https://github.com/iTwin/stratakit/pull/1273): Improved input styling with hover states, placeholders, and disabled cursor.
- [#1181](https://github.com/iTwin/stratakit/pull/1181): Added disabled and error styling to `TextField`, `InputLabel`, & `FormHelperText`.
- [#1298](https://github.com/iTwin/stratakit/pull/1298): Adjusted the `Typography` scale to better align with StrataKit's visual language.
- [#1313](https://github.com/iTwin/stratakit/pull/1313): Added border to `Badge`.
- [#1291](https://github.com/iTwin/stratakit/pull/1291): Updated the text selection color of `Badge`.
- [#1239](https://github.com/iTwin/stratakit/pull/1239): `NativeSelect` visually styled to match `Select`.

### Misc

- [#1312](https://github.com/iTwin/stratakit/pull/1312): Added direct dependencies on `@emotion/react`, `@emotion/cache` & `@emotion/styled`.
- Updated dependencies:
  - @stratakit/icons@0.3.1
  - @stratakit/foundations@0.4.7

## 0.2.1

- [#1188](https://github.com/iTwin/stratakit/pull/1188): Fixed a race condition where stylesheets could be prematurely removed in cases where multiple components that use the same styles were conditionally rendered.
- Updated dependencies:
  - @stratakit/foundations@0.4.6

## 0.2.0

### Potentially breaking changes

This release includes a few API changes in MUI components. Make sure to include `@stratakit/mui/types.d.ts` in your project to get the correct types.

- [#1157](https://github.com/iTwin/stratakit/pull/1157): Updated the default value of `Tooltip`'s `describeChild` prop to `true`.
- `color` prop:
  - [#1152](https://github.com/iTwin/stratakit/pull/1152), [#1158](https://github.com/iTwin/stratakit/pull/1158): Removed the following values from the `color` prop of `Button` and `IconButton` components: `"info"`, `"success"`, `"warning"`, and `"inherit"`.
  - [#1183](https://github.com/iTwin/stratakit/pull/1183): Removed all values for the `color` prop from form controls (i.e. `Checkbox`, `FormLabel`, `Radio`, `Select`, `Switch` and `TextField` components).
  - [#1161](https://github.com/iTwin/stratakit/pull/1161): Removed the following values from `Fab`'s `color` prop: `"info"`, `"success"`, `"warning"`, `"error"`, `"default"`, and `"inherit"`. The default value is now `"primary"`.
  - [#1176](https://github.com/iTwin/stratakit/pull/1176): Removed all values from `Slider`'s `color` prop (except the default `"primary"`).

- `variant` prop:
  - [#1179](https://github.com/iTwin/stratakit/pull/1179): Removed `variant="standard"` from `Alert` and changed the default to `variant="outlined"`.
  - [#1153](https://github.com/iTwin/stratakit/pull/1153): Deprecated the `variant` prop in `TextField`.

### Non-breaking changes

- [#1139](https://github.com/iTwin/stratakit/pull/1139): Removed floating label and re-styled inputs to match the height of buttons.
- [#1162](https://github.com/iTwin/stratakit/pull/1162): Fixed input `outline` and label `color` on focus.
- [#1170](https://github.com/iTwin/stratakit/pull/1170): Updated global color mappings for various components, e.g. `Alert`, `Avatar`, `LinearProgress`, `Skeleton`, `Snackbar`, `TableCell`.
- [#1171](https://github.com/iTwin/stratakit/pull/1171): Fixed `ButtonGroup` default props to use `color="secondary"` and `disableRipple`.
- [#1180](https://github.com/iTwin/stratakit/pull/1180): Fixed `Link` color contrast.
- [#1178](https://github.com/iTwin/stratakit/pull/1178): Fixed `IconButton` color contrast.
- [#1160](https://github.com/iTwin/stratakit/pull/1160): Updated padding for `Dialog` actions.
- [#1175](https://github.com/iTwin/stratakit/pull/1175): Updated padding for `Card` actions.
- [#1159](https://github.com/iTwin/stratakit/pull/1159): Updated colors in `Accordion`, `Card` and `Chip` components.
- [#1159](https://github.com/iTwin/stratakit/pull/1159): Updated `AppBar` component to use neutral colors and no box-shadow.
- [#1156](https://github.com/iTwin/stratakit/pull/1156): Updated `ButtonBase` disabled styles to use `cursor: not-allowed` and not prevent `pointer-events`.
- Updated dependencies:
  - @stratakit/icons@0.3.0

## 0.1.3

- [#1150](https://github.com/iTwin/stratakit/pull/1150): Added a new `/types.d.ts` file for augmenting the types from MUI. This file should be included in all projects that rely on `@stratakit/mui`.
- [#1146](https://github.com/iTwin/stratakit/pull/1146): Updated `Button` to use `variant="contained"` by default.

## 0.1.2

- [#1137](https://github.com/iTwin/stratakit/pull/1137): Updated `border-radius` of `IconButton` component.

## 0.1.1

- [#1131](https://github.com/iTwin/stratakit/pull/1131): Fixed the values for **warning** palette.
- [#1135](https://github.com/iTwin/stratakit/pull/1135): Global focus styles have been moved from `@layer stratakit` to `@layer reset`.
- Updated dependencies:
  - @stratakit/foundations@0.4.5

## 0.1.0

Initial release 🥳
