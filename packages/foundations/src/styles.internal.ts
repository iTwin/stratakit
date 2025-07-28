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
 * Adds css to the root node using `adoptedStyleSheets` in modern browsers
 * and falls back to using a `<style>` element in older browsers.
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

		const ownerDocument = getOwnerDocument(rootNode);
		const _window = getWindow(rootNode);

		if (!ownerDocument || !_window) return false;

		// Inject <style> elements if `adoptedStyleSheets` is not supported.
		if (
			!supportsAdoptedStylesheets &&
			!rootNode.querySelector(`style[data-kiwi="${key}"]`)
		) {
			const styleElement = ownerDocument.createElement("style");
			styleElement.dataset.kiwi = key;
			styleElement.textContent = css;
			((rootNode as Document).head || rootNode).appendChild(styleElement);
			cleanup = () => styleElement.remove();
			return true;
		}

		const styleSheet =
			styleSheets.get(key)?.get(_window) || new _window.CSSStyleSheet();
		if (!styleSheets.get(key)?.has(_window)) {
			styleSheets.get(key)?.set(_window, styleSheet);
		}
		styleSheet.replaceSync(css);

		if (!rootNode.adoptedStyleSheets.includes(styleSheet)) {
			rootNode.adoptedStyleSheets.push(styleSheet);

			cleanup = () => {
				rootNode.adoptedStyleSheets = rootNode.adoptedStyleSheets.filter(
					(sheet) => sheet !== styleSheet,
				);
			};
		}

		return true;
	})();

	return { loaded, cleanup };
}

// ----------------------------------------------------------------------------

const supportsAdoptedStylesheets =
	isBrowser && "adoptedStyleSheets" in Document.prototype;
