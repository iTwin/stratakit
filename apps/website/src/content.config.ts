/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { defineCollection, reference, z } from "astro:content";
import * as fs from "node:fs/promises";
import { createRequire } from "node:module";
import * as path from "node:path";
import * as process from "node:process";

import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { file } from "astro/loaders";

import type { DataStore, Loader } from "astro/loaders";
import type { Api } from "../api.ts";

const require = createRequire(import.meta.url);

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				status: z
					.enum(["draft", "unstable", "stable", "deprecated", "unknown"])
					.optional(),
				links: z
					.object({
						demo: z.string().optional(),
						github: z.string().optional(),
						figma: z.string().optional(),
					})
					.optional(),
				associated: z.array(reference("docs")).optional(),
			}),
		}),
	}),

	examples: defineCollection({
		loader: examplesLoader(),
		schema: z.object({
			displayName: z.string(),
			packageName: z.string(),
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
function packagesLoader(): Loader {
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
	});
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
				status: z.enum(["unstable", "stable"]).optional(),
				types: z
					.array(
						z.object({
							name: z.string(),
							props,
							jsdoc: reference("jsdoc").optional(),
						}),
					)
					.optional(),
			}),
		),
	});
}

/** Content Loader that extracts JSDoc entries from `api.json`. */
function jsdocLoader(): Loader {
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
	};
}

/** Content Loader that reads all `.tsx` and `.jsx` files from the `examples` package subdirectories. */
function examplesLoader(): Loader {
	const populateExamples = async (store: DataStore) => {
		store.clear();

		const examplesPath = path.dirname(require.resolve("examples/package.json"));
		const examplesDir = await fs.readdir(examplesPath);
		const packages = examplesDir.filter((entry) => {
			const entryPath = path.join(examplesPath, entry);
			return fs
				.stat(entryPath)
				.then((stat) => stat.isDirectory()) // only include directories
				.catch(() => false);
		});

		for (const packageName of packages) {
			const packagePath = path.join(examplesPath, packageName);
			let exampleFiles: string[];
			try {
				exampleFiles = (await fs.readdir(packagePath)).filter(
					(file) => file.endsWith(".tsx") || file.endsWith(".jsx"),
				);
			} catch {
				continue; // skip if subdirectory doesn't exist
			}

			for (const exampleFile of exampleFiles) {
				const fileName = exampleFile.replace(/\.tsx$|\.jsx$/, "");
				const [componentName, exampleName] = fileName.split(".", 2);
				const id = `${packageName}/${fileName}`;

				store.set({
					id,
					data: {
						displayName: `${componentName} (${exampleName})`,
						packageName,
					},
				});
			}
		}
	};

	return {
		name: "examples-loader",
		load: async ({ watcher, store }) => {
			await populateExamples(store);

			// Handle dev server changes to files in the `examples` package.
			const examplesPath = path.dirname(
				require.resolve("examples/package.json"),
			);
			const handleDevelopmentChange = async (filePath: string) => {
				if (!filePath.startsWith(examplesPath)) return;
				await populateExamples(store);
			};
			watcher?.on("change", handleDevelopmentChange);
			watcher?.on("unlink", handleDevelopmentChange);
		},
	};
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
	return api.exportName?.startsWith("unstable_")
		? ("unstable" as const)
		: ("stable" as const);
}
