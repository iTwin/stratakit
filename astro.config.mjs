// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "StrataKit Docs",
			pagination: false,
			components: {
				PageTitle: "./src/components/PageTitle.astro",
			},
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/iTwin/design-system",
				},
			],
			sidebar: [
				{ label: "Getting started", slug: "guides/getting-started" },
				{
					label: "Components",
					autogenerate: { directory: "components" },
				},
			],
			editLink: {
				baseUrl: "https://github.com/iTwin/stratakit-docs/edit/main/",
			},
		}),
	],
	devToolbar: { enabled: false },
});
