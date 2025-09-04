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
			],
			editLink: {
				baseUrl: "https://github.com/iTwin/stratakit-docs/edit/main/",
			},
			customCss: ["./src/styles/index.css"],
		}),
	],
	devToolbar: { enabled: false },
});
