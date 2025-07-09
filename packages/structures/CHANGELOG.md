# Changelog

## 0.2.3

- [#788](https://github.com/iTwin/design-system/pull/788): Updated `Tabs.Tab` component to support optional start and end icons.

  ```tsx
  // Add end icon to a tab.
  <Tabs.Tab id="tab-1">
    Tab 1
    <Icon href={…} />
  </Tabs.Tab>
  ```

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

- [#763](https://github.com/iTwin/design-system/pull/763): Added compositional `Chip.Root`, `Chip.Label` and `Chip.DismissButton` components. These new components can be used when you need fine grained configuration.

  To use the compositional components, import them from the `/Chip` subpath:

  ```tsx
  import * as Chip from "@stratakit/structures/Chip";

  <Chip.Root>
  	<Chip.Label>Label</Chip.Label>
  	<Chip.DismissButton onClick={onDismiss} />
  </Chip.Root>;
  ```

- [#815](https://github.com/iTwin/design-system/pull/815): Fixed an issue where Toolbar was using Context as a component which doesn't work in React 18.
- [#781](https://github.com/iTwin/design-system/pull/781): Updated `Chip.Label` component styling when rendered as a button.
- [#793](https://github.com/iTwin/design-system/pull/793): Added `zustand` as a dependency.

- Updated dependencies:
  - @stratakit/foundations@0.2.0
  - @stratakit/bricks@0.3.1

## 0.2.2

- [#756](https://github.com/iTwin/design-system/pull/756): `DropdownMenu.Button` will now ignore `render={undefined}`.
- [#755](https://github.com/iTwin/design-system/pull/755): Updated the code for icons used internally by components.
- Updated dependencies:
  - @stratakit/bricks@0.3.0
  - @stratakit/foundations@0.1.6

## 0.2.1

- [#736](https://github.com/iTwin/design-system/pull/736): Updated the `label` prop type in the `<Chip />` component from `string` to `ReactNode`.
- [#740](https://github.com/iTwin/design-system/pull/740): Added `types` field to `package.json` file for better TypeScript support and TS icon on `npm`.
- [#737](https://github.com/iTwin/design-system/pull/737): Fixed console warnings raised from `<Tree.Item>` component.
- Updated dependencies:
  - @stratakit/foundations@0.1.5
  - @stratakit/bricks@0.2.1

## 0.2.0

### Breaking changes

- [#720](https://github.com/iTwin/design-system/pull/720): Renamed `onExpandedChange` prop for `unstable_ErrorRegion.Root` to `setOpen`.
  Renamed `expanded` prop for `unstable_ErrorRegion.Root` to `open`.
- [#709](https://github.com/iTwin/design-system/pull/709): `unstable_AccordionItem` breaking changes:

  - `AccordionItem.Trigger` renamed to `AccordionItem.Header` and no longer represents the underlying `<button>` element (see `AccordionItem.Label`).
  - `AccordionItem.Label` must be wrapped with the new `AccordionItem.Button`.

  ```diff
   <AccordionItem.Root>
  +  <AccordionItem.Header>
  -  <AccordionItem.Trigger>
  +    <AccordionItem.Button>
  +      <AccordionItem.Label>Label</AccordionItem.Label>
  +    </AccordionItem.Button>
  -    <AccordionItem.Label>Label</AccordionItem.Label>
  +  </AccordionItem.Header>
  -  </AccordionItem.Trigger>
     <AccordionItem.Content>Body</AccordionItem.Content>
   </AccordionItem.Root>
  ```

- [#720](https://github.com/iTwin/design-system/pull/720): Renamed `onOpenChange` prop for `unstable_AccordionItem.Root` to `setOpen`.

### Non-breaking changes

- [#709](https://github.com/iTwin/design-system/pull/709): Introduce `unstable_AccordionItem.Heading` component for wrapping `unstable_AccordionItem.Button` and `unstable_AccordionItem.Button` which represents the underlying `<button>` element.
- Updated dependencies:
  - @stratakit/foundations@0.1.4

## 0.1.1

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

- Updated dependencies:
  - @stratakit/bricks@0.2.0
  - @stratakit/foundations@0.1.3
