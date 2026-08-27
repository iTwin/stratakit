# Changelog

## 1.0.0-rc.0

### Breaking changes

- [#1753](https://github.com/iTwin/stratakit/pull/1753): Deprecated `FilledInput` component.
- [#1729](https://github.com/iTwin/stratakit/pull/1729): Deprecated `action`, `centerRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `TouchRippleProps` and `touchRippleRef` props of `ListItemButton`
- [#1716](https://github.com/iTwin/stratakit/pull/1716): Deprecated `variantMapping` prop of `Typography`.
- [#1717](https://github.com/iTwin/stratakit/pull/1717): Deprecated `action`, `centerRipple`, `disableRipple`, `disableFocusRipple`, `disableTouchRipple`, `focusRipple`, `TouchRippleProps` and `touchRippleRef` props of `Fab`.
- [#1746](https://github.com/iTwin/stratakit/pull/1746): Deprecated `action`, `centerRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `icon`, `TouchRippleProps` and `touchRippleRef` props of `StepButton` component.
- [#1708](https://github.com/iTwin/stratakit/pull/1708): Deprecated `color`, `elevation`, `enableColorOnDark`, `square` and `variant` props of `AppBar`.
- [#1737](https://github.com/iTwin/stratakit/pull/1737): Deprecated `PaperComponent` prop of `Dialog`
- [#1703](https://github.com/iTwin/stratakit/pull/1703): Deprecated `clearIcon`, `popupIcon` and `forcePopupIcon` props of `Autocomplete`.
- [#1768](https://github.com/iTwin/stratakit/pull/1768): Deprecated `TabScrollButton` component.
- [#1732](https://github.com/iTwin/stratakit/pull/1732): Deprecated `color`, `focused`, `hiddenLabel` and `variant` props of `FormControl`.
- [#1743](https://github.com/iTwin/stratakit/pull/1743): Deprecated `color`, `disableUnderline`, `disableInjectingGlobalStyles` and `variant` props of `NativeSelect`.
- [#1702](https://github.com/iTwin/stratakit/pull/1702): Deprecated `elevation` and `marginThreshold` props of `Popover` component.
- [#1798](https://github.com/iTwin/stratakit/pull/1798): Renamed all space tokens.

  | Old name                | New name                     |
  | ----------------------- | ---------------------------- |
  | `--stratakit-space-x05` | `--stratakit-space-50`       |
  | `--stratakit-space-x1`  | `--stratakit-space-100`      |
  | -                       | `--stratakit-space-150` (🆕) |
  | `--stratakit-space-x2`  | `--stratakit-space-200`      |
  | `--stratakit-space-x3`  | `--stratakit-space-300`      |
  | `--stratakit-space-x4`  | `--stratakit-space-400`      |
  | `--stratakit-space-x5`  | `--stratakit-space-500`      |
  | `--stratakit-space-x6`  | `--stratakit-space-600`      |
  | `--stratakit-space-x7`  | `--stratakit-space-700`      |
  | `--stratakit-space-x8`  | `--stratakit-space-800`      |
  | `--stratakit-space-x9`  | `--stratakit-space-900`      |
  | `--stratakit-space-x10` | `--stratakit-space-1000`     |

- [#1791](https://github.com/iTwin/stratakit/pull/1791): Moved `@stratakit/foundations` from direct `dependencies` to `peerDependencies`. Applications should install the `@stratakit/foundations` package manually.
- [#1726](https://github.com/iTwin/stratakit/pull/1726): Deprecated `autoFocus` and `disableAutoFocusItem` props of `Menu`.
- [#1793](https://github.com/iTwin/stratakit/pull/1793): Changed default `caption-side` for `Table`.
- [#1723](https://github.com/iTwin/stratakit/pull/1723): Deprecated `action`, `centerRipple`, `disableRipple`, `disableFocusRipple`, `disableTouchRipple`, `focusRipple`, `TouchRippleProps` and `touchRippleRef` props of `Tab`.
- [#1711](https://github.com/iTwin/stratakit/pull/1711): Deprecated inherited `in` and `timeout` props on `Backdrop` in favor of `open` and `transitionDuration` to avoid confusion.
- [#1797](https://github.com/iTwin/stratakit/pull/1797): Renamed `--stratakit-color-text-control-placeholder` to `--stratakit-color-text-neutral-placeholder`.
- [#1742](https://github.com/iTwin/stratakit/pull/1742): Deprecated `subheader` prop of `List`.
- [#1735](https://github.com/iTwin/stratakit/pull/1735): Deprecated `color` prop of `ListSubheader`.
- [#1718](https://github.com/iTwin/stratakit/pull/1718): Changed [MUI's spacing unit](https://mui.com/material-ui/customization/spacing/) to match StrataKit's. This will impact any spacing values provided to the `Stack` or `Grid` components, as well as any values passed to the `sx` prop. Double any existing values to maintain the same computed distance.
- [#1678](https://github.com/iTwin/stratakit/pull/1678): Deprecated `action`, `centerRipple`, `checkedIcon`, `color`, `disableFocusRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `icon`, `LinkComponent`, `size`, `TouchRippleProps`, and `touchRippleRef` props of `Radio`.
- [#1724](https://github.com/iTwin/stratakit/pull/1724): Deprecated `CssBaseline` and `ScopedCssBaseline` components.
- [#1743](https://github.com/iTwin/stratakit/pull/1743): Changed the default `disableUnderline` prop value of `Input` to `true`.
- [#1747](https://github.com/iTwin/stratakit/pull/1747): Deprecated `StepIcon`. StrataKit does not support custom icons in `Stepper`.
- [#1685](https://github.com/iTwin/stratakit/pull/1685): Deprecated `color` prop of `Alert`.
- [#1728](https://github.com/iTwin/stratakit/pull/1728): Deprecated `action`, `centerRipple`, `disableRipple`, `disableTouchRipple`, `dense`, `focusRipple`, `focusVisibleClassName`, `TouchRippleProps` and `touchRippleRef` props of `MenuItem`.
- [#1766](https://github.com/iTwin/stratakit/pull/1766): Deprecated `color` prop of `FormLabel`.
- [#1714](https://github.com/iTwin/stratakit/pull/1714): Deprecated `disablePrefersReduceMotion` prop of `Collapse`, `Fade`, `Grow`, `Slide` and `Zoom`.
- [#1734](https://github.com/iTwin/stratakit/pull/1734): Changed default value of `useFlexGap` prop of `Stack` to be true.
- [#1677](https://github.com/iTwin/stratakit/pull/1677): Deprecated `action`, `centerRipple`, `checkedIcon`, `color`, `disableFocusRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `icon`, `indeterminateIcon`, `LinkComponent`, `size`, `TouchRippleProps`, and `touchRippleRef` props of `Checkbox`.
- [#1725](https://github.com/iTwin/stratakit/pull/1725): Deprecated `color`, `shape` and `variant` props of `Pagination`
- [#1727](https://github.com/iTwin/stratakit/pull/1727): Deprecated `color` and `select` props of `TextField`.
- [#1720](https://github.com/iTwin/stratakit/pull/1720): Deprecated `color` prop of `ButtonGroup` component.
- [#1745](https://github.com/iTwin/stratakit/pull/1745): Deprecated `elevation`, `raised`, `square` and `variant` props of `Card`.
- [#1738](https://github.com/iTwin/stratakit/pull/1738): Deprecated `dividers` prop of `DialogContent`.
- [#1745](https://github.com/iTwin/stratakit/pull/1745): Deprecated `action`, `centerRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `TouchRippleProps` and `touchRippleRef` props of `CardActionArea` component.
- [#1695](https://github.com/iTwin/stratakit/pull/1695): Removed the following values from the `color` prop of `Link`: `"textSecondary"`, `"textTertiary"`, and `"textDisabled"`.
- [#1612](https://github.com/iTwin/stratakit/pull/1612): Deprecated `action`, `centerRipple`, `checkedIcon`, `color`, `disableFocusRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `icon`, `LinkComponent`, `TouchRippleProps`, and `touchRippleRef` props of `Switch`.
- [#1749](https://github.com/iTwin/stratakit/pull/1749): Deprecated `elevation` and `hideBackdrop` props of `SwipeableDrawer` component.
- [#1747](https://github.com/iTwin/stratakit/pull/1747): Deprecated `icon` prop of `StepLabel`.
- [#1762](https://github.com/iTwin/stratakit/pull/1762): Updated `Dialog`, `Popover` and `Drawer` to introduce a portal provider. All nested elements will be portaled to the portal container specified by the portal provider.
- [#1780](https://github.com/iTwin/stratakit/pull/1780): Deprecated `Toolbar` to avoid confusion with `Toolbar` from `@stratakit/structures`. This is replaced by a styled `div` in `AppBar`.
- [#1745](https://github.com/iTwin/stratakit/pull/1745): Deprecated `disableTypography` prop of `CardHeader`.
- [#1763](https://github.com/iTwin/stratakit/pull/1763): Deprecated `variant` prop of `FormHelperText`.
- [#1715](https://github.com/iTwin/stratakit/pull/1715): Deprecated `showLabel` prop of `BottomNavigationAction`.
- [#1733](https://github.com/iTwin/stratakit/pull/1733): The `showLabels` prop of `BottomNavigation` now defaults to `true`.
- [#1758](https://github.com/iTwin/stratakit/pull/1758): Removed tokens:

  - `--stratakit-color-bg-neutral-muted`
  - `--stratakit-color-bg-neutral-faded`

  - `--stratakit-color-bg-accent-faded`
  - `--stratakit-color-bg-accent-transparent`
  - `--stratakit-color-bg-positive-faded`
  - `--stratakit-color-bg-info-faded`
  - `--stratakit-color-bg-attention-faded`
  - `--stratakit-color-bg-critical-faded`

  - `--stratakit-color-bg-control-slider-track`
  - `--stratakit-color-bg-control-select`
  - `--stratakit-color-bg-control-scrollbar-canvas`

  - `--stratakit-color-text-neutral-faded`
  - `--stratakit-color-text-accent-faded`
  - `--stratakit-color-text-positive-faded`
  - `--stratakit-color-text-info-faded`
  - `--stratakit-color-text-attention-faded`
  - `--stratakit-color-text-critical-faded`

  - `--stratakit-color-text-glow-base-hover-%`
  - `--stratakit-color-text-glow-base-pressed-%`
  - `--stratakit-color-text-glow-strong-hover-%`
  - `--stratakit-color-text-glow-strong-pressed-%`

  - `--stratakit-color-icon-neutral-tertiary`
  - `--stratakit-color-icon-neutral-muted`
  - `--stratakit-color-icon-neutral-faded`
  - `--stratakit-color-icon-accent-faded`
  - `--stratakit-color-icon-positive-faded`
  - `--stratakit-color-icon-info-faded`
  - `--stratakit-color-icon-attention-faded`
  - `--stratakit-color-icon-critical-faded`

  - `--stratakit-color-icon-glow-base-hover-%`
  - `--stratakit-color-icon-glow-base-pressed-%`
  - `--stratakit-color-icon-glow-strong-hover-%`
  - `--stratakit-color-icon-glow-strong-pressed-%`

  - `--stratakit-color-border-page-depth`
  - `--stratakit-color-border-neutral-faded`
  - `--stratakit-color-border-accent-faded`
  - `--stratakit-color-border-positive-faded`
  - `--stratakit-color-border-info-faded`
  - `--stratakit-color-border-attention-faded`
  - `--stratakit-color-border-critical-faded`

  - `--stratakit-color-border-control-scrollbar-canvas`
  - `--stratakit-color-border-control-switch`
  - `--stratakit-color-border-control-checkbox`
  - `--stratakit-color-border-control-radio`
  - `--stratakit-color-border-control-textbox`
  - `--stratakit-color-border-control-select`
  - `--stratakit-color-border-control-navrail-item`

- [#1779](https://github.com/iTwin/stratakit/pull/1779): Deprecated `InitColorSchemeScript`.
- [#1764](https://github.com/iTwin/stratakit/pull/1764): Deprecated `variant` prop of `InputAdornment`.
- [#1699](https://github.com/iTwin/stratakit/pull/1699): Deprecated the `disableGutters` prop of `Accordion` and the `expandIcon` prop of `AccordionSummary`
- [#1706](https://github.com/iTwin/stratakit/pull/1706): Removed the following values from the `color` prop of `CircularProgress`: `"info"`, and `"inherit"`.
- [#1748](https://github.com/iTwin/stratakit/pull/1748): Deprecated `connector` prop of `Stepper`.
- [#1712](https://github.com/iTwin/stratakit/pull/1712): Deprecated `action`, `centerRipple`, `disableElevation`, `disableFocusRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `TouchRippleProps` and `touchRippleRef` props of `Button` component.
- [#1762](https://github.com/iTwin/stratakit/pull/1762): Updated `Modal`, `Popover`, `Popper` and all components that extend them to resolve the portal container from the portal context. This ensures that nested dialogs result in a nested DOM structure.
- [#1753](https://github.com/iTwin/stratakit/pull/1753): Deprecated `color`, `disableInjectingGlobalStyles`, `disableUnderline`, `IconComponent`, `notched` and `variant` props of `Select`.
- [#1743](https://github.com/iTwin/stratakit/pull/1743): Deprecated `color`, `disableUnderline` and `disableInjectingGlobalStyles` props of `Input`.
- [#1757](https://github.com/iTwin/stratakit/pull/1757): Deprecated `color`, `centerRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `shape`, `TouchRippleProps`, `touchRippleRef`, and `variant` props of `PaginationItem`.
- [#1701](https://github.com/iTwin/stratakit/pull/1701): Deprecated `action`, `centerRipple`, `color`, `disableRipple`, `disableFocusRipple`, `disableTouchRipple`, `focusRipple`, `fullWidth`, `TouchRippleProps` and `touchRippleRef` props of `ToggleButton` component.
- [#1722](https://github.com/iTwin/stratakit/pull/1722): Deprecated `arrow`, `disableFocusListener`, `disableHoverListener`, `disableInteractive`, `disableTouchListener`, `enterDelay`, `enterNextDelay`, `enterTouchDelay` and `followCursor` props of `Tooltip`.
- [#1741](https://github.com/iTwin/stratakit/pull/1741): Deprecated `action`, `centerRipple`, `disableFocusRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `TouchRippleProps` and `touchRippleRef` props of `IconButton`.
- [#1813](https://github.com/iTwin/stratakit/pull/1813): Updated the supported version of `react` and `react-dom` to `^19.0.0`. Short term the packages will continue to work with `^18.0.0`, but it is recommended to upgrade to React v19 to ensure future compatibility.
- [#1743](https://github.com/iTwin/stratakit/pull/1743): Deprecated `color` and `disableInjectingGlobalStyles` props of `InputBase`.
- [#1753](https://github.com/iTwin/stratakit/pull/1753): Deprecated `color`, `disableInjectingGlobalStyles` and `notched` props of `OutlinedInput`.
- [#1767](https://github.com/iTwin/stratakit/pull/1767): Deprecated `color`, `shrink`, and `variant` prop of `InputLabel`.
- [#1776](https://github.com/iTwin/stratakit/pull/1776): Deprecated `margin` prop from `FilledInput`, `FormControl`, `FormHelperText`, `InputBase`, `InputLabel`, `OutlinedInput` and `TextField`. Use CSS grid, CSS flexbox, `Grid` , or `Stack` to handle spacing between form controls.
- [#1701](https://github.com/iTwin/stratakit/pull/1701): Deprecated `action`, `centerRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `TouchRippleProps` and `touchRippleRef` props of `ButtonBase` component (applies to `Button` and other MUI components that extend `ButtonBase`).
- [#1801](https://github.com/iTwin/stratakit/pull/1801): Reworked `font-size` tokens to use semantic naming.

  | Old token                  | New token                                                                                                    |
  | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
  | `--stratakit-font-size-8`  | -                                                                                                            |
  | `--stratakit-font-size-10` | `--stratakit-font-size-caption-sm`                                                                           |
  | `--stratakit-font-size-11` | `--stratakit-font-size-caption-md`                                                                           |
  | `--stratakit-font-size-12` | `--stratakit-font-size-body-sm` or `--stratakit-font-size-subtitle-sm` or `--stratakit-font-size-caption-lg` |
  | `--stratakit-font-size-14` | `--stratakit-font-size-body-md` or `--stratakit-font-size-subtitle-md`                                       |
  | `--stratakit-font-size-16` | `--stratakit-font-size-body-lg` or `--stratakit-font-size-subtitle-lg`                                       |
  | `--stratakit-font-size-18` | `--stratakit-font-size-headline-sm`                                                                          |
  | `--stratakit-font-size-20` | `--stratakit-font-size-headline-md`                                                                          |
  | `--stratakit-font-size-24` | `--stratakit-font-size-headline-lg`                                                                          |
  | `--stratakit-font-size-28` | -                                                                                                            |
  | `--stratakit-font-size-32` | `--stratakit-font-size-display-sm`                                                                           |
  | `--stratakit-font-size-40` | -                                                                                                            |
  | `--stratakit-font-size-48` | `--stratakit-font-size-display-md`                                                                           |
  | `--stratakit-font-size-64` | `--stratakit-font-size-display-lg`                                                                           |

- [#1749](https://github.com/iTwin/stratakit/pull/1749): Deprecated `elevation` and `hideBackdrop` props of `Drawer` component.
- [#1704](https://github.com/iTwin/stratakit/pull/1704): Deprecated props related to `Table`.

  - `hideSortIcon` and `IconComponent` props on `TableSortLabel`.
  - `size` prop on `TableCell`.

- [#1701](https://github.com/iTwin/stratakit/pull/1701): Deprecated `color` prop of `ToggleButtonGroup` component.
- [#1650](https://github.com/iTwin/stratakit/pull/1650): The `color` prop of `Badge` no longer supports the `"primary"` value.
- [#1706](https://github.com/iTwin/stratakit/pull/1706): Deprecated `disableShrink`, `enableTrackSlot` and `thickness` props of `CircularProgress`.

### PNon-breaking changes

- [#1803](https://github.com/iTwin/stratakit/pull/1803): Added `line-height` tokens corresponding to each semantic `font-size` token:

  - `--stratakit-line-height-display-lg`
  - `--stratakit-line-height-display-md`
  - `--stratakit-line-height-display-sm`
  - `--stratakit-line-height-headline-lg`
  - `--stratakit-line-height-headline-md`
  - `--stratakit-line-height-headline-sm`
  - `--stratakit-line-height-body-lg`
  - `--stratakit-line-height-body-md`
  - `--stratakit-line-height-body-sm`
  - `--stratakit-line-height-subtitle-lg`
  - `--stratakit-line-height-subtitle-md`
  - `--stratakit-line-height-subtitle-sm`
  - `--stratakit-line-height-caption-lg`
  - `--stratakit-line-height-caption-md`
  - `--stratakit-line-height-caption-sm`
  - `--stratakit-line-height-mono-sm`

- [#1797](https://github.com/iTwin/stratakit/pull/1797): Updated placeholder text styling across various components.
- [#1705](https://github.com/iTwin/stratakit/pull/1705): Removed the following values from the `color` prop of `LinearProgress`: `"info"`, and `"inherit"`.
- [#1805](https://github.com/iTwin/stratakit/pull/1805): Added `border-radius` tokens:

  - `--stratakit-radius-sm`
  - `--stratakit-radius-md`
  - `--stratakit-radius-lg`
  - `--stratakit-radius-round`

- [#1794](https://github.com/iTwin/stratakit/pull/1794): Updated border color for `Badge`.
- Updated dependencies:
  - @stratakit/foundations@1.0.0-rc.0
  - @stratakit/internal-utils@0.2.0-rc.0

## 0.5.4

- [#1565](https://github.com/iTwin/stratakit/pull/1565): Added a dependency on `@stratakit/internal-utils` package.
- [#1744](https://github.com/iTwin/stratakit/pull/1744): Updated structure for `ListSubheader`. It now renders as a `div` by default and should be placed outside of the `ul` that it is labeling.
- [#1770](https://github.com/iTwin/stratakit/pull/1770): Updated `DatePicker` to show two weekdays characters instead of one.
- [#1777](https://github.com/iTwin/stratakit/pull/1777): Updated `IconButton` to automatically map the `title` prop to `label` for better compatibility with external components that use the native `title` attribute. The recommended approach is still to use the `label` prop.
- [#1783](https://github.com/iTwin/stratakit/pull/1783): Updated `Tooltip` to use `fixed` positioning strategy.
- [#1497](https://github.com/iTwin/stratakit/pull/1497): Updated values for the following tokens:
  - `--stratakit-color-border-neutral-base`
  - `--stratakit-color-border-neutral-muted`
  - `--stratakit-color-border-neutral-faded`
  - `--stratakit-color-border-neutral-disabled`
  - `--stratakit-color-border-page-base`
  - `--stratakit-color-border-page-depth`
  - `--stratakit-color-bg-elevation-level-1`
  - `--stratakit-color-bg-elevation-level-2`
- [#1497](https://github.com/iTwin/stratakit/pull/1497): Increased border color contrast across various components.
- [#1707](https://github.com/iTwin/stratakit/pull/1707): Updated borders for `Switch`.
- [#1709](https://github.com/iTwin/stratakit/pull/1709): Updated borders for `TextField` and other inputs.
- [#1719](https://github.com/iTwin/stratakit/pull/1719): Updated borders for `Button`.
- [#1710](https://github.com/iTwin/stratakit/pull/1710): Updated borders for `ToggleButtonGroup`.
- [#1774](https://github.com/iTwin/stratakit/pull/1774): Updated borders for `Checkbox`, `Radio`, `Slider`, and `Switch`.
- [#1773](https://github.com/iTwin/stratakit/pull/1773): Adjusted fallback palette values.
- [#1586](https://github.com/iTwin/stratakit/pull/1586), [#1770](https://github.com/iTwin/stratakit/pull/1770): Styled `DatePicker` to match the Strata visual design language.
- [#1608](https://github.com/iTwin/stratakit/pull/1608): Styled `DatePicker` input to match the Strata visual design language.
- [#1594](https://github.com/iTwin/stratakit/pull/1594): Styled `LinearProgress` to match the Strata visual design language.
- [#1594](https://github.com/iTwin/stratakit/pull/1594): Styled `CircularProgress` to match the Strata visual design language.
- [#1765](https://github.com/iTwin/stratakit/pull/1765): Fixed theme merging in `Autocomplete`.
- Updated dependencies:
  - @stratakit/foundations@0.5.0

## 0.5.3

- [#1657](https://github.com/iTwin/stratakit/pull/1657): Added `render` prop to `Accordion`'s `slotProps.heading`.
- [#1658](https://github.com/iTwin/stratakit/pull/1658): Updated portal container rendering to prevent an initially open `Dialog` incorrectly being `aria-hidden`.
- [#1665](https://github.com/iTwin/stratakit/pull/1665): Updated `Tooltip` component to be placed in the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer).
- [#1668](https://github.com/iTwin/stratakit/pull/1668): Fixed an issue where the viewport was still scrollable when a `Dialog` or `Drawer` was open.
- [#1651](https://github.com/iTwin/stratakit/pull/1651): Fixed a bug with `Tooltip` overflow causing scrollbars.
- [#1655](https://github.com/iTwin/stratakit/pull/1655): Deprecated MUI `SvgIcon` in favor of StrataKit's `Icon`.
- [#1676](https://github.com/iTwin/stratakit/pull/1676): Deprecated MUI `Icon` in favor of StrataKit's `Icon`.
- Updated dependencies:
  - @stratakit/foundations@0.4.10
  - @stratakit/icons@0.4.3

## 0.5.2

- [#1575](https://github.com/iTwin/stratakit/pull/1575): Added `size` prop to `Badge` when `inline`.
- [#1575](https://github.com/iTwin/stratakit/pull/1575): Increased default size of `Badge` when `inline`.
- [#1642](https://github.com/iTwin/stratakit/pull/1642): Removed `role="separator"` from `Divider` when `children` is passed.
- [#1622](https://github.com/iTwin/stratakit/pull/1622): Changed `Divider` `variant="middle"` styling to work in toolbars.
- [#1628](https://github.com/iTwin/stratakit/pull/1628): Fixed a bug where `AvatarGroup` would render an empty listitem, causing incorrect mask application.
- [#1562](https://github.com/iTwin/stratakit/pull/1562): Updated `TableSortLabel` to use StrataKit icons.
- [#1635](https://github.com/iTwin/stratakit/pull/1635): Fixed bug to allow typography overrides on `FormControlLabel`
- Updated dependencies:
  - @stratakit/icons@0.4.2

## 0.5.1

- [#1543](https://github.com/iTwin/stratakit/pull/1543): Added a `type` prop to `Badge` which accepts `"outlined"`, `"muted"`, or `"strong"`.
- [#1614](https://github.com/iTwin/stratakit/pull/1614): Added a `margin` prop to `Divider`.
- [#1576](https://github.com/iTwin/stratakit/pull/1576): Added icon styling to `Badge`.
- [#1613](https://github.com/iTwin/stratakit/pull/1613): Fixed `Slider` when `track` prop is set to `"inverted"`.
- [#1571](https://github.com/iTwin/stratakit/pull/1571): Increased contrast of `Tabs` icons and labels.
- [#1580](https://github.com/iTwin/stratakit/pull/1580): Fixed text alignment for buttons in `DatePicker` and `TimePicker`.
- [#1570](https://github.com/iTwin/stratakit/pull/1570): Fixed spacing for `Alert` when used with an action.
- [#1615](https://github.com/iTwin/stratakit/pull/1615): Fixed a bug preventing the `role` prop on `Alert` from being applied.
- [#1605](https://github.com/iTwin/stratakit/pull/1605): Fixed the size of `DialogTitle`.
- [#1557](https://github.com/iTwin/stratakit/pull/1557): Updated colors for `Rating` component.
- [#1590](https://github.com/iTwin/stratakit/pull/1590): Updated `Rating` to display focus ring around the entire component intead of individual values.
- [#1589](https://github.com/iTwin/stratakit/pull/1589): Fixed a visual bug with non-integer `precision` prop for `Rating` component.
- [#1568](https://github.com/iTwin/stratakit/pull/1568): Changed the `key` used for `@emotion/cache`.
- Updated dependencies:
  - @stratakit/icons@0.4.1

## 0.5.0

### Breaking changes

- [#1388](https://github.com/iTwin/stratakit/pull/1388): Changed the `Alert` component's `role` from `"alert"` to [`"group"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/group_role). The `Alert` will no longer be a live region by default. The `AlertTitle` subcomponent will now provide the accessible name for the `Alert`.
- [#1540](https://github.com/iTwin/stratakit/pull/1540): Updated the default `severity` of `Alert` to a newly added `"none"` value.
- [#1422](https://github.com/iTwin/stratakit/pull/1422): Removed the `variant` prop from `Avatar` and `AvatarGroup`.
- [#1549](https://github.com/iTwin/stratakit/pull/1549): Changed the stock heading and subtitle variants of the `Typography` component to render as `<h2>` elements by default, except for the `"h1"` variant which still renders as `<h1>`. For all of these variants, the `render` prop is now required.
- [#1505](https://github.com/iTwin/stratakit/pull/1505): Removed `color="secondary"` from `Typography`.
- [#1547](https://github.com/iTwin/stratakit/pull/1547): Updated types for `Typography` so that `render` prop is required for heading-like variants.
- [#1503](https://github.com/iTwin/stratakit/pull/1503): Removed support for `textColor="inherit"` from `Tabs`.
- [#1503](https://github.com/iTwin/stratakit/pull/1503): Removed support for the `indicatorColor` prop from `Tabs`.
- [#1530](https://github.com/iTwin/stratakit/pull/1530): Removed support for the `scrollButtons` prop from `Tabs`.
- [#1530](https://github.com/iTwin/stratakit/pull/1530): Removed support for the `allowScrollButtonsMobile` prop from `Tabs`.
- [#1493](https://github.com/iTwin/stratakit/pull/1493): Removed support for the `underline` prop from `Link`.
- [#1483](https://github.com/iTwin/stratakit/pull/1483): Disabled the `storageManager` in `ThemeProvider`. The `colorScheme` must now be manually synchronized to `localStorage` if you want to persist it across sessions.

### Non-breaking changes

- [#1513](https://github.com/iTwin/stratakit/pull/1513): Updated the default portal container of `Autocomplete`, `Dialog`, `Drawer`, `Menu`, `Modal`, `Popover`, `Popper`, `Select`, `SwipeableDrawer` and `Tooltip` components to use the root portal container instead of the `<body>` element.
- Typography:
  - [#1433](https://github.com/iTwin/stratakit/pull/1433): Added several new variants to the `Typography` component: `display-*`, `heading-*`, `subheading-*`, `body-*`, `caption-*` and `mono-sm`. These variants match the ones that were originally available in the `Text` component from `@stratakit/bricks`.
  - [#1516](https://github.com/iTwin/stratakit/pull/1516): Adjusted sizes for `caption-*` typography variants.
  - [#1551](https://github.com/iTwin/stratakit/pull/1551): Adjusted sizes for the `display-*` and `headline-°` typography variants.
  - [#1505](https://github.com/iTwin/stratakit/pull/1505): Added `color="textTertiary"` to `Typography`.
  - [#1505](https://github.com/iTwin/stratakit/pull/1505): Fixed styling for `Typography` colors.
  - [#1433](https://github.com/iTwin/stratakit/pull/1433): Updated the default `variant` of `Typography` to `"inherit"`.
- Accordion:
  - [#1514](https://github.com/iTwin/stratakit/pull/1514): Improved styling of adjacent `Accordion`s.
  - [#1499](https://github.com/iTwin/stratakit/pull/1499): Indent `AccordionDetails` when the summary marker is left-aligned.
  - [#1477](https://github.com/iTwin/stratakit/pull/1477): Added responsive `AccordionSummary` marker placement, with a new `markerPlacement` prop to force the marker to the start or end.
  - [#1498](https://github.com/iTwin/stratakit/pull/1498): Updated `Accordion` to use `slots.root` instead of `slotProps.root` for setting the default value of the `square` prop.
  - [#1525](https://github.com/iTwin/stratakit/pull/1525): Improved animations for `Accordion`.
- Autocomplete:
  - [#1216](https://github.com/iTwin/stratakit/pull/1216): Changed tab order of `Autocomplete` component so that input comes before the selected chips ("tags").
  - [#1216](https://github.com/iTwin/stratakit/pull/1216): Added [`list`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/list_role) and [`listitem`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/listitem_role) semantics to tags of `Autocomplete` component.
  - [#1507](https://github.com/iTwin/stratakit/pull/1507): Fixed `Autocomplete` options size when `size="small"`.
- Card:
  - [#1494](https://github.com/iTwin/stratakit/pull/1494): Fixed `Card` ignoring the `role` prop.
  - [#1548](https://github.com/iTwin/stratakit/pull/1548): Changed the default `variant` of `Card` to `"outlined"`.
  - [#1510](https://github.com/iTwin/stratakit/pull/1510): `CardContent` will now use `--stratakit-color-text-neutral-secondary` for its descendants.
  - [#1504](https://github.com/iTwin/stratakit/pull/1504): Added fallback handling for when `CardActionArea` is rendered as an ancestor of the `CardHeader` title.
- Tabs:
  - [#1522](https://github.com/iTwin/stratakit/pull/1522): Added `size` prop to `Tabs`.
  - [#1503](https://github.com/iTwin/stratakit/pull/1503): Styled `Tabs` to match the Strata visual design language.
  - [#1530](https://github.com/iTwin/stratakit/pull/1530): Improved visuals of `Tabs` scroll buttons.
- [#1523](https://github.com/iTwin/stratakit/pull/1523): Fixed `Alert` icon shrinking issue.
- [#1423](https://github.com/iTwin/stratakit/pull/1423): `AvatarGroup` uses a mask rather than a border to achieve the overlapping `Avatar` cutout effect.
- [#1545](https://github.com/iTwin/stratakit/pull/1545): Removed `aria-hidden` from inline `Badge` when used with `@mui/material@^9.1.0`.
- [#1493](https://github.com/iTwin/stratakit/pull/1493): Improved styling for static `Link`.
- [#1483](https://github.com/iTwin/stratakit/pull/1483): Disabled transitions and double rendering in `ThemeProvider`.
- [#1482](https://github.com/iTwin/stratakit/pull/1482): Added hover & disabled styling to `Chip`.
- [#1508](https://github.com/iTwin/stratakit/pull/1508): Fixed `InputLabel` styles for `size="small"`.
- [#1491](https://github.com/iTwin/stratakit/pull/1491): Fixed `FormControlLabel` layout when `labelPlacement` is `top` or `bottom`.
- [#1476](https://github.com/iTwin/stratakit/pull/1476): Fixed `Slider` cursor when active.
- [#1511](https://github.com/iTwin/stratakit/pull/1511): Updated spacing for `RadioGroup` and `FormGroup`.
- [#1544](https://github.com/iTwin/stratakit/pull/1544): Fixed aspect ratio issue present in some versions of Safari.
- [#1550](https://github.com/iTwin/stratakit/pull/1550): Updated the sizes of stock MUI typography variants.
- [#1471](https://github.com/iTwin/stratakit/pull/1471): Updated `MenuItem` styling to support `role="menuitemradio"` and `role="menuitemcheckbox"` with `aria-checked`.
- [#1527](https://github.com/iTwin/stratakit/pull/1527): The `Divider` is rendered as a `<div>` element when `role="presentation"` is set.
- [#1539](https://github.com/iTwin/stratakit/pull/1539): Fixed `edge` prop for `IconButton`.
- [#1495](https://github.com/iTwin/stratakit/pull/1495): Disabled scroll lock for `Popover`, `Menu` and `Select` components so that the page can still be scrolled when the popup is open.
- [#1492](https://github.com/iTwin/stratakit/pull/1492): Added fallback mechanism for automatically labelling `Menu` and `Popover` components using `anchorEl`.
- Updated dependencies:
  - @stratakit/foundations@0.4.9
  - @stratakit/icons@0.4.0

## 0.4.2

- [#1464](https://github.com/iTwin/stratakit/pull/1464): Removed `role="dialog"` from the `paper` slot of the `Menu` component.
- [#1455](https://github.com/iTwin/stratakit/pull/1455): Added minimum size to the `Dialog` component.
- [#1451](https://github.com/iTwin/stratakit/pull/1451): Fixed pagination disabled and disabled + active styling.
- [#1456](https://github.com/iTwin/stratakit/pull/1456): Improved `MenuItem` styling by adding active + hover state styling.
- [#1453](https://github.com/iTwin/stratakit/pull/1453): Improved `ToggleButton` styling by fixing active + disabled state and added active + hover state.
- [#1465](https://github.com/iTwin/stratakit/pull/1465): Improved `Alert` styling by adjusting gap, alignment and icon colors.
- [#1469](https://github.com/iTwin/stratakit/pull/1469): Fixed `Rating` component collapsing to zero width in Safari.
- Updated dependencies:
  - @stratakit/icons@0.3.2

## 0.4.1

- [#1442](https://github.com/iTwin/stratakit/pull/1442): Added a new `labelPlacement` prop to `IconButton` and `ToggleButton` components to control the placement of a tooltip that is shown when the `label` prop is specified.
- [#1393](https://github.com/iTwin/stratakit/pull/1393): Added ability to display text in the `ToggleButton` when rendered as a `Button`.
- [#1444](https://github.com/iTwin/stratakit/pull/1444): Enabled `hover` prop for `TableRow` when inside `TableBody`.
- [#1416](https://github.com/iTwin/stratakit/pull/1416): `Typography` will now log a warning during development if a heading variant is used without explicitly setting the `render` prop. This change is to help developers ensure correct heading structure.
- Accessibility improvements:
  - [#1417](https://github.com/iTwin/stratakit/pull/1417): `AvatarGroup` DOM order now matches the visual display order.
  - [#1437](https://github.com/iTwin/stratakit/pull/1437): Added list semantics to `AvatarGroup` and nested `Avatar`s.
  - [#1420](https://github.com/iTwin/stratakit/pull/1420): Add `role="dialog"` to `Popover`'s `paper` slot.
  - [#1215](https://github.com/iTwin/stratakit/pull/1215): Added [`group` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/group_role) to `Autocomplete`.
- Styling changes:
  - [#1360](https://github.com/iTwin/stratakit/pull/1360): Updated styling for `Table` row height & hover state.
  - [#1431](https://github.com/iTwin/stratakit/pull/1431): Fixed visual appearance of `Switch` thumb.
  - [#1428](https://github.com/iTwin/stratakit/pull/1428): Decreased the font-size of `DialogContentText`.
  - [#1432](https://github.com/iTwin/stratakit/pull/1432): Updated `Typography` styles for `"subtitle1"` and `"subtitle2"` variants.
  - [#1424](https://github.com/iTwin/stratakit/pull/1424): Styled `Slider`'s mark labels to match the Strata visual design language.
  - [#1398](https://github.com/iTwin/stratakit/pull/1398): Styled `Slider`'s tooltip to match the Strata visual design language.
  - [#1393](https://github.com/iTwin/stratakit/pull/1393): Styled `ToggleButton` to visually match the `IconButton` component.
  - [#1430](https://github.com/iTwin/stratakit/pull/1430): Adjusted spacing between `CardHeader` and `CardContent` / `CardActions`.
  - [#1426](https://github.com/iTwin/stratakit/pull/1426): The `AvatarGroup` surplus element no longer defaults to uppercase.

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
