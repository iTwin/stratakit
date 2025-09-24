import { defineCollection, reference, z } from "astro:content";
import * as fs from "node:fs/promises";
import * as process from "node:process";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import type { DataStore, Loader } from "astro/loaders";

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				status: z.enum(["ready", "not ready"]).optional(),
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
		}),
	}),
};

/** Content Loader that reads all `.tsx` and `.jsx` files from the `src/examples` directory. */
function examplesLoader(): Loader {
	const populateExamples = async (store: DataStore) => {
		store.clear();

		const examplesDir = await fs.readdir("./src/examples");
		const exampleFiles = examplesDir.filter(
			(file) => file.endsWith(".tsx") || file.endsWith(".jsx"),
		);

		for (const exampleFile of exampleFiles) {
			const id = exampleFile.replace(/\.tsx$|\.jsx$/, "");
			const [componentName, exampleName] = id.split(".", 2);

			store.set({
				id,
				data: { displayName: `${componentName} (${exampleName})` },
			});
		}
	};

	return {
		name: "examples-loader",
		load: async ({ watcher, store }) => {
			await populateExamples(store);

			// Handle dev server changes to files in the `src/examples` directory.
			const handleDevelopmentChange = async (filePath: string) => {
				const projectRelativePath = filePath
					.replace(process.cwd(), "")
					.replace(/^\//, "");
				if (!projectRelativePath.startsWith("src/examples/")) return;
				await populateExamples(store);
			};
			watcher?.on("change", handleDevelopmentChange);
			watcher?.on("unlink", handleDevelopmentChange);
		},
	};
}
