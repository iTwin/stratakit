# Changelog

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
