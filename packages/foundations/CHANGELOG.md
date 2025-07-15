# Changelog

## 0.2.1

### Patch Changes

- [#824](https://github.com/iTwin/design-system/pull/824): Turned `react` and `react-dom` into _optional_ peer dependencies.
- [#824](https://github.com/iTwin/design-system/pull/824): Added a new `unstable_loadStyles` function for loading all foundations CSS without using React.

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
