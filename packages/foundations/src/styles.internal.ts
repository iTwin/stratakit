/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { getOwnerDocument, getWindow, isBrowser } from "./~utils.js";

/**
 * A Map of WeakMaps containing information for all stylesheets.
 *
 * The outer Map expects string keys (unique per set of CSS contents).
 * The inner WeakMap maintains a single CSSStyleSheet object per window (to enable reuse).
 */
const styleSheets = new Map<string, WeakMap<Window, CSSStyleSheet>>(
	Object.entries({ default: new WeakMap() }),
);

/**
 * Maintains counts for stylesheet references (differentiated by key) per root node.
 * Ensures stylesheets are only removed when the _last_ consumer cleans up.
 */
const styleSheetRefs = new Map<string, WeakMap<Document | ShadowRoot, number>>(
	Object.entries({ default: new WeakMap() }),
);

/**
 * Adds css to the root node using `adoptedStyleSheets` in modern browsers.
 *
 * Pass an optional key to distinguish multiple stylesheets from each other.
 *
 * Returns a cleanup function to remove the styles.
 */
export function loadStyles(
	rootNode: Document | ShadowRoot,
	{ css, key = "default" }: { css: string; key?: string },
) {
	let cleanup = () => {};

	const loaded = (() => {
		if (!isBrowser) return false;
		if (!supportsAdoptedStylesheets) return false;

		const ownerDocument = getOwnerDocument(rootNode);
		const _window = getWindow(rootNode);

		if (!ownerDocument || !_window) return false;

		const styleSheet =
			styleSheets.get(key)?.get(_window) || new _window.CSSStyleSheet();
		if (!styleSheets.has(key)) styleSheets.set(key, new WeakMap());
		if (!styleSheets.get(key)?.has(_window)) {
			styleSheets.get(key)?.set(_window, styleSheet);
			styleSheet.replaceSync(css);
		}

		// Track reference count for this stylesheet in this root node
		const refs = styleSheetRefs.get(key) || new WeakMap();
		if (!styleSheetRefs.has(key)) styleSheetRefs.set(key, refs);

		const currentCount = refs.get(rootNode) || 0;
		refs.set(rootNode, currentCount + 1);

		if (!rootNode.adoptedStyleSheets.includes(styleSheet)) {
			rootNode.adoptedStyleSheets.push(styleSheet);
		}

		// Only remove the stylesheet when the last reference is cleaned up,
		// otherwise simply decrement the reference count.
		cleanup = () => {
			const count = refs.get(rootNode) || 0;
			if (count <= 1) {
				refs.delete(rootNode);
				rootNode.adoptedStyleSheets = rootNode.adoptedStyleSheets.filter(
					(sheet) => sheet !== styleSheet,
				);
			} else {
				refs.set(rootNode, count - 1);
			}
		};

		return true;
	})();

	return { loaded, cleanup };
}

// ----------------------------------------------------------------------------

const supportsAdoptedStylesheets =
	isBrowser && "adoptedStyleSheets" in Document.prototype;
