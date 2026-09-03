# Changelog

## 1.0.0-rc.1

### Breaking changes

- [#1817](https://github.com/iTwin/stratakit/pull/1817): Removed tokens:

  - `--stratakit-color-border-shadow-base`
  - `--stratakit-color-border-shadow-strong`

- [#1820](https://github.com/iTwin/stratakit/pull/1820): Removed shadow tokens:

  - `--stratakit-shadow-control-button-base-drop`
  - `--stratakit-shadow-control-button-base-inset`
  - `--stratakit-shadow-control-dialog-base`
  - `--stratakit-shadow-control-dropdown-base`
  - `--stratakit-shadow-control-input-base`
  - `--stratakit-shadow-control-table-strong`
  - `--stratakit-shadow-control-tooltip-base`
  - `--stratakit-shadow-control-toolbar-base`

## 1.0.0-rc.0

### Breaking changes

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

- [#1797](https://github.com/iTwin/stratakit/pull/1797): Renamed `--stratakit-color-text-control-placeholder` to `--stratakit-color-text-neutral-placeholder`.
- [#1813](https://github.com/iTwin/stratakit/pull/1813): Updated the supported version of `react` and `react-dom` to `^19.0.0`. Short term the packages will continue to work with `^18.0.0`, but it is recommended to upgrade to React v19 to ensure future compatibility.
- [#1762](https://github.com/iTwin/stratakit/pull/1762): Added `PortalContext` to allow accessing the portal container via the `React.useContext` hook. The API is low level and intended for advanced use cases only.
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

### Non-breaking changes

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

- [#1805](https://github.com/iTwin/stratakit/pull/1805): Added `border-radius` tokens:

  - `--stratakit-radius-sm`
  - `--stratakit-radius-md`
  - `--stratakit-radius-lg`
  - `--stratakit-radius-round`

- Updated dependencies:
  - @stratakit/internal-utils@0.2.0-rc.0

## 0.5.0

### Breaking changes

- [#1565](https://github.com/iTwin/stratakit/pull/1565): Removed internal APIs from `@stratakit/foundations/secret-internals`, moving them into the `@stratakit/internal-utils` package.

### Non-breaking changes

- [#1565](https://github.com/iTwin/stratakit/pull/1565): Added a dependency on `@stratakit/internal-utils` package.
- [#1497](https://github.com/iTwin/stratakit/pull/1497): Updated values for the following tokens:

  - `--stratakit-color-border-neutral-base`
  - `--stratakit-color-border-neutral-muted`
  - `--stratakit-color-border-neutral-faded`
  - `--stratakit-color-border-neutral-disabled`
  - `--stratakit-color-border-page-base`
  - `--stratakit-color-border-page-depth`
  - `--stratakit-color-bg-elevation-level-1`
  - `--stratakit-color-bg-elevation-level-2`

## 0.4.10

- [#1658](https://github.com/iTwin/stratakit/pull/1658): Updated the `Root` component to render the portal container before `children`.

## 0.4.9

- [#1516](https://github.com/iTwin/stratakit/pull/1516): Adjusted sizes for `caption-*` typography variants.
- [#1551](https://github.com/iTwin/stratakit/pull/1551): Adjusted sizes for the `display-*` and `headline-°` typography variants.

## 0.4.8

- [#1327](https://github.com/iTwin/stratakit/pull/1327): Added `unstable_accentColor` prop to `Root` component. When `"cobalt"` value is specified, the accent color is changed to blue.

## 0.4.7

### Patch Changes

- [#1308](https://github.com/iTwin/stratakit/pull/1308), [#1315](https://github.com/iTwin/stratakit/pull/1315): Added global component size variables.

## 0.4.6

- [#1188](https://github.com/iTwin/stratakit/pull/1188): Fixed a race condition where stylesheets could be prematurely removed in cases where multiple components that use the same styles were conditionally rendered.

## 0.4.5

- [#1134](https://github.com/iTwin/stratakit/pull/1134): Fixed the default value of `Root`'s `synchronizeColorScheme` prop to actually be `true`, as mentioned in the docs.
- [#1135](https://github.com/iTwin/stratakit/pull/1135): Global focus styles have been moved from `@layer stratakit` to `@layer reset`.

## 0.4.4

- [#1124](https://github.com/iTwin/stratakit/pull/1124): Added `-webkit-font-smoothing: antialiased` to the CSS reset.
- [#1123](https://github.com/iTwin/stratakit/pull/1123): Renamed `@layer itwinui` to `@layer stratakit`.
- [#1121](https://github.com/iTwin/stratakit/pull/1121): Removed `adoptedStyleSheets` fallback for older browsers.
- [#1121](https://github.com/iTwin/stratakit/pull/1121): Removed `oklch` fallbacks for older browsers.
- [#1126](https://github.com/iTwin/stratakit/pull/1126): `Root` component no longer requires `density` prop. When `density` is not specified, `font-size: 0.75rem` will _not_ be used globally.

## 0.4.3

- [#1108](https://github.com/iTwin/stratakit/pull/1108): Decoupled the styles for `@stratakit/bricks` and `@stratakit/structures` from `@stratakit/foundations` so that the latter does not indirectly depend on the former two. This change also reduces the need for these packages to remain in lockstep.

## 0.4.2

- Updated internal code for `@stratakit/bricks@0.5.2` and `@stratakit/structures@0.5.2`.

## 0.4.1

- Updated internal code for `@stratakit/bricks@0.5.1` and `@stratakit/structures@0.5.1`.

## 0.4.0

### Breaking changes

- [#973](https://github.com/iTwin/stratakit/pull/973), [#1057](https://github.com/iTwin/stratakit/pull/1057): Renamed a few CSS variables for better consistency and accuracy:
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

- [#960](https://github.com/iTwin/stratakit/pull/960): The global focus outline is now given priority in the CSS cascade. This is a precautionary measure to prevent third party styles from removing the focus outline.
- [#952](https://github.com/iTwin/stratakit/pull/952): Changed the default value of `Root`'s `synchronizeColorScheme` prop to `true`.

- [#958](https://github.com/iTwin/stratakit/pull/958): The `Root` component will no longer detect the [root node](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode) automatically. By default, it will use `document`. When rendering in shadow DOM or a popout window, you will need to pass the `rootNode` prop to the `Root` component.

  ```tsx
  <Root rootNode={/* shadowRoot or popoutWindow.document */}>
  ```

### Non-breaking changes

- [#973](https://github.com/iTwin/stratakit/pull/973), [#1057](https://github.com/iTwin/stratakit/pull/1057): Added new CSS variables:
  - `--stratakit-color-bg-on-surface-neutral-active-hover`
  - `--stratakit-color-border-control-navrail-item`
  - `--stratakit-color-text-control-placeholder`
  - `--stratakit-color-brand-logo-stroke`
  - `--stratakit-shadow-brand-logo-base`
- [#1027](https://github.com/iTwin/stratakit/pull/1027): Updated the fallback logic of `Icon` component to correctly handle relative non-HTTP URLs.
- [#1003](https://github.com/iTwin/stratakit/pull/1003): Enabled React Compiler for production build. In React 18 apps, `react-compiler-runtime` dependency will be used.

## 0.3.5

- Updated internal code for `@stratakit/bricks@0.4.5` and `@stratakit/structures@0.4.5`.

## 0.3.4

- Updated internal code for `@stratakit/bricks@0.4.4` and `@stratakit/structures@0.4.4`.

## 0.3.3

- [#944](https://github.com/iTwin/stratakit/pull/944): The CSS reset has been updated to use `display: inline-block` for SVG elements.
- Updated internal code for `@stratakit/bricks@0.4.3` and `@stratakit/structures@0.4.3`.

## 0.3.2

- [#928](https://github.com/iTwin/stratakit/pull/928): Added `@layer reset` fallback to the top of `<head>` element to ensure correct layer order.
- Updated internal code for `@stratakit/bricks@0.4.2` and `@stratakit/structures@0.4.2`.

## 0.3.1

- [#925](https://github.com/iTwin/stratakit/pull/925): Added `portalContainer` prop to the `Root` component.

## 0.3.0

### Breaking changes

- [#888](https://github.com/iTwin/stratakit/pull/888): `Icon` component no longer automatically adjusts the URL based on `size`.

  `#icon-large` must now be explicitly added to the URL to select the large icons from `@stratakit/icons`. For example:

  ```diff
  - <Icon href={svgPlaceholder} size="large" />
  + <Icon href={`${svgPlaceholder}#icon-large`} size="large" />
  ```

### Non-breaking changes

- [#888](https://github.com/iTwin/stratakit/pull/888): `Icon` component now supports URLs containing an explicit hash.

  ```tsx
  import svgPlaceholder from "@stratakit/icons/placeholder.svg";

  <Icon href={`${svgPlaceholder}#icon-large`} size="large" />;
  ```

- [#913](https://github.com/iTwin/stratakit/pull/913): Updated internal CSS selectors in every component.
- [#912](https://github.com/iTwin/stratakit/pull/912): Token updates:
  - Added new CSS variable: `--stratakit-color-bg-glow-on-surface-accent-active-hover`.
  - Updated the value of `--stratakit-color-bg-page-base-depth` in light theme.

## 0.2.4

- Updated internal code for `@stratakit/bricks@0.3.4` and `@stratakit/structures@0.3.2`.

## 0.2.3

- [#873](https://github.com/iTwin/stratakit/pull/873): Added initial set of spacing tokens (e.g. `--stratakit-space-x1`, `--stratakit-space-x2`, etc).
- Updated internal code for `@stratakit/structures@0.3.1`.

## 0.2.2

- [#861](https://github.com/iTwin/stratakit/pull/861): Small changes to some colors in light theme.
- [#861](https://github.com/iTwin/stratakit/pull/861): Added new CSS variable: `--stratakit-color-bg-control-select`.
- Updated internal code for `@stratakit/bricks@0.3.3` and `@stratakit/structures@0.3.0`.

## 0.2.1

- [#824](https://github.com/iTwin/stratakit/pull/824): Added a new `unstable_loadStyles` function for loading all foundations CSS without using React.
- [#824](https://github.com/iTwin/stratakit/pull/824): Turned `react` and `react-dom` into _optional_ peer dependencies.
- Updated internal code for `@stratakit/bricks@0.3.2` and `@stratakit/structures@0.2.4`.

## 0.2.0

### Breaking changes

- [#762](https://github.com/iTwin/stratakit/pull/762): The prefix for all CSS variables has changed to `--stratakit`.

  To handle this breaking change, replace all instances of "--ids" with "--stratakit". For example:

  ```diff
  - background-color: var(--ids-color-bg-page-base);
  + background-color: var(--stratakit-color-bg-page-base);
  ```

### Non-breaking changes

- [#783](https://github.com/iTwin/stratakit/pull/783): Several changes to the CSS reset, affecting `<button>`, `<fieldset>`, `<p>` and heading (`<h1>`, `<h2>`, etc) elements.
- [#811](https://github.com/iTwin/stratakit/pull/811): Added a global `color-scheme` style, matching the `colorScheme` passed to `<Root>`.
- [#568](https://github.com/iTwin/stratakit/pull/568): Added a global `scrollbar-color` style.
- [#784](https://github.com/iTwin/stratakit/pull/784): Added new CSS variables:
  - `--stratakit-color-border-control-checkbox`
  - `--stratakit-color-border-control-radio`
  - `--stratakit-color-border-control-textbox`
  - `--stratakit-color-border-control-select`

## 0.1.6

- [#770](https://github.com/iTwin/stratakit/pull/770): An error will now be thrown when multiple instances of `@stratakit/foundations` are detected.

## 0.1.5

- [#740](https://github.com/iTwin/stratakit/pull/740): Added `types` field to `package.json` file for better TypeScript support and TS icon on `npm`.

## 0.1.4

- [#719](https://github.com/iTwin/stratakit/pull/719): Updated `Icon` component to catch errors when making network requests.
- [#650](https://github.com/iTwin/stratakit/pull/650): Added global `::selection` styling.

## 0.1.3

Updated internal code for `@stratakit/bricks@0.2.0` and `@stratakit/structures@0.1.1`.

## 0.1.2

Updated styling for `@stratakit/bricks@0.1.2`.

## 0.1.1

Updated styling for `@stratakit/bricks@0.1.1`.

## @stratakit/foundations@0.1.0

Initial release 🥳
