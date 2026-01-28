# Changelog

## 0.4.6

### Patch Changes

- [#1188](https://github.com/iTwin/design-system/pull/1188): Fixed a race condition where stylesheets could be prematurely removed in cases where multiple components that use the same styles were conditionally rendered.

## 0.4.5

- [#1134](https://github.com/iTwin/design-system/pull/1134): Fixed the default value of `Root`'s `synchronizeColorScheme` prop to actually be `true`, as mentioned in the docs.
- [#1135](https://github.com/iTwin/design-system/pull/1135): Global focus styles have been moved from `@layer stratakit` to `@layer reset`.

## 0.4.4

- [#1124](https://github.com/iTwin/design-system/pull/1124): Added `-webkit-font-smoothing: antialiased` to the CSS reset.
- [#1123](https://github.com/iTwin/design-system/pull/1123): Renamed `@layer itwinui` to `@layer stratakit`.
- [#1121](https://github.com/iTwin/design-system/pull/1121): Removed `adoptedStyleSheets` fallback for older browsers.
- [#1121](https://github.com/iTwin/design-system/pull/1121): Removed `oklch` fallbacks for older browsers.
- [#1126](https://github.com/iTwin/design-system/pull/1126): `Root` component no longer requires `density` prop. When `density` is not specified, `font-size: 0.75rem` will _not_ be used globally.

## 0.4.3

- [#1108](https://github.com/iTwin/design-system/pull/1108): Decoupled the styles for `@stratakit/bricks` and `@stratakit/structures` from `@stratakit/foundations` so that the latter does not indirectly depend on the former two. This change also reduces the need for these packages to remain in lockstep.

## 0.4.2

- Updated internal code for `@stratakit/bricks@0.5.2` and `@stratakit/structures@0.5.2`.

## 0.4.1

- Updated internal code for `@stratakit/bricks@0.5.1` and `@stratakit/structures@0.5.1`.

## 0.4.0

### Breaking changes

- [#973](https://github.com/iTwin/design-system/pull/973), [#1057](https://github.com/iTwin/design-system/pull/1057): Renamed a few CSS variables for better consistency and accuracy:
  - `--stratakit-color-icon-neutral-hover` is now `--stratakit-color-icon-neutral-primary`.
  - `--stratakit-color-bg-page-zebra` is now `--stratakit-color-bg-control-table-zebra`.
  - `--stratakit-color-brand-logo` is now `--stratakit-color-brand-logo-fill`.
  - All component-specific shadow tokens are now prefixed with `control-`.
    - `--stratakit-shadow-button-base-drop` → `--stratakit-shadow-control-button-base-drop`
    - `--stratakit-shadow-button-base-inset` → `--stratakit-shadow-control-button-base-inset`
    - `--stratakit-shadow-dialog-base` → `--stratakit-shadow-control-dialog-base`
    - `--stratakit-shadow-dropdown-base` → `--stratakit-shadow-control-dropdown-base`
    - `--stratakit-shadow-input-base` → `--stratakit-shadow-control-input-base`
    - `--stratakit-shadow-table-strong` → `--stratakit-shadow-control-table-strong`
    - `--stratakit-shadow-toolbar-base` → `--stratakit-shadow-control-toolbar-base`
    - `--stratakit-shadow-tooltip-base` → `--stratakit-shadow-control-tooltip-base`

  ⚠️ To handle these breaking changes, do a find-and-replace for all existing references in your code base. For example:

  ```diff
  - var(--stratakit-color-icon-neutral-hover)
  + var(--stratakit-color-icon-neutral-primary)
  ```

- [#960](https://github.com/iTwin/design-system/pull/960): The global focus outline is now given priority in the CSS cascade. This is a precautionary measure to prevent third party styles from removing the focus outline.
- [#952](https://github.com/iTwin/design-system/pull/952): Changed the default value of `Root`'s `synchronizeColorScheme` prop to `true`.

- [#958](https://github.com/iTwin/design-system/pull/958): The `Root` component will no longer detect the [root node](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode) automatically. By default, it will use `document`. When rendering in shadow DOM or a popout window, you will need to pass the `rootNode` prop to the `Root` component.

  ```tsx
  <Root rootNode={/* shadowRoot or popoutWindow.document */}>
  ```

### Non-breaking changes

- [#973](https://github.com/iTwin/design-system/pull/973), [#1057](https://github.com/iTwin/design-system/pull/1057): Added new CSS variables:
  - `--stratakit-color-bg-on-surface-neutral-active-hover`
  - `--stratakit-color-border-control-navrail-item`
  - `--stratakit-color-text-control-placeholder`
  - `--stratakit-color-brand-logo-stroke`
  - `--stratakit-shadow-brand-logo-base`
- [#1027](https://github.com/iTwin/design-system/pull/1027): Updated the fallback logic of `Icon` component to correctly handle relative non-HTTP URLs.
- [#1003](https://github.com/iTwin/design-system/pull/1003): Enabled React Compiler for production build. In React 18 apps, `react-compiler-runtime` dependency will be used.

## 0.3.5

- Updated internal code for `@stratakit/bricks@0.4.5` and `@stratakit/structures@0.4.5`.

## 0.3.4

- Updated internal code for `@stratakit/bricks@0.4.4` and `@stratakit/structures@0.4.4`.

## 0.3.3

- [#944](https://github.com/iTwin/design-system/pull/944): The CSS reset has been updated to use `display: inline-block` for SVG elements.
- Updated internal code for `@stratakit/bricks@0.4.3` and `@stratakit/structures@0.4.3`.

## 0.3.2

- [#928](https://github.com/iTwin/design-system/pull/928): Added `@layer reset` fallback to the top of `<head>` element to ensure correct layer order.
- Updated internal code for `@stratakit/bricks@0.4.2` and `@stratakit/structures@0.4.2`.

## 0.3.1

- [#925](https://github.com/iTwin/design-system/pull/925): Added `portalContainer` prop to the `Root` component.

## 0.3.0

### Breaking changes

- [#888](https://github.com/iTwin/design-system/pull/888): `Icon` component no longer automatically adjusts the URL based on `size`.

  `#icon-large` must now be explicitly added to the URL to select the large icons from `@stratakit/icons`. For example:

  ```diff
  - <Icon href={placeholderIcon} size="large" />
  + <Icon href={`${placeholderIcon}#icon-large`} size="large" />
  ```

### Non-breaking changes

- [#888](https://github.com/iTwin/design-system/pull/888): `Icon` component now supports URLs containing an explicit hash.

  ```tsx
  import placeholderIcon from "@stratakit/icons/placeholder.svg";

  <Icon href={`${placeholderIcon}#icon-large`} size="large" />;
  ```

- [#913](https://github.com/iTwin/design-system/pull/913): Updated internal CSS selectors in every component.
- [#912](https://github.com/iTwin/design-system/pull/912): Token updates:
  - Added new CSS variable: `--stratakit-color-bg-glow-on-surface-accent-active-hover`.
  - Updated the value of `--stratakit-color-bg-page-base-depth` in light theme.

## 0.2.4

- Updated internal code for `@stratakit/bricks@0.3.4` and `@stratakit/structures@0.3.2`.

## 0.2.3

- [#873](https://github.com/iTwin/design-system/pull/873): Added initial set of spacing tokens (e.g. `--stratakit-space-x1`, `--stratakit-space-x2`, etc).
- Updated internal code for `@stratakit/structures@0.3.1`.

## 0.2.2

- [#861](https://github.com/iTwin/design-system/pull/861): Small changes to some colors in light theme.
- [#861](https://github.com/iTwin/design-system/pull/861): Added new CSS variable: `--stratakit-color-bg-control-select`.
- Updated internal code for `@stratakit/bricks@0.3.3` and `@stratakit/structures@0.3.0`.

## 0.2.1

- [#824](https://github.com/iTwin/design-system/pull/824): Added a new `unstable_loadStyles` function for loading all foundations CSS without using React.
- [#824](https://github.com/iTwin/design-system/pull/824): Turned `react` and `react-dom` into _optional_ peer dependencies.
- Updated internal code for `@stratakit/bricks@0.3.2` and `@stratakit/structures@0.2.4`.

## 0.2.0

### Breaking changes

- [#762](https://github.com/iTwin/design-system/pull/762): The prefix for all CSS variables has changed to `--stratakit`.

  To handle this breaking change, replace all instances of "--ids" with "--stratakit". For example:

  ```diff
  - background-color: var(--ids-color-bg-page-base);
  + background-color: var(--stratakit-color-bg-page-base);
  ```

### Non-breaking changes

- [#783](https://github.com/iTwin/design-system/pull/783): Several changes to the CSS reset, affecting `<button>`, `<fieldset>`, `<p>` and heading (`<h1>`, `<h2>`, etc) elements.
- [#811](https://github.com/iTwin/design-system/pull/811): Added a global `color-scheme` style, matching the `colorScheme` passed to `<Root>`.
- [#568](https://github.com/iTwin/design-system/pull/568): Added a global `scrollbar-color` style.
- [#784](https://github.com/iTwin/design-system/pull/784): Added new CSS variables:
  - `--stratakit-color-border-control-checkbox`
  - `--stratakit-color-border-control-radio`
  - `--stratakit-color-border-control-textbox`
  - `--stratakit-color-border-control-select`

## 0.1.6

- [#770](https://github.com/iTwin/design-system/pull/770): An error will now be thrown when multiple instances of `@stratakit/foundations` are detected.

## 0.1.5

- [#740](https://github.com/iTwin/design-system/pull/740): Added `types` field to `package.json` file for better TypeScript support and TS icon on `npm`.

## 0.1.4

- [#719](https://github.com/iTwin/design-system/pull/719): Updated `Icon` component to catch errors when making network requests.
- [#650](https://github.com/iTwin/design-system/pull/650): Added global `::selection` styling.

## 0.1.3

Updated internal code for `@stratakit/bricks@0.2.0` and `@stratakit/structures@0.1.1`.

## 0.1.2

Updated styling for `@stratakit/bricks@0.1.2`.

## 0.1.1

Updated styling for `@stratakit/bricks@0.1.1`.

## @stratakit/foundations@0.1.0

Initial release 🥳
