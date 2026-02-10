---
"@stratakit/mui": patch
---

Introduced a new `render` prop for all overrideable MUI components, replacing the previous `component` prop. The `render` prop is more flexible and aligns better with modern React patterns, while also allowing the StrataKit MUI theme to apply more powerful customizations.

If you were previously using the `component` prop to override MUI components, you should now use the `render` prop instead. The `component` prop has been marked deprecated.

```diff
- <Typography component="h2">
+ <Typography render={<h2 />} />
```

Note: Components that did not have a `component` prop previously will not have a `render` prop now.
