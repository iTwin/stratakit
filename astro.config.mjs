// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import { visit } from "unist-util-visit";

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
			plugins: [starlightResponsiveTables()],
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

/**
 * Starlight plugin that makes tables responsive by wrapping them in a `<responsive-table>` element.
 * @returns {import("@astrojs/starlight/types").StarlightPlugin}
 */
function starlightResponsiveTables({ tagName = "responsive-table" } = {}) {
	function rehypeWrapTables() {
		return (/** @type {any} */ tree) => {
			if (!tree?.children) return;
			visit(tree, "element", (node, index, parent) => {
				if (!parent || !node || index === undefined) return;

				if (node.tagName === "table") {
					parent.children[index] = {
						type: "element",
						tagName,
						properties: {},
						children: [node],
					};
				}
			});
		};
	}

	return {
		name: "starlight-responsive-tables",
		hooks: {
			"config:setup": ({ addIntegration }) => {
				addIntegration({
					name: "starlight-responsive-tables-integration",
					hooks: {
						"astro:config:setup": ({ command, config }) => {
							if (command !== "dev" && command !== "build") return;
							config.markdown.rehypePlugins.push(rehypeWrapTables);
						},
					},
				});
			},
		},
	};
}
