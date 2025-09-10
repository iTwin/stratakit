// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://super-adventure-prvgo4m.pages.github.io",
	integrations: [
		starlight({
			title: "StrataKit Docs",
			titleDelimiter: " – ",
			pagination: false,
			components: {
				PageTitle: "./src/components/PageTitle.astro",
				Head: "./src/components/Head.astro",
				ThemeProvider: "./src/components/ThemeProvider.astro",
				ThemeSelect: "./src/components/ThemeSwitcher.astro",
				SocialIcons: "./src/components/SocialIcons.astro",
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
				{ label: "Icons", slug: "icons" },
			],
			editLink: {
				baseUrl: "https://github.com/iTwin/stratakit-docs/edit/main/",
			},
			lastUpdated: true,
			customCss: ["./src/styles/index.css"],
			expressiveCode: {
				themes: ["github-dark", "github-light"],
			},
		}),
	],
	devToolbar: { enabled: false },
	vite: {
		build: {
			assetsInlineLimit: (filePath) => {
				if (filePath.endsWith(".svg")) return false;
				return undefined;
			},
		},
	},
});
