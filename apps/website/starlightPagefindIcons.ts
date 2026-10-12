/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as pagefind from "pagefind";

import type { StarlightPlugin } from "@astrojs/starlight/types";
import type { AstroIntegration } from "astro";

import iconsMeta from "@stratakit/icons/icons-meta.json" with { type: "json" };

export default () =>
	({
		name: "starlight-pagefind-icons",
		hooks: {
			"config:setup": (opts) => {
				const { command, addIntegration } = opts;

				if (command !== "build") return;
				addIntegration(pagefindIconsIntegration());
			},
		},
	}) satisfies StarlightPlugin;

function pagefindIconsIntegration(): AstroIntegration {
	return {
		name: "astro-pagefind-icons",
		hooks: {
			"astro:build:done": async (opts) => {
				const { logger } = opts;

				logger.info("Building icons index with Pagefind...");
				await buildIconsIndex();
				logger.info("Finished building icons index");
			},
		},
	};
}

async function buildIconsIndex() {
	const { index } = await pagefind.createIndex();
	if (!index) throw new Error("Failed to create Pagefind index");

	const iconMetaEntries = Object.entries(iconsMeta);

	for (const [name, meta] of iconMetaEntries) {
		await index.addCustomRecord({
			url: `/icons/?icon=${name}`,
			content: `${name[0].toLocaleUpperCase()}${name.slice(1)} icon`,
			language: "en",
			meta: {
				title: `${name}.svg`,
				aliases: meta.aliases.join(", "),
			},
		});
	}

	await index.writeFiles({
		outputPath: "dist/pagefind-icons",
	});
}
