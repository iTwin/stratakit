# Changelog

## 0.5.5

- [#1174](https://github.com/iTwin/design-system/pull/1174): Fixed `DropdownMenu.Submenu` component to avoid removal of parent portal popover when unmounting.

## 0.5.4

- [#1122](https://github.com/iTwin/design-system/pull/1122): Moved `@stratakit/foundations` from `peerDependencies` to direct `dependencies`.
- [#1123](https://github.com/iTwin/design-system/pull/1123): Renamed `@layer itwinui` to `@layer stratakit`.
- Updated dependencies:
  - @stratakit/foundations@0.4.4
  - @stratakit/bricks@0.5.4

## 0.5.3

- [#1108](https://github.com/iTwin/design-system/pull/1108): Decoupled the styles for `@stratakit/bricks` and `@stratakit/structures` from `@stratakit/foundations` so that the latter does not indirectly depend on the former two. This change also reduces the need for these packages to remain in lockstep.
- Updated dependencies:
  - @stratakit/foundations@0.4.3
  - @stratakit/bricks@0.5.3

## 0.5.2

- [#1078](https://github.com/iTwin/design-system/pull/1078): Added `DropdownMenu.Group` component used to group menu items within a dropdown menu.

  ```tsx
  <DropdownMenu.Provider>
  	<DropdownMenu.Button>Actions</DropdownMenu.Button>

  	<DropdownMenu.Content>
  		<DropdownMenu.Item label="View" />
  		<DropdownMenu.Group
  			label="Manage"
  			items={[
  				<DropdownMenu.Item key="add" label="Add" />,
  				<DropdownMenu.Item key="edit" label="Edit" />,
  			]}
  		/>
  	</DropdownMenu.Content>
  </DropdownMenu.Provider>
  ```

- [#1089](https://github.com/iTwin/design-system/pull/1089): Updated the `NavigationRail.ToggleButton` component to use `aria-pressed` instead of `aria-expanded`, to better reflect how it affects the NavigationRail's appearance.
- [#1092](https://github.com/iTwin/design-system/pull/1092): Increased the target size of `NavigationRail.ToggleButton` component.
- [#1102](https://github.com/iTwin/design-system/pull/1102): "Popups" will now respect device-specific close actions (such as back gesture on Android). Affected components include: `DropdownMenu`, `Dialog` and `Popover`.

- [#1074](https://github.com/iTwin/design-system/pull/1074): Visual updates to `Table` and `Tree` active + hover states.
- [#1103](https://github.com/iTwin/design-system/pull/1103): `DropdownMenu.Submenu` will now remain mounted in the DOM as long as the parent DropdownMenu is open.

- Updated dependencies:
  - @stratakit/bricks@0.5.2
  - @stratakit/foundations@0.4.2

## 0.5.1

- [#1075](https://github.com/iTwin/design-system/pull/1075): Added a new `unstable_NavigationList` component that displays a vertical list of links for secondary navigation.

  Includes the following subcomponents:
  - `<NavigationList.Root>`
  - `<NavigationList.Anchor>`
  - `<NavigationList.Subgroup>`

  Example:

  ```tsx
  <NavigationList.Root
  	items={[
  		<NavigationList.Anchor key={1} href="/page1" label="Page 1" />,
  		<NavigationList.Anchor key={2} href="/page2" label="Page 2" />,
  		<NavigationList.Subgroup
  			key={3}
  			label="Group of pages"
  			items={[
  				<NavigationList.Anchor key={1} href="/page3-1" label="Sub-page 1" active />,
  				<NavigationList.Anchor key={2} href="/page3-2" label="Sub-page 2" />,
  			]}
  		/>,
  	]}
  />
  ```

- [#1079](https://github.com/iTwin/design-system/pull/1079): Increased the click target area of non-selectable `Tree.Item`s.
  - If `selected` is undefined, the `Tree.Item` will expand/collapse when clicked.
  - If `selected` is defined, the `Tree.Item` will continue to toggle selection when clicked.

- [#1064](https://github.com/iTwin/design-system/pull/1064): Added new `unstable_Popover` component that displays custom content in a non-modal window overlay that is placed relative to a trigger element.

  ```tsx
  <Popover content={<>Popover content</>}>
  	<Button>Open popover</Button>
  </Popover>
  ```

- Updated dependencies:
  - @stratakit/bricks@0.5.1
  - @stratakit/foundations@0.4.1

## 0.5.0

### Breaking changes

- [#1036](https://github.com/iTwin/design-system/pull/1036): Changed `items` prop type of `ErrorRegion.Root` component from `ReactNode` to `ReactNode[]`.

  `items` prop is used to determine error region visibility.

- [#1038](https://github.com/iTwin/design-system/pull/1038): Removed unintentionally exposed `TreeItem` [subpath export](https://nodejs.org/api/packages.html#subpath-exports). Tree item components are available under the `Tree` subpath or the main entry point of the package.

  ```diff
  - import * as TreeItem from "@stratakit/structures/TreeItem";
  + import * as Tree from "@stratakit/structures/Tree";

  - <TreeItem.Root />
  + <Tree.Item />

  - <TreeItem.Action />
  + <Tree.ItemAction />
  ```

- [#1037](https://github.com/iTwin/design-system/pull/1037): Require `aria-label` or `aria-labelledby` prop in `ErrorRegion.Root` component.

### Non-breaking changes

- [#1003](https://github.com/iTwin/design-system/pull/1003): Enabled React Compiler for production build. In React 18 apps, `react-compiler-runtime` dependency will be used.
- Updated dependencies:
  - @stratakit/bricks@0.5.0
  - @stratakit/foundations@0.4.0

## 0.4.5

- `unstable_NavigationRail` changes:
  - [#962](https://github.com/iTwin/design-system/pull/962): Added `expanded` and `setExpanded` props for controlling the expanded/collapsed state.
  - [#962](https://github.com/iTwin/design-system/pull/962): Added `defaultExpanded` prop for specifying the _initial_ expanded/collapsed state.
- `unstable_ErrorRegion` changes:
  - [#963](https://github.com/iTwin/design-system/pull/963): Avoid attempting to set the default accessible name of the [`<section>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section) when `label={undefined}`.
  - [#979](https://github.com/iTwin/design-system/pull/979): Updated the visibility logic to be based on the `items` array. Previously recommended `label={undefined}` pattern is now deprecated.
  - [#978](https://github.com/iTwin/design-system/pull/978): Log a console warning if `aria-label` or `aria-labelledby` is not provided to `ErrorRegion.Root`.
  - [#979](https://github.com/iTwin/design-system/pull/979): Log a console warning if `items` prop is not an array. Previously supported `ReactNode` type is now deprecated.
- [#953](https://github.com/iTwin/design-system/pull/953): Changed the default value of `Tabs.Provider`'s `selectOnMove` prop to `false`.
- [#969](https://github.com/iTwin/design-system/pull/969): Fixed an issue where `unstable_Banner` would not track changes to the `tone` prop.
- Updated dependencies:
  - @stratakit/bricks@0.4.5
  - @stratakit/foundations@0.3.5

## 0.4.4

- [#954](https://github.com/iTwin/design-system/pull/954): Added "popup indicator" styling to `Toolbar.Item`.
- Updated dependencies:
  - @stratakit/bricks@0.4.4
  - @stratakit/foundations@0.3.4

## 0.4.3

- [#933](https://github.com/iTwin/design-system/pull/933): Added `submenu` prop to `DropdownMenu.Item` component and a `DropdownMenu.Submenu` component to support nested dropdown menus.

  ```tsx
  <DropdownMenu.Provider>
  	<DropdownMenu.Button>Actions</DropdownMenu.Button>

  	<DropdownMenu.Content>
  		<DropdownMenu.Item label="Add" />
  		<DropdownMenu.Item label="Edit" />
  		<DropdownMenu.Item
  			label="More"
  			submenu={
  				<DropdownMenu.Submenu>
  					<DropdownMenu.Item label="Delete" />
  					<DropdownMenu.Item label="Disable" />
  				</DropdownMenu.Submenu>
  			}
  		/>
  	</DropdownMenu.Content>
  </DropdownMenu.Provider>
  ```

- [#939](https://github.com/iTwin/design-system/pull/939): Fixed `forced-colors` styling for `NavigationRail.Anchor` in `active` state.
- Updated dependencies:
  - @stratakit/bricks@0.4.3
  - @stratakit/foundations@0.3.3

## 0.4.2

- [#931](https://github.com/iTwin/design-system/pull/931): `Dialog.Content` will now only scroll past a certain viewport height. On smaller viewports, the `Dialog.Root` will be scrollable instead.
- Updated dependencies:
  - @stratakit/bricks@0.4.2
  - @stratakit/foundations@0.3.2

## 0.4.1

- [#851](https://github.com/iTwin/design-system/pull/851): Added `Dialog` component that displays custom content in a window overlay over the primary window or another dialog window. Currently only modal dialog type is supported.

  ```tsx
  const [open, setOpen] = useState(false);

  <Button onClick={() => setOpen(true)}>Open dialog</Button>
  <Dialog.Root modal={true} open={open} onClose={() => setOpen(false)}>
    <Dialog.Header>
      <Dialog.Heading>Dialog title</Dialog.Heading>
      <Dialog.CloseButton />
    </Dialog.Header>
    <Dialog.Content>
      <Text variant="body-sm">Content that describes the primary purpose of the dialog.</Text>
    </Dialog.Content>
    <Dialog.Footer>
      <Dialog.ActionList
        actions={[
          <Button key="cancel" onClick={() => setOpen(false)}>Cancel</Button>,
          <Button key="ok" tone="accent" onClick={() => setOpen(false)}>Ok</Button>,
        ]}
      />
    </Dialog.Footer>
  </Dialog.Root>
  ```

- [#884](https://github.com/iTwin/design-system/pull/884): Added new `unstable_NavigationRail` component intended to serve as the application's top-level navigation (e.g. for switching between pages).

  ```jsx
  <NavigationRail.Root>
    <NavigationRail.Header>
      <IconButton label="…" icon={…} href="/" />
      <NavigationRail.ToggleButton />
    </NavigationRail.Header>

    <NavigationRail.Content>
      <NavigationRail.List>
        <NavigationRail.ListItem>
          <NavigationRail.Anchor label="…" icon={…} href="/…" />
        </NavigationRail.ListItem>
        <NavigationRail.ListItem>
          <NavigationRail.Anchor label="…" icon={…} href="/…" />
        </NavigationRail.ListItem>
        <NavigationRail.ListItem>
          <NavigationRail.Anchor label="…" icon={…} href="/…" />
        </NavigationRail.ListItem>
      </NavigationRail.List>

      <NavigationRail.Footer>
        <NavigationRail.List>
          <NavigationRail.ListItem>
            <NavigationRail.Button label="…" icon={…} onClick={…} />
          </NavigationRail.ListItem>
          <NavigationRail.ListItem>
            <NavigationRail.Button label="…" icon={…} onClick={…} />
          </NavigationRail.ListItem>
        </NavigationRail.List>
     </NavigationRail.Footer>
    </NavigationRail.Content>
  </NavigationRail.Root>
  ```

- Updated dependencies:
  - @stratakit/foundations@0.3.1
  - @stratakit/bricks@0.4.1

## 0.4.0

### Breaking changes

- [#888](https://github.com/iTwin/design-system/pull/888): `Toolbar.Item` component no longer automatically uses the large version of the icon.

  `#icon-large` must now be explicitly added to the URL to select the large icons from `@stratakit/icons`. For example:

  ```diff
    <Toolbar.Item
  -   render={<IconButton icon={placeholderIcon} />}
  +   render={<IconButton icon={`${placeholderIcon}#icon-large`} />}
    />
  ```

- [#900](https://github.com/iTwin/design-system/pull/900): Renamed `Tabs.Root` component to `Tabs.Provider`.

  ```diff
  - <Tabs.Root>
  + <Tabs.Provider>
      <Tabs.TabList>…</Tabs.TabList>
      <Tabs.TabPanel>…</Tabs.TabPanel>
  - </Tabs.Root>
  + </Tabs.Provider>
  ```

  This change makes StrataKit's naming convention more consistent. `Root` components always render a DOM element whereas `Provider` components have no underlying DOM element.

- [#900](https://github.com/iTwin/design-system/pull/900): Renamed `DropdownMenu.Root` component to `DropdownMenu.Provider`.

  ```diff
  - <DropdownMenu.Root>
  + <DropdownMenu.Provider>
      <DropdownMenu.Button>…</DropdownMenu.Button>
      <DropdownMenu.Content>…</DropdownMenu.Content>
  - </DropdownMenu.Root>
  + </DropdownMenu.Provider>
  ```

  This change makes StrataKit's naming convention more consistent. `Root` components always render a DOM element whereas `Provider` components have no underlying DOM element.

### Non-breaking changes

- [#903](https://github.com/iTwin/design-system/pull/903): Added proper styling for `Divider` rendered inside a `Toolbar.Group`.

  ```tsx
  <Toolbar.Group variant="solid">
    <Toolbar.Item render={…} />
    <Divider orientation="vertical" />
    <Toolbar.Item render={…} />
    <Toolbar.Item render={…} />
  </Toolbar.Group>
  ```

- [#913](https://github.com/iTwin/design-system/pull/913): Updated internal CSS selectors in every component.
- [#901](https://github.com/iTwin/design-system/pull/901): Added `orientation` prop to `Toolbar.Group` component. Set the `orientation` prop to `"vertical"` to display the toolbar vertically.
- [#902](https://github.com/iTwin/design-system/pull/902): Updated active style of a ghost `IconButton` when used in a `Toolbar` component.
- Updated dependencies:
  - @stratakit/foundations@0.3.0
  - @stratakit/bricks@0.4.0

## 0.3.2

- [#881](https://github.com/iTwin/design-system/pull/881): Updated CSS to use `--stratakit-space-` variables instead of hardcoded values in all components.
  - Replaced hardcoded `rem` spacing values with new `px`-based variables in many components.
- [#889](https://github.com/iTwin/design-system/pull/889): Fixed vertical centering of `Toolbar.Item`.
- Updated dependencies:
  - @stratakit/bricks@0.3.4
  - @stratakit/foundations@0.2.3

## 0.3.1

- [#870](https://github.com/iTwin/design-system/pull/870): Fixed an issue where `AccordionItem.Content` was being offset by decorations placed at the end of `AccordionItem.Header`. The content will now only include start indentation, and correctly stretch all the way up to the right edge.
- [#869](https://github.com/iTwin/design-system/pull/869): Fixed an issue where `Tree` was using Context as a component which doesn't work in React 18.
- [#872](https://github.com/iTwin/design-system/pull/872): Improved the `Tabs` active stripe animation to make it smoother and more performant.

## 0.3.0

### Breaking changes

- [#847](https://github.com/iTwin/design-system/pull/847): The `id` prop in `Tabs.Tab` and `tabId` prop in `Tabs.TabPanel` have been made required.
- [#805](https://github.com/iTwin/design-system/pull/805): Changed `actions` prop of the `Tree.Item` component to no longer automatically inline some of the actions. Instead, newly added `inlineActions` prop can be used to display up to two inline actions. All actions specified in a `actions` prop will be rendered in the action menu.

  ```tsx
  <Tree.Item
    inlineActions={[
      <Tree.ItemAction key={…} icon={…} label={…} />,
      <Tree.ItemAction key={…} icon={…} label={…} />,
    ]}
    actions={[
      <Tree.ItemAction key={…} label={…} />,
      <Tree.ItemAction key={…} label={…} />,
    ]}
  />
  ```

  A single error-related action should be specified when the tree item has an error.

  ```tsx
  <Tree.Item
    error={error}
    inlineActions={
  	  error
  	    ? [
  	        <Tree.ItemAction key={…} icon={…} label={…} />
  	      ]
  	    : [
  	        <Tree.ItemAction key={…} icon={…} label={…} />,
  	        <Tree.ItemAction key={…} icon={…} label={…} />,
  	      ]
  	}
  />
  ```

### Non-breaking changes

- [#821](https://github.com/iTwin/design-system/pull/821): Added compositional `Banner.Root`, `Banner.Icon`, `Banner.Label`, `Banner.Message`, `Banner.Actions`, and `Banner.DismissButton` components. These new components can be used when you need fine grained configuration.

  To use the compositional components, import them from the `/unstable_Banner` subpath:

  ```tsx
  import * as Banner from "@stratakit/structures/unstable_Banner";

  <Banner.Root>
  	<Banner.Icon href={placeholderIcon} />
  	<Banner.Label>Label</Banner.Label>
  	<Banner.Message>Message</Banner.Message>
  	<Banner.Actions>
  		<Button>Action</Button>
  	</Banner.Actions>
  	<Banner.DismissButton onClick={onDismiss} />
  </Banner.Root>;
  ```

- [#716](https://github.com/iTwin/design-system/pull/716): Added support for placing `<AccordionItem.Marker>` before and `<AccordionItem.Decoration>` after the rest of the content in `<AccordionItem.Header>`.

  The `<AccordionItem.Marker>` is now recommended to be placed _before_ the rest of the header content.

  ```tsx
  <AccordionItem.Header>
  	<AccordionItem.Marker />
  	<AccordionItem.Button>
  		<AccordionItem.Label>Label</AccordionItem.Label>
  	</AccordionItem.Button>
  </AccordionItem.Header>
  ```

- [#716](https://github.com/iTwin/design-system/pull/716): Added support for multiple decorations for `AccordionItem` when passed as children in `<AccordionItem.Decoration>`.

  ```tsx
  <AccordionItem.Header>
  	<AccordionItem.Marker />
  	<AccordionItem.Decoration>
  		<Icon href={placeholder} />
  		<Icon href={placeholder} />
  	</AccordionItem.Decoration>
  	<AccordionItem.Button>
  		<AccordionItem.Label>Label</AccordionItem.Label>
  	</AccordionItem.Button>
  </AccordionItem.Header>
  ```

- [#849](https://github.com/iTwin/design-system/pull/849): Add `background-color` change for the `<AccordionItem.Header>` instead of just the `<AccordionItem.Marker>` for the "hover" and "pressed" states of `<AccordionItem.Header>`.

- [#829](https://github.com/iTwin/design-system/pull/829): Improved the performance of the `Tree.Item` component by deferring the rendering of actions until the tree item becomes visible on the screen.

- [#809](https://github.com/iTwin/design-system/pull/809): Added active and active-hover states to the `Table.Row` component for styling selected rows. To enable selection, render a `Checkbox` component within the row. A row is considered selected when its checkbox is checked.

  ```tsx
  <Table.Row>
  	<Table.Cell>
  		<Checkbox checked />
  	</Table.Cell>
  	<Table.Cell>Item 1</Table.Cell>
  </Table.Row>
  ```

- [#854](https://github.com/iTwin/design-system/pull/854): Updated the status icons used internally by various components: `unstable_Banner`, and `unstable_ErrorRegion` and `Tree.Item`.

- Updated dependencies:
  - @stratakit/bricks@0.3.3
  - @stratakit/foundations@0.2.2

## 0.2.4

- [#835](https://github.com/iTwin/design-system/pull/835): Added active-hover state styles to the `Tree.Item` component.
- Updated dependencies:
  - @stratakit/bricks@0.3.2
  - @stratakit/foundations@0.2.1

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
