# Changelog

## 0.5.1

### Patch Changes

- [#1072](https://github.com/iTwin/design-system/pull/1072): Added `bleed` prop to `Divider` component to extend it to the edges of its first ancestor container.
- [#1068](https://github.com/iTwin/design-system/pull/1068): Added `icon` to `Badge`.
- [#1060](https://github.com/iTwin/design-system/pull/1060): Added icon to `Field.ErrorMessage`.
- [#1018](https://github.com/iTwin/design-system/pull/1018): Visual updates to `Select` to match Figma.
- Updated dependencies:
  - @stratakit/foundations@0.4.0

## 0.5.0

### Breaking changes

- [#956](https://github.com/iTwin/design-system/pull/956): Removed `isActive` from `IconButton` component. This has been replaced by the `active` prop.
- [#950](https://github.com/iTwin/design-system/pull/950): Removed `tone="critical"` from `Anchor` component.

### Non-breaking changes

- [#983](https://github.com/iTwin/design-system/pull/983): `Anchor` will now inherit the surrounding `font-size`.
- [#1041](https://github.com/iTwin/design-system/pull/1041): Updated the type of `render` function for `Field.Control` to omit `children`, so that it no longer raises an error when used with `TextBox.Input`.
- [#1040](https://github.com/iTwin/design-system/pull/1040): Added invalid state styling to `Checkbox` and `Radio`.
- [#1035](https://github.com/iTwin/design-system/pull/1035): Fixed indeterminate state styling for `Checkbox` and `Radio` components (hover and disabled visuals now apply correctly).
- [#1056](https://github.com/iTwin/design-system/pull/1056): Added `forced-colors` styling to `Field.ErrorMessage`.
- [#1058](https://github.com/iTwin/design-system/pull/1058): Fixed improper `forced-colors` styling of `TextBox`.
- [#982](https://github.com/iTwin/design-system/pull/982): Updated `background-color` variable used by `TextBox`.
- [#1003](https://github.com/iTwin/design-system/pull/1003): Enabled React Compiler for production build. In React 18 apps, `react-compiler-runtime` dependency will be used.
- Updated dependencies:
  - @stratakit/foundations@0.4.0

## 0.4.5

- [#975](https://github.com/iTwin/design-system/pull/975): Fixed an overflow issue in `Tooltip`. Long words will now correctly break across multiple lines.
- Updated dependencies:
  - @stratakit/foundations@0.3.5

## 0.4.4

- [#892](https://github.com/iTwin/design-system/pull/892): Added invalid state styling to `TextBox`.
- [#955](https://github.com/iTwin/design-system/pull/955): Fixed `IconButton` active state semantics. It will now use `aria-current` instead of `aria-pressed` when rendered as an anchor.
- Updated dependencies:
  - @stratakit/foundations@0.3.4

## 0.4.3

- [#945](https://github.com/iTwin/design-system/pull/945): The `"critical"` tone value for `Anchor` has been deprecated and will be removed in a future release.
- Updated dependencies:
  - @stratakit/foundations@0.3.3

## 0.4.2

- [#938](https://github.com/iTwin/design-system/pull/938): Explicitly set the `Avatar`'s icon color to prevent accidentally inheriting the wrong color.
- [#934](https://github.com/iTwin/design-system/pull/934): Fixed visual inconsistencies between convenience and composition methods of `TextBox`.
- Updated dependencies:
  - @stratakit/foundations@0.3.2

## 0.4.1

- [#926](https://github.com/iTwin/design-system/pull/926): Added new `active` prop to `IconButton` and deprecated the existing `isActive` prop.

  The `active` prop is consistent with the naming convention followed by other boolean props in StrataKit.

- Updated dependencies:
  - @stratakit/foundations@0.3.1

## 0.4.0

- [#913](https://github.com/iTwin/design-system/pull/913): Updated internal CSS selectors in every component.
- [#904](https://github.com/iTwin/design-system/pull/904): Updated color of `Divider` component to match the latest design specification.
- Updated dependencies:
  - @stratakit/foundations@0.3.0

## 0.3.4

- [#881](https://github.com/iTwin/design-system/pull/881): Updated CSS to use `--stratakit-space-` variables instead of hardcoded values in all components.
  - Replaced hardcoded `rem` spacing values with new `px`-based variables in many components.
- [#881](https://github.com/iTwin/design-system/pull/881): In `Anchor`, changed hover state's `text-underline-offset` from `3px` to `4px`.
- [#866](https://github.com/iTwin/design-system/pull/866): Fixed regression in `ProgressBar`'s `reduced-motion` animation.
- [#866](https://github.com/iTwin/design-system/pull/866): Slowed down `reduced-motion` animation in `Spinner` and `ProgressBar`.
- Updated dependencies:
  - @stratakit/foundations@0.2.3

## 0.3.3

- [#863](https://github.com/iTwin/design-system/pull/863): Update the `background-color` for the "hover" and "pressed" states of `<Button variant="ghost">` and `<Button variant="outline">`.
- [#852](https://github.com/iTwin/design-system/pull/852): Removed spinner slowed down animation after 4 counts.
- Updated dependencies:
  - @stratakit/foundations@0.2.2

## 0.3.2

- [#757](https://github.com/iTwin/design-system/pull/757): Added compositional `Anchor.Root` component. This new component can be used when you need fine grained configuration.

  To use the compositional components, import them from the `/Anchor` subpath:

  ```tsx
  import * as Anchor from "@stratakit/bricks/Anchor";

  <Anchor.Root href="https://www.example.com">Example</Anchor.Root>;
  ```

- [#800](https://github.com/iTwin/design-system/pull/800): Added `<Anchor.Text>` and `<Anchor.ExternalMarker />` for composition API.
- [#836](https://github.com/iTwin/design-system/pull/836): Added `tone="accent"` to `<Button variant="ghost">`.
- [#837](https://github.com/iTwin/design-system/pull/837): Added `tone="accent"` to `<Button variant="outline">`.
- [#831](https://github.com/iTwin/design-system/pull/831): Updated `isActive` state styling for `IconButton`.
- [#831](https://github.com/iTwin/design-system/pull/831): Made `isActive` prop available to all variants of `IconButton`.
- [#798](https://github.com/iTwin/design-system/pull/798): Adjusted `Field` styling to use `justify-content: stretch` for textlike controls in stacked layout.

- Updated dependencies:
  - @stratakit/foundations@0.2.1

## 0.3.1

- [#773](https://github.com/iTwin/design-system/pull/773): Added [subpath exports](https://nodejs.org/api/packages.html#subpath-exports) for individual components. These new exports allow StrataKit to expose both convenience and compositional APIs of the same component.

  ```tsx
  // Convenience import
  import Chip from "@stratakit/structures/Chip";
  // Alternative
  import { default as Chip } from "@stratakit/structures/Chip";

  <Chip />;
  ```

  ```tsx
  // Compositional import
  import * as Chip from "@stratakit/structures/Chip";

  <Chip.Root>
  	<Chip.Label>Label</Chip.Label>
  	<Chip.DismissButton />
  </Chip.Root>;
  ```

  Compositional components are useful for building custom components that require more control over the structure and behavior, while convenience components provide a ready-to-use solution for common use cases. See [#405](https://github.com/iTwin/design-system/discussions/405) for more details.

  APIs exported from the barrel file are not changed in this release. Some exported components are compositional, while others are convenience components.

  ```tsx
  // Chip is exported as a convenience API in the barrel file:
  import { Chip } from "@stratakit/structures";

  <Chip />;
  ```

- [#792](https://github.com/iTwin/design-system/pull/792): Removed `aria-hidden` from the `Tooltip` element.
- [#801](https://github.com/iTwin/design-system/pull/801): Fixed padding for `Textbox.Textarea` when used with an icon.

- Updated dependencies:
  - @stratakit/foundations@0.2.0

## 0.3.0

### Breaking changes

- [#758](https://github.com/iTwin/design-system/pull/758): Removed `onToggle` prop from `Switch` types to prevent misuse of unapplicable props.
- [#742](https://github.com/iTwin/design-system/pull/742): Removed `size="small"` from `ProgressBar`.

### Non-breaking changes

- [#755](https://github.com/iTwin/design-system/pull/755): Updated the code for icons used internally by components.
- [#767](https://github.com/iTwin/design-system/pull/767): Removed unused `children` prop from 'AvatarProps` type.
- [#745](https://github.com/iTwin/design-system/pull/745): Fixed a `ref` type of `Field.Label` component to use the `HTMLLabelElement` instead of `HTMLDivElement`.
- Updated dependencies:
  - @stratakit/foundations@0.1.6

## 0.2.1

- [#736](https://github.com/iTwin/design-system/pull/736): Updated the `label` prop type in the `<Badge />` component from `string` to `ReactNode`.
- [#740](https://github.com/iTwin/design-system/pull/740): Added `types` field to `package.json` file for better TypeScript support and TS icon on `npm`.
- Updated dependencies:
  - @stratakit/foundations@0.1.5

## 0.2.0

### Breaking changes

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

### Non-breaking changes

- Updated dependencies:
  - @stratakit/foundations@0.1.3

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
