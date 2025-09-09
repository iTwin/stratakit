import { defineCollection, reference, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

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
				related: z.array(reference("docs")).optional(),
			}),
		}),
	}),
};
