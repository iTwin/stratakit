/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { defineCollection, reference } from "astro:content";
import * as fs from "node:fs/promises";
import * as path from "node:path";

import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { file } from "astro/loaders";
import { z } from "astro/zod";
import { slug as generateSlug } from "github-slugger";

import type { Loader } from "astro/loaders";
import type { Api } from "../api.ts";

export const collections = {
	docs: defineCollection({
		loader: docsLoader({
			generateId: ({ entry }) => {
				const parsed = path.posix.parse(entry);
				const segments = parsed.dir.split("/").filter(Boolean);

				// Drop (flatten) intermediate folders under components/*
				// e.g. components/mui/Button -> components/Button
				if (segments[0] === "components" && segments.length > 1) {
					segments.splice(1);
				}

				return [...segments, parsed.name]
					.map((segment) => generateSlug(segment))
					.join("/");
			},
		}),
		schema: docsSchema({
			extend: z.object({
				status: z.enum(["unstable", "stable", "deprecated"]).optional(),
				links: z
					.object({
						muiDocs: z.string().optional(),
						apiReference: z.string().optional(),
					})
					.optional(),
			}),
		}),
	}),

	packages: defineCollection({
		loader: packagesLoader(),
		schema: packagesSchema(),
	}),
	jsdoc: defineCollection({
		loader: jsdocLoader(),
	}),
};

/** Content Loader that loads package entries from `api.json`. */
function packagesLoader() {
	return file("./api.json", {
		parser: (content) => {
			const packages = JSON.parse(content) as Api;
			return packages.map((pkg) => ({
				id: pkg.name,
				...pkg,
				apis: pkg.apis.map((api) => {
					const status = getApiStatus(api);
					const components = [
						...(api.convenience ? [api.convenience] : []),
						...api.composition,
					];
					for (const component of components) {
						for (const prop of component.props) {
							if (!prop.jsdoc) continue;
							prop.jsdoc = getPropId({
								packageName: pkg.name,
								apiName: api.name,
								componentName: component.name,
								propName: prop.name,
							});
						}
						if (!component.jsdoc) continue;
						component.jsdoc = getComponentId({
							packageName: pkg.name,
							apiName: api.name,
							componentName: component.name,
						});
					}
					for (const type of api.types ?? []) {
						for (const prop of type.props) {
							if (!prop.jsdoc) continue;
							prop.jsdoc = getPropId({
								packageName: pkg.name,
								apiName: api.name,
								componentName: type.name,
								propName: prop.name,
							});
						}
						if (!type.jsdoc) continue;
						type.jsdoc = getComponentId({
							packageName: pkg.name,
							apiName: api.name,
							componentName: type.name,
						});
					}
					return {
						...api,
						status,
					};
				}),
			}));
		},
	}) satisfies Loader;
}

function packagesSchema() {
	const props = z.array(
		z.object({
			name: z.string(),
			type: z.string(),
			optional: z.boolean().optional(),
			jsdoc: reference("jsdoc").optional(),
			defaultValue: z.string().optional(),
		}),
	);
	const component = z.object({
		name: z.string(),
		baseElement: z.string().optional(),
		jsdoc: reference("jsdoc").optional(),
		baseProps: z.array(z.string()),
		props,
		barrelName: z.string().optional(),
		deprecated: z.boolean().optional(),
	});
	return z.object({
		name: z.string(),
		apis: z.array(
			z.object({
				name: z.string(),
				description: z.string().optional(),
				exportName: z.string().optional(),
				convenience: component.optional(),
				composition: z.array(component),
				status: z.enum(["unstable", "stable", "deprecated"]).optional(),
				types: z
					.array(
						z.object({
							name: z.string(),
							props,
							jsdoc: reference("jsdoc").optional(),
						}),
					)
					.optional(),
				reexport: z
					.object({
						packageName: z.string(),
						apiName: z.string(),
					})
					.optional(),
			}),
		),
	});
}

/** Content Loader that extracts JSDoc entries from `api.json`. */
function jsdocLoader() {
	return {
		name: "jsdoc-loader",
		load: async ({ store, watcher, renderMarkdown }) => {
			const populateStore = async () => {
				store.clear();

				const apiJson = await fs.readFile("./api.json", "utf-8");
				const packages = JSON.parse(apiJson) as Api;
				for (const pkg of packages) {
					for (const api of pkg.apis) {
						if (api.convenience?.jsdoc) {
							store.set({
								id: getComponentId({
									packageName: pkg.name,
									apiName: api.name,
									componentName: api.convenience.name,
								}),
								data: {
									jsdoc: api.convenience.jsdoc,
								},
								rendered: await renderMarkdown(api.convenience.jsdoc),
							});
						}
						for (const prop of api.convenience?.props ?? []) {
							if (!prop.jsdoc) continue;
							store.set({
								id: getPropId({
									packageName: pkg.name,
									apiName: api.name,
									componentName: api.convenience?.name ?? "",
									propName: prop.name,
								}),
								data: {
									jsdoc: prop.jsdoc,
								},
								rendered: await renderMarkdown(prop.jsdoc),
							});
						}

						for (const comp of api.composition) {
							for (const prop of comp.props) {
								if (!prop.jsdoc) continue;
								store.set({
									id: getPropId({
										packageName: pkg.name,
										apiName: api.name,
										componentName: comp.name,
										propName: prop.name,
									}),
									data: {
										jsdoc: prop.jsdoc,
									},
									rendered: await renderMarkdown(prop.jsdoc),
								});
							}

							if (!comp.jsdoc) continue;
							store.set({
								id: getComponentId({
									packageName: pkg.name,
									apiName: api.name,
									componentName: comp.name,
								}),
								data: {},
								rendered: await renderMarkdown(comp.jsdoc),
							});
						}

						for (const type of api.types ?? []) {
							for (const prop of type.props) {
								if (!prop.jsdoc) continue;
								store.set({
									id: getPropId({
										packageName: pkg.name,
										apiName: api.name,
										componentName: type.name,
										propName: prop.name,
									}),
									data: {
										jsdoc: prop.jsdoc,
									},
									rendered: await renderMarkdown(prop.jsdoc),
								});
							}
							if (!type.jsdoc) continue;
							store.set({
								id: getComponentId({
									packageName: pkg.name,
									apiName: api.name,
									componentName: type.name,
								}),
								data: {},
								rendered: await renderMarkdown(type.jsdoc),
							});
						}
					}
				}
			};

			await populateStore();

			const handleDevelopmentChange = async (filePath: string) => {
				if (!filePath.endsWith("api.json")) return;
				await populateStore();
			};
			watcher?.on("change", handleDevelopmentChange);
			watcher?.on("unlink", handleDevelopmentChange);
		},
	} satisfies Loader;
}

function getComponentId({
	packageName,
	apiName,
	componentName,
}: {
	packageName: string;
	apiName: string;
	componentName: string;
}) {
	return `${packageName}-${apiName}-${componentName}`;
}

function getPropId({
	packageName,
	apiName,
	componentName,
	propName,
}: {
	packageName: string;
	apiName: string;
	componentName: string;
	propName: string;
}) {
	return `${packageName}-${apiName}-${componentName}-${propName}`;
}

function getApiStatus(api: Api.Api) {
	if (api.types && api.types.length > 0) return undefined;

	const components = [...api.composition, api.convenience].filter(Boolean);
	const deprecated =
		components.length > 0 &&
		components.every((component) => component?.deprecated);
	if (deprecated) return "deprecated";

	return api.exportName?.startsWith("unstable_")
		? ("unstable" as const)
		: ("stable" as const);
}
