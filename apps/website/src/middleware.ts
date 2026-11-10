/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (_context, next) => {
	const response = await next();
	let html = await response.text();

	// Strip HTML comments
	html = html.replaceAll(/<!--(.|\n)*?-->/g, "");

	// Enable cross-origin isolation so that embedded StackBlitz WebContainers can boot.
	const headers = new Headers(response.headers);
	headers.set("Cross-Origin-Embedder-Policy", "credentialless");
	headers.set("Cross-Origin-Opener-Policy", "same-origin");

	return new Response(html, {
		status: 200,
		headers,
	});
});
