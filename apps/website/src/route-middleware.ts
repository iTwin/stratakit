/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

const appHref = "https://itwin.github.io/design-system";

const baseParts = import.meta.env.BASE_URL.replace("/", "").split("/");
const baseFolder = baseParts.length === 2 ? baseParts[0] : "";

function rewriteAbsoluteLink(link: string) {
	if (!link.startsWith(appHref)) return link;

	const baseUrl = import.meta.env.DEV
		? new URL("http://localhost:1800")
		: new URL(baseFolder, appHref);

	const pathName = link.replace(appHref, "");
	return new URL(pathName, baseUrl).href;
}

export const onRequest = defineRouteMiddleware(async (context, next) => {
	const data = context.locals.starlightRoute.entry.data;
	for (const action of data.hero?.actions ?? []) {
		action.link = rewriteAbsoluteLink(action.link);
	}
	return next();
});
