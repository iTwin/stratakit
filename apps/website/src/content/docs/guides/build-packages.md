---
title: Building packages
description: How to build packages with StrataKit
sidebar:
  label: Building packages
---

This guide is for **package** developers. It supplements the general [Development guide](/getting-started/develop) with additional instructions to build a package on top of StrataKit.

## Define peer dependencies

Add [shared packages](#shared-packages) to your `package.json` as [peer dependencies](https://docs.npmjs.com/cli/v12/configuring-npm/package-json#peerdependencies) instead of regular dependencies:

```json
{
	"peerDependencies": {
		"@stratakit/mui": "^1.0.0"
	}
}
```

:::note
`@mui/material`, `react` and `react-dom` should also be listed under `peerDependencies`.
:::

If you are using StrataKit CSS variables or other foundations in your package, add the `@stratakit/foundations` shared package to your `peerDependencies` to explicitly control the package version:

```json
{
	"peerDependencies": {
		"@stratakit/foundations": "^1.0.0"
	}
}
```

## Define dependencies

To use StrataKit structures in your package, add `@stratakit/structures` to your `dependencies`:

```json
{
	"dependencies": {
		"@stratakit/structures": "^0.6.1"
	}
}
```

To use StrataKit icons, add `@stratakit/icons` to your `dependencies`:

```json
{
	"dependencies": {
		"@stratakit/icons": "^0.4.4"
	}
}
```

Use StrataKit icons as described in the [development guide](/getting-started/develop/#quick-start).

:::note
Packages don't configure the bundler themselves - the host application is responsible for [serving StrataKit icons as external SVG files](/getting-started/develop/#bundler-configuration).
:::

## Set up TypeScript types

Add `@stratakit/mui/types.d.ts` to your **tsconfig** file as described in the [development guide](/getting-started/develop/#quick-start).

## Shared packages

Packages that are expected to be installed at most once in the host application are called **shared packages**. The installed instances of shared packages are used across all other packages in the project.

Shared packages of StrataKit include:

- `@stratakit/mui`
- `@stratakit/foundations`

Other shared packages include:

- `@mui/material`
- `react`
- `react-dom`

Packages should list shared packages under [`peerDependencies`](https://docs.npmjs.com/cli/v12/configuring-npm/package-json#peerdependencies) and ensure that the implementation supports the specified range.

Applications should install shared packages as regular [`dependencies`](https://docs.npmjs.com/cli/v12/configuring-npm/package-json#dependencies).

:::caution
Version range of shared packages should be carefully managed to ensure compatibility across all packages in the project.
:::

## Package versioning

Follow [semantic versioning](https://semver.org/) when releasing new versions of your package.

### Transitive peer dependencies

[Shared packages](#shared-packages) introduce additional challenges when managing dependencies, especially when dealing with transitive peer dependencies. Package developers should consider the full dependency graph.

For example, since `@stratakit/foundations` is a peer dependency of `@stratakit/structures`, a version bump of `@stratakit/structures` can transitively require a newer `@stratakit/foundations` in the host application - even when the change looks internal from your package's perspective.

### Updating peer dependencies

To use a newer feature non-conditionally in your package, you may need to update the version of a peer dependency.

StrataKit packages consider version bumps of peer dependencies as a non-breaking change if the host application can upgrade to a newer version without disruption.

<details>
<summary>Non-breaking changes</summary>

These widen the accepted range or bump the minimum version of a range to a newer minor or patch version:

```diff
 {
 	"peerDependencies": {
-  		"@stratakit/foundations": "^1.0.0"
+  		"@stratakit/foundations": "^1.0.0 || ^2.0.0"
	 }
 }
```

```diff
 {
 	"peerDependencies": {
-  		"@stratakit/foundations": "^1.0.0"
+  		"@stratakit/foundations": "^1.1.0"
	 }
 }
```

</details>

<details>
<summary>Breaking changes</summary>

These narrow the accepted range or require a new major version:

```diff
 {
 	"peerDependencies": {
-  		"@stratakit/foundations": "^1.0.0"
+  		"@stratakit/foundations": "1.1.0"
	 }
 }
```

```diff
 {
 	"peerDependencies": {
-  		"@stratakit/foundations": "^1.0.0"
+  		"@stratakit/foundations": "^2.0.0"
	 }
 }
```

</details>

## Migrating from iTwinUI

Consider releasing a new major version of your package when adding support for StrataKit. Otherwise, you may introduce breaking changes for users who are still using iTwinUI without setting up StrataKit.

See [Migrating from iTwinUI](/getting-started/develop/#migrating-from-itwinui) for more information.
