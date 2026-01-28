/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { index, layout, route } from "@react-router/dev/routes";
import { components } from "./~meta.ts";

import type { RouteConfig } from "@react-router/dev/routes";

export default [
	index("./index.tsx"),
	route("sandbox", "./sandbox/index.tsx"),
	route("tokens", "./tokens.tsx"),
	route("icons", "./icons.tsx"),
	route("mui", "./mui.tsx"),

	layout(
		"./tests/tests.tsx",
		[
			...components.foundations,
			...components.bricks,
			...components.structures,
			...components.private,
		].map((component) =>
			route(
				`/tests/${toKebabCase(component)}`,
				`./tests/${toKebabCase(component)}/index.tsx`,
			),
		),
	),
] satisfies RouteConfig;

// ----------------------------------------------------------------------------

function toKebabCase(str: string) {
	return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
