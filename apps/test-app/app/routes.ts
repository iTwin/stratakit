/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { readdirSync } from "node:fs";
import { join } from "node:path";

import { index, layout, route } from "@react-router/dev/routes";
import { components } from "./~meta.ts";

import type { RouteConfig } from "@react-router/dev/routes";

function routesForPackage(folder: string, components: string[]) {
	return components.map((component) =>
		route(
			`/tests/${toKebabCase(component)}`,
			`./tests/${folder}/${toKebabCase(component)}/index.tsx`,
		),
	);
}

function muiComponentRoutes() {
	const dir = join(import.meta.dirname, "../../../examples/mui");
	const names = [
		...new Set(
			readdirSync(dir)
				.filter((f) => f.endsWith(".tsx"))
				.map((f) => f.split(".")[0]), // "Button.variants.tsx" → "Button"
		),
	];
	return names.map((name) =>
		route(`/tests/mui/${name}`, "./tests/mui/index.tsx", {
			id: `examples/mui/${name}`,
		}),
	);
}

export default [
	index("./index.tsx"),
	route("sandbox", "./sandbox/index.tsx"),
	route("tokens", "./tokens.tsx"),
	route("icons", "./icons.tsx"),
	route("mui", "./mui/mui.tsx"),

	...muiComponentRoutes(),

	layout(
		"./tests/tests.tsx",
		Object.entries(components).flatMap(([folder, components]) =>
			routesForPackage(folder, components),
		),
	),
] satisfies RouteConfig;

// ----------------------------------------------------------------------------

function toKebabCase(str: string) {
	return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
