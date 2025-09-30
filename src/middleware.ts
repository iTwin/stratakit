import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (_context, next) => {
	const response = await next();
	let html = await response.text();

	// Strip HTML comments
	html = html.replaceAll(/<!--(.|\n)*?-->/g, "");

	return new Response(html, {
		status: 200,
		headers: response.headers,
	});
});
