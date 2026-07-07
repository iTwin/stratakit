/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { StarlightRouteData } from "@astrojs/starlight/route-data";

export interface Breadcrumb {
	label: string;
	href?: string;
}

/**
 * Generates breadcrumbs for API reference pages based on Starlight route data.
 * Returns breadcrumbs for API pages, undefined for all other pages.
 */
export function getBreadcrumbsFromRoute(
	route: StarlightRouteData,
): Breadcrumb[] | undefined {
	console.debug(route.entry);
	const entry = route?.entry;
	if (!entry) {
		return undefined;
	}

	const parts = entry.id.split("/");
	// We need at least 3 parts: reference/packageId/apiName
	if (parts.length < 3 || parts[0] !== "reference") {
		return undefined;
	}

	const packageId = parts[1];
	const apiName = parts.slice(2).join("/"); // In case there are more parts
	const baseUrl = import.meta.env.BASE_URL;

	return [
		{ label: "API Reference", href: `${baseUrl}/reference/` },
		{
			label: `@stratakit/${packageId}`,
			href: `${baseUrl}/reference/#${packageId}`,
		},
		{ label: apiName },
	];
}
