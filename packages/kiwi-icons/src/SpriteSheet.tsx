/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as fs from "node:fs";
import { join } from "node:path";
import type * as esbuild from "esbuild";

const packageName = "@itwin/itwinui-icons";
// import { name as packageName } from "../package.json" with { type: "json" };

/**
 * Component that generates an inline sprite sheet of all SVG symbols in the package.
 * Should be used on the server to inject the sprite sheet into the initial HTML.
 *
 * ```jsx
 * import { renderToString } from "react-dom/server";
 * const html = renderToString(<SpriteSheet />);
 * ```
 */
export function SpriteSheet() {
	if (typeof window !== "undefined")
		throw new Error("SpriteSheet should only be rendered on the server.");

	const symbols = new SpriteSheetGenerator().spriteSheetContents;

	return (
		<svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: This will run on server only. */}
			<defs dangerouslySetInnerHTML={{ __html: symbols }} />
		</svg>
	);
}

// ----------------------------------------------------------------------------

/**
 * Esbuild plugin that replaces SVG imports with string variables containing the SVG symbol id.
 *
 * Must be used when the `<SpriteSheet>` component is rendered in the initial HTML.
 */
export function replaceSvgImports() {
	return {
		name: "replace-svg-imports",
		setup(build) {
			build.onResolve({ filter: /\.svg$/ }, (args) => {
				if (args.kind !== "import-statement") return;
				if (!args.path.startsWith(packageName)) return;
				return {
					path: join(args.resolveDir, args.path),
					namespace: "🥝:replace-svg-import",
				};
			});
			build.onLoad(
				{ filter: /.*/, namespace: "🥝:replace-svg-import" },
				(args) => {
					const filename = args.path.split("/").pop();
					if (!filename) throw new Error("Filename not found");
					const contents = `export default "${getHref(filename)}"`;
					return { contents, loader: "js" };
				},
			);
		},
	} satisfies esbuild.Plugin;
}

// ----------------------------------------------------------------------------

/**
 * Get a unique href for an icon.
 * This is used to reference the symbol from the SpriteSheet and should be used
 * with the `<Icon>` component.
 *
 * ```jsx
 * const closeIconHref = getHref("close.svg");
 *
 * <Icon href={closeIconHref} />
 * ```
 */
export function getHref(filename: string) {
	return `#🥝${filename}`;
}

// ----------------------------------------------------------------------------

const iconsDir = new URL("../icons", import.meta.url);

class SpriteSheetGenerator {
	#icons: Array<{ name: string; content: string }> = [];
	#spriteSheetContents = "";

	constructor() {
		this.#init();
	}

	#init() {
		this.#icons = fs.readdirSync(iconsDir).map((filename) => {
			const { pathname } = new URL(`../icons/${filename}`, import.meta.url);
			const iconContents = fs.readFileSync(pathname, "utf-8");
			return { name: filename, content: iconContents };
		});
		this.#generateSpriteSheet();
	}

	#generateSpriteSheet() {
		const symbols = this.#icons
			.map((icon) => {
				return icon.content
					.match(/<symbol.*?<\/symbol>/gs)
					?.join("\n")
					.replaceAll(`id="`, `id="🥝${icon.name}--`); // make ids globally unique
			})
			.join("\n");
		this.#spriteSheetContents = `${symbols}`;
	}

	get spriteSheetContents() {
		return this.#spriteSheetContents;
	}
}
