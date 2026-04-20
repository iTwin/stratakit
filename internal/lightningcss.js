/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { createRequire } from "node:module";
import * as path from "node:path";

import * as lightningcss from "lightningcss";
import { customAtRules, mixinsTransform } from "./lightningcss.mixins.js";
import {
	accentsTransform,
	primitivesTransform,
	staticVariablesTransform,
	themeTransform,
	typographyTokensTransform,
} from "./lightningcss.tokens.js";

const require = createRequire(import.meta.url);

/**
 * Returns a fresh composed LightningCSS visitor.
 *
 * Some of the underlying transforms keep per-pass state, so a new visitor
 * should be created for each bundle/transform invocation.
 *
 * @returns {import("lightningcss").Visitor<typeof customAtRules>}
 */
export function createVisitor() {
	return lightningcss.composeVisitors([
		mixinsTransform(),
		accentsTransform(),
		primitivesTransform(),
		themeTransform(),
		typographyTokensTransform(),
		staticVariablesTransform(),
	]);
}

/** Resolves CSS `@import` specifiers for LightningCSS bundling. */
export const resolver = {
	/**
	 * Relative and absolute paths stay anchored to the importing file, while bare
	 * specifiers are resolved through Node package resolution.
	 */
	resolve: (
		/** @type {string} */ specifier,
		/** @type {string} */ importer,
	) => {
		if (specifier.startsWith(".") || specifier.startsWith("/")) {
			return path.resolve(path.dirname(importer), specifier);
		}

		return require.resolve(specifier);
	},
};

/** Browser targets for CSS lowering. */
export const targets = {
	chrome: (110 << 16) | (0 << 8), // chrome 110.0
	firefox: (110 << 16) | (0 << 8), // firefox 110.0
	safari: (16 << 16) | (4 << 8), // safari 16.4
};

export { customAtRules };
