/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { type RouteConfig, route, index } from "@react-router/dev/routes";
import { components } from "./components.ts";
import { toKebabCase } from "./~utils.tsx";

export default [
	index("./index.tsx"),
	route("sandbox", "./sandbox.tsx"),
	route("tokens", "./tokens.tsx"),
	route("icons", "./icons.tsx"),

	route(
		"tests",
		"./tests/tests.tsx",
		components.map((component) =>
			route(
				toKebabCase(component),
				`./tests/${toKebabCase(component)}/index.tsx`,
			),
		),
	),
] satisfies RouteConfig;
