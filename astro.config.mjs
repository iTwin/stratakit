// @ts-check

import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
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
				Sidebar: "./src/components/Sidebar.astro",
				SocialIcons: "./src/components/SocialIcons.astro",
				LastUpdated: "./src/components/LastUpdated.astro",
			},
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/iTwin/design-system",
				},
			],
			sidebar: [
				{ label: "Getting started", slug: "getting-started" },
				{ label: "Guides", autogenerate: { directory: "guides" } },
				{
					label: "Components",
					autogenerate: { directory: "components" },
				},
				{ label: "Icons", slug: "icons" },
				{ label: "Examples", link: "/examples" },
				{ label: "API Reference", link: "/reference" },
				{ label: "Changelog", slug: "changelog" },
				{ label: "Contributing", slug: "contributing" },
			],
			editLink: {
				baseUrl: "https://github.com/iTwin/stratakit-docs/edit/main/",
			},
			lastUpdated: true,
			customCss: ["./src/styles/index.css"],
			expressiveCode: {
				themes: ["github-dark", "github-light"],
			},
			plugins: [starlightResponsiveTables(), starlightLiveExamples()],
		}),
		react(),
	],
	devToolbar: { enabled: false },
	vite: {
		build: {
			assetsInlineLimit: (filePath) => {
				if (filePath.endsWith(".svg")) return false;
				return undefined;
			},
		},
		plugins: [vitePluginFixAstroSvg()],
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

/**
 * Starlight plugin that processes `::example{src="..."}` directives to embed live examples.
 * @returns {import("@astrojs/starlight/types").StarlightPlugin}
 */
function starlightLiveExamples() {
	function remarkLiveExamples() {
		return (/** @type {any} */ tree, /** @type {any} */ file) => {
			if (!tree?.children) return;

			visit(tree, (node) => {
				if (node.type === "leafDirective" && node.name === "example") {
					const { src } = node.attributes || {};

					if (!src) {
						file.fail("`::example` directive requires a `src` attribute", node);
						return;
					}

					node.data ||= {};
					node.data.hName = "example-embed"; // see example-embed.astro

					node.children = [
						{
							type: "html",
							value: `<iframe src="/examples/${src}?preview" title="${src} example" height="150"></iframe>`,
						},
					];
				}
			});
		};
	}

	return {
		name: "starlight-live-examples",
		hooks: {
			"config:setup": ({ addIntegration }) => {
				addIntegration({
					name: "starlight-live-examples-integration",
					hooks: {
						"astro:config:setup": ({ command, config }) => {
							if (command !== "dev" && command !== "build") return;

							config.markdown.remarkPlugins.splice(0, 1, remarkDirective);
							config.markdown.remarkPlugins.push(remarkLiveExamples);
						},
					},
				});
			},
		},
	};
}

/**
 * Vite plugin that fixes Astro's SVG handling to ensure SVGs are treated as URLs when imported in JSX.
 * @returns {NonNullable<import("astro").ViteUserConfig["plugins"]>[number]}
 */
function vitePluginFixAstroSvg() {
	return {
		name: "vite-fix-astro-svg",
		enforce: "pre",
		async resolveId(source, importer, options) {
			if (!source.endsWith(".svg")) return;
			if (!importer?.endsWith(".jsx") && !importer?.endsWith(".tsx")) return;
			const resolved = await this.resolve(`${source}?url`, importer, options);
			return resolved?.id;
		},
	};
}
