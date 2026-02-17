// @ts-check

import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";

const BASE_URL = process.env.BASE_FOLDER
	? `/${process.env.BASE_FOLDER}/docs`
	: "/docs";

const PROD_SITE_URL = process.env.GH_PAGES_URL;
const DEV_PORT = 4321;

/** `site` URL must only include the origin. */
const site = PROD_SITE_URL
	? new URL(PROD_SITE_URL).origin
	: `http://localhost:${DEV_PORT}`;

/** Combines the pathname from PROD_SITE_URL with BASE_URL. */
const base = (() => {
	const sitePathname = PROD_SITE_URL
		? new URL(PROD_SITE_URL).pathname.replace(/\/$/, "")
		: "";
	return `${sitePathname}${BASE_URL}`;
})();

// https://astro.build/config
export default defineConfig({
	site,
	base,
	integrations: [
		starlight({
			title: "StrataKit Docs",
			titleDelimiter: " – ",
			logo: {
				light: "./src/assets/stratakit-logo.svg",
				dark: "./src/assets/stratakit-logo-dark.svg",
			},
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
					href: "https://github.com/iTwin/stratakit",
				},
			],
			sidebar: [
				{
					label: "Getting started",
					autogenerate: { directory: "getting-started" },
				},
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
				baseUrl: "https://github.com/iTwin/stratakit/edit/main/apps/website/",
			},
			lastUpdated: true,
			customCss: ["./src/styles/index.css"],
			expressiveCode: {
				themes: ["github-dark", "github-light"],
			},
			plugins: [
				starlightResponsiveTables(),
				starlightLiveExamples(),
				starlightPrefixLinks(),
			],
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
	server: {
		port: DEV_PORT,
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
							value: `<iframe src=${`${base}/examples/${src}?preview`} title="${src} example" height="150"></iframe>`,
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
			if (!/\.[jt]sx?$/.test(importer ?? "")) return;
			const resolved = await this.resolve(`${source}?url`, importer, options);
			return resolved?.id;
		},
	};
}

/**
 * Starlight plugin that prefixes all markdown links with the base URL.
 * @returns {import("@astrojs/starlight/types").StarlightPlugin}
 */
function starlightPrefixLinks() {
	// Make sure the base path has a trailing slash.
	let base = BASE_URL;
	if (!base.endsWith("/")) base = `${base}/`;

	// From https://github.com/withastro/starlight/discussions/1763#discussioncomment-9146662.
	function remarkPrefixLinks() {
		return function transform(/** @type {any} */ tree) {
			function visitor(/** @type {any} */ node) {
				// Ignore links that aren’t relative to the root `/`
				if (!node.url.startsWith("/")) return;
				// Sanitize URL by removing leading `/`
				const relativeUrl = node.url.replace(/^.?\//, "");
				// Prefix with base path
				node.url = base + relativeUrl;
			}
			// Apply our visitor to Markdown links, including definition links
			visit(tree, "link", visitor);
			visit(tree, "definition", visitor);
			// Also prefix base to links written with HTML syntax (<a>)
			visit(tree, "html", function htmlVisitor(node) {
				node.value = node.value.replace(
					/(?<=href=")(?!https?:\/\/)\/?(.+)(?=")/g,
					`${base}$1`,
				);
			});
		};
	}

	return {
		name: "starlight-prefix-links",
		hooks: {
			"config:setup": ({ addIntegration }) => {
				addIntegration({
					name: "starlight-live-examples-integration",
					hooks: {
						"astro:config:setup": ({ command, config }) => {
							if (command !== "dev" && command !== "build") return;
							config.markdown.remarkPlugins.push(remarkPrefixLinks);
						},
					},
				});
			},
		},
	};
}
