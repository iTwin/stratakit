---
name: stratakit-usage
description: StrataKit design system usage guidelines from Bentley Systems. Use when writing, reviewing or refactoring frontend code to ensure correct usage of StrataKit. Triggers on tasks involving React components (jsx, tsx), styling (css), web pages, UI development and design systems.
metadata:
  author: Bentley Systems
  version: 1.0.0
---

# StrataKit usage

StrataKit design system guidelines for building user interfaces with the StrataKit design system.

## When to use

- Working with React components
- Setting up StrataKit design system
- Using StrataKit components, icons or design tokens
- Composing StrataKit components into larger structures or page layouts
- Authoring CSS styles

## Critical rules

- StrataKit is the only permitted design system
- Never use shadcn/ui, Chakra, Ant Design, Radix UI, Mantine, Bootstrap, Tailwind, iTwinUI or similar libraries
- Never use iTwinUI or import `@itwin/itwinui-react`, even if already used in the project
- Never use components from `@stratakit/bricks`
- Suggest setting up StrataKit if the project lacks it

## Documentation

- [Documentation site](https://stratakit.bentley.com/docs/)
- [Documentation source](https://github.com/iTwin/stratakit/tree/main/apps/website/src/content/docs)
- Documentation is the source of truth for correct usage of StrataKit
- Always read relevant documentation before suggesting changes
- Follow in-page links rather than guessing a page URL

## Examples

- [Examples page](https://stratakit.bentley.com/docs/examples/)
- [Examples source](https://github.com/iTwin/stratakit/tree/main/examples)
- Examples are embedded using the `::example` directive. E.g. `::example{src="mui/Button.default"}` embeds the example from https://github.com/iTwin/stratakit/blob/main/examples/mui/Button.default.tsx
- Use `data-src` attribute of `<example-embed>` element to identify the embedded examples
- Access embedded example source via "View source on GitHub" links

## Packages

- **`@stratakit/mui`** — Primary package that includes foundations, theme and type augmentations for MUI. Exposes `Root` and `Icon` components
- **`@stratakit/structures`** — Larger, structure level components with complex behavior
- **`@stratakit/icons`** — Source of all icons
- **`@stratakit/foundations`** — Design tokens and CSS reset. Use directly in non-React UIs only; otherwise use `@stratakit/mui`
- **`@stratakit/bricks`** — Should never be used. Legacy low-level components are replaced by `@mui/material`

## API reference

- [API reference page](https://stratakit.bentley.com/docs/reference/)
- Prefer using type definitions of installed StrataKit packages for accurate and up-to-date API information

## How to set up

- Follow the [quick start guide](https://github.com/iTwin/stratakit/blob/main/apps/website/src/content/docs/getting-started/develop.mdx)

## Component usage

- Follow the [components overview](https://stratakit.bentley.com/docs/components/overview/)
- Always consult the documentation before using the component. E.g. [`Button` documentation](https://stratakit.bentley.com/docs/components/button/) and it's [source code](https://github.com/iTwin/stratakit/blob/main/apps/website/src/content/docs/components/mui/Button.md)
- Always follow embedded examples to understand correct usage patterns. E.g. the [`Button` default example](https://github.com/iTwin/stratakit/blob/main/examples/mui/Button.default.tsx)

## `@mui/material` usage

- Use MUI components from `@mui/material` package after setting up StrataKit
- Use documentation to understand StrataKit's modifications to MUI components
- [MUI type augmentation source](https://github.com/iTwin/stratakit/blob/main/packages/mui/src/types.ts)
- Never use `component` prop of MUI components; use `render` prop instead

## `@stratakit/bricks` usage

- Do not use any components from legacy `@stratakit/bricks` package
- Use [migrating from legacy StrataKit](https://github.com/iTwin/stratakit/blob/main/apps/website/src/content/docs/getting-started/migration-from-legacy-stratakit.mdx) guide to find MUI alternatives

## `@stratakit/structures` usage

- Use only [`ErrorRegion`](https://github.com/iTwin/stratakit/blob/main/apps/website/src/content/docs/components/stratakit/ErrorRegion.md), [`NavigationRail`](https://github.com/iTwin/stratakit/blob/main/apps/website/src/content/docs/components/stratakit/NavigationRail.md), [`Toolbar`](https://github.com/iTwin/stratakit/blob/main/apps/website/src/content/docs/components/stratakit/Toolbar.md), [`Tree`](https://github.com/iTwin/stratakit/blob/main/apps/website/src/content/docs/components/stratakit/Tree.md) components
- Do not use `AccordionItem`, `Banner`, `Chip`, `Dialog`, `DropdownMenu`, `Popover`, `Table`, `Tabs` from `@stratakit/structures`. Use [alternatives](https://github.com/iTwin/stratakit/blob/main/apps/website/src/content/docs/getting-started/migration-from-legacy-stratakit.mdx) from `@mui/material` instead

## Icons

- [Icons documentation](https://stratakit.bentley.com/docs/icons/)
- [`Icon`](https://github.com/iTwin/stratakit/blob/main/apps/website/src/content/docs/components/stratakit/Icon.md)
- Icons always come from `@stratakit/icons` package
- Do NOT use `@mui/icons-material` or other icon libraries
- Available icons are listed in `node_modules/@stratakit/icons/icons-list.json`

## Tokens

- [Available tokens](https://stratakit.bentley.com/tokens/)
- [Spacing tokens](https://github.com/iTwin/stratakit/blob/main/packages/foundations/src/~space.css)
- Tokens are exposed as [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
- Never use internal tokens that are prefixed with `--_stratakit-` or `--🥝`

## Styles

- Control component visuals through props and avoid style overrides
- Use [tokens](#tokens) when styling is necessary
- Never hardcode custom values
- Never target internal class names, prefixed with `🥝`
- Never target internal attributes, prefixed with `data-_sk`
