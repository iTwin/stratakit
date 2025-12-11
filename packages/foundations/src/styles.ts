/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import foundationsCss from "./~styles.css.js";
import { loadStyles } from "./styles.internal.js";

const packageName = "@stratakit/foundations";

/**
 * Loads all the foundations CSS into the specified root node or document. This includes:
 * - A basic CSS reset.
 * - Some opinionated global styles.
 * - CSS variables for light and dark color schemes.
 *
 * To specify a color scheme, use the `data-color-scheme` on the `<html>` element or the shadow-root host element.
 *
 * @param rootNode The root node (i.e. document or shadowRoot) where the styles should be loaded. Defaults to `document`.
 * @returns a cleanup function that can be used to remove the styles when they are no longer needed.
 */
function loadFoundationsStyles(rootNode?: Document | ShadowRoot) {
	rootNode ||= document;

	const { cleanup } = loadStyles(rootNode, {
		css: foundationsCss,
		key: `${packageName}@${__VERSION__}`,
	});

	return cleanup;
}

// ----------------------------------------------------------------------------

export { loadFoundationsStyles as unstable_loadStyles };
