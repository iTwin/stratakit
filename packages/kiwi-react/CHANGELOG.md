# Changelog

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
