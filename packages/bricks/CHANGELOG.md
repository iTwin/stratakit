# Changelog

## 0.2.0

### Minor Changes

- [#704](https://github.com/iTwin/design-system/pull/704): The following components have been moved from `@stratakit/bricks` into `@stratakit/structures`.

  - `unstable_AccordionItem`
  - `unstable_Banner`
  - `Chip`
  - `DropdownMenu`
  - `unstable_ErrorRegion`
  - `Table`
  - `Tabs`
  - `unstable_Toolbar`
  - `Tree`

- [#708](https://github.com/iTwin/design-system/pull/708): The previously-deprecated `Root` and `Icon` components have been removed from `@stratakit/bricks`, since they were moved to `@stratakit/foundations`.

### Patch Changes

- Updated dependencies:
  - @stratakit/foundations@0.1.2

## 0.1.2

- [#686](https://github.com/iTwin/design-system/pull/686): Corrected font weight of `AccordionItem.Label` to 500/medium.
- [#689](https://github.com/iTwin/design-system/pull/689): Corrected the text size of `Description`, `Field.Description`, and `Field.ErrorMessage` to use `caption-lg`.
- [#694](https://github.com/iTwin/design-system/pull/694): Fixed `<Switch>` animation so it plays smoothly on all platforms.
- Updated dependencies:
  - @stratakit/foundations@0.1.2

## 0.1.1

- [#528](https://github.com/iTwin/design-system/pull/528): Added new `unstable_AccordionItem` component for showing/hiding content.
- [#484](https://github.com/iTwin/design-system/pull/484): Added new `unstable_Banner` component for highlighting information.
- [#678](https://github.com/iTwin/design-system/pull/678): Added new `placement` prop to `Tooltip`.
- [#639](https://github.com/iTwin/design-system/pull/639): Improved live regions in `unstable_ErrorRegion` component. Live region announcements will only be made when a new item is added.
- Styling changes
  - [#676](https://github.com/iTwin/design-system/pull/676): Added a small gap between `Kbd`'s children for better spacing.
  - [#659](https://github.com/iTwin/design-system/pull/659): Fixed responsive design issues in `unstable_ErrorRegion` (again).
- Updated dependencies:
  - @stratakit/foundations@0.1.1

## @stratakit/bricks@0.1.0

- **breaking**: Package name changed to `@stratakit/bricks`.
- Added `@stratakit/foundations` as a peer dependency. See [#640](https://github.com/iTwin/design-system/pull/640).
- Deprecated `Root` and `Icon` components (moved into `@stratakit/foundations`).
- New features:
  - Added `value` prop to `ProgressBar` component.
- Styling changes:
  - Added expand/collapse animation to `ErrorRegion`.
  - Added pulse animation to `ErrorRegion`.
  - Fixed responsive design issues in `ErrorRegion`.
  - Added `-webkit-tap-highlight-color` to interactive controls.
  - Improved forced colors styling for `TextBox`.

## @itwin/itwinui-react@​5.0.0-alpha.X

Changelog entries for `@itwin/itwinui-react@5.0.0-alpha.14` and older can be found in the [`CHANGELOG.md` for `@stratakit/bricks@0.1.0`](https://github.com/iTwin/design-system/blob/%40stratakit/bricks%400.1.0/packages/bricks/CHANGELOG.md).
