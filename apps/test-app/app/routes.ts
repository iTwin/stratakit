/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { RouteConfig } from "@react-router/dev/routes";
import { createRoutesFromFolders } from "@remix-run/v1-route-convention";
import { remixConfigRoutes } from "@react-router/remix-config-routes-adapter";

export const routes: RouteConfig = remixConfigRoutes((defineRoutes) => {
	// `createRoutesFromFolders` will follow the Remix v1 route convention.
	// See https://remix.run/docs/en/v1/file-conventions/routes-files
	return createRoutesFromFolders(defineRoutes, {
		ignoredFilePatterns: ["**/*.spec.*", "**/*.css", "**/.DS_Store"],
	});
});
