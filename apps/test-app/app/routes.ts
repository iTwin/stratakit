/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { index, route } from "@react-router/dev/routes";
import { components } from "./components.ts";
import { toKebabCase } from "./~utils.tsx";

import type { RouteConfig } from "@react-router/dev/routes";

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
