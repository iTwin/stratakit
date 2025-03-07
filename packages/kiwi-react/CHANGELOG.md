# Changelog

## 5.0.0-alpha.9

- Added `dot` prop to `<IconButton>` for showing a small "dot" next to the icon.
- Added `unstable_decorations` prop to `<Tree.Item>` for showing multiple decorations (e.g. icons).
- **breaking**: Replaced `<DropdownMenu.Item>` children with new `label` prop (see [#423](https://github.com/iTwin/design-system/pull/423)).
- Added `icon` prop to `<DropdownMenu.Item>` and `<DropdownMenu.CheckboxItem>`.
- Updated the `shortcuts` prop of `<DropdownMenu.Item>` to recognize predefined "symbols" (e.g. modifier keys).
- Updated `<Anchor>` and `<Badge>` visuals to match the latest design.
- Fixed forced-colors mode styling for `DropdownMenu`.

## 5.0.0-alpha.8

- Added `description` prop to `<Tree.Item>` component for showing "sublabels".
- **breaking**: Updated `<Text>` component to require `variant` prop.
- (soft breaking) Removed `children` from `<Tree.Item>` prop types.
- Updated `DropdownMenu` padding.

## 5.0.0-alpha.7

- Added new `<Avatar>` component.
- Added new `<Badge>` component.
- Added `alt` prop to `<Icon>` component.
- Fixed all color tokens to use the correct `oklch` values.
- Fixed an issue where `<Tree.Item>` was not respecting its `style` prop.

## 5.0.0-alpha.6

- **breaking**: All CSS variables have been renamed to use the `--ids` prefix. See [#369](https://github.com/iTwin/kiwi/pull/369).
- **breaking**: Some CSS variables were renamed further. See [#368](https://github.com/iTwin/kiwi/pull/368).
  - Notably, the "surface" backgrounds have been split into two different "page" and "elevation" scales.
- Background colors have been updated to match the latest design.
- All styles are now loaded into `@layer itwinui`. The one exception is the CSS reset which remains in `@layer reset`.
- `<Field>` now respects the order of `<Description>`s when creating associations.

## 5.0.0-alpha.5

- **breaking**: `Tree` API has changed to require flat structure, with explicit ARIA props (see [#300](https://github.com/iTwin/kiwi/pull/300)). `<Tree.Item>` no longer allows passing `children`.
- **breaking**: `Tree.Item`s `action` prop now requires a list of `<Tree.ItemAction>` components (see [#355](https://github.com/iTwin/kiwi/pull/355) and [#362](https://github.com/iTwin/kiwi/pull/362)).
- **breaking**: Replaced `<Chip>` children with new `label` prop (see [#349](https://github.com/iTwin/kiwi/pull/349)).
- Added `<Tree.ItemAction>` component with `visible` prop for more granular control over action visibility.
- Updated the layout of `<Field>` so that `<Description>` is placed in the best spot according on the label position and control type.
- `<Field>` now considers the presence of explicit control `id`s when creating associations.

## 5.0.0-alpha.4

- Added `onDismiss` prop and dismiss button to `<Chip>`.
- Fixed a rare issue where `TextBox` was still editable when `disabled`.
- Fixed "forced colors" mode styling for `<Button>` and `<IconButton>`.
- Explicitly set typography styles on `<Root>` to improve compatibility with iTwinUI theme bridge.
- Updated `DropdownMenu` visuals.

## 5.0.0-alpha.3

- Added `<DropdownMenu.CheckboxItem>` component for rendering menu items with a checkable state.
- Added `variant` prop to `<Select.HtmlSelect>` component for displaying different visual variants of the component.
- Updated event handling of `Tree` components to avoid firing `onClick` event of the `<Tree.Item>` component when the expander or one of the actions is clicked.
- Updated `Tree` components to implement a tree view pattern instead of the previously used nested list approach.
- Updated size and spacing of `<Tree.Item>`, `<DropdownMenu.Item>` and `<Select>` components.
- Fixed `<Label>` component alignment with `TextBox` components.
- Fixed action rendering of `<Tree.Item>` component.
- Fixed `<Checkbox>` component styling, which caused the mixed checkbox to be displayed as unchecked in the light theme.

## 5.0.0-alpha.2

- Added initial `Tree` component, exposed as `<Tree.Root>` and `<Tree.Item>` subcomponents.
- Added initial `<Spinner>` component for indicating quick, indeterminate progress.
- Added `<Description>` component to be used within a `<Field>`.
- Added initial `<Chip>` component.
- Added `symbol` prop to `<Kbd>` for displaying predefined symbols.
- Added `focusable` prop to `<Tabs.TabPanel>` component.
- Fixed a visual issue where light color-scheme was using dark shadows.

## 5.0.0-alpha.1

- Added `<Text>` component with a `variant` prop to support all text styles from Figma.
- Added `Select` component built on top of the HTML `<select>` element. Exposed as `<Select.Root>` and `<Select.HtmlSelect>`.
- Added `shortcuts` prop to `<DropdownMenu.Item>`.
- Added JSDoc comments to all components for inline IDE hints.
- Fixed `<Kbd>` component using the wrong font.
- Fixed some visual issues.

## 5.0.0-alpha.0

Initial release 🥳
