/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import css from "./~blue.css.js";

// ----------------------------------------------------------------------------

function isDocument(node?: Node): node is Document {
	return node?.nodeType === Node.DOCUMENT_NODE;
}

function getOwnerDocument(node?: Node | null) {
	if (!node) return null;
	return (isDocument(node) ? node : node.ownerDocument) || null;
}

const isBrowser = typeof document !== "undefined";

function getWindow(node: Node) {
	const ownerDocument = getOwnerDocument(node);
	return ownerDocument?.defaultView || null;
}

const supportsAdoptedStylesheets =
	isBrowser && "adoptedStyleSheets" in Document.prototype;

// ----------------------------------------------------------------------------

const styleSheets = new Map<string, WeakMap<Window, CSSStyleSheet>>(
	Object.entries({ default: new WeakMap() }),
);

function loadStyles(
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
			!rootNode.querySelector(`style[data-_app="${key}"]`)
		) {
			const styleElement = ownerDocument.createElement("style");
			styleElement.dataset._app = key;
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

function loadBlueStyles(rootNode?: Document | ShadowRoot) {
	rootNode ||= document;

	const { cleanup } = loadStyles(rootNode, {
		css,
		key: "sk-blue",
	});

	return cleanup;
}

// ----------------------------------------------------------------------------

export { loadBlueStyles };
