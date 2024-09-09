/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import foundationsCss from "../foundations/styles.css.js";
import bricksCss from "./styles.css.js";

const css = foundationsCss + bricksCss;

/**
 * Component to be used at the root of your application. It ensures that kiwi styles are loaded
 * and automatically applied to the current page or the encompassing shadow-root.
 */
export const Root = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Styles />
			{children}
		</>
	);
};

// ----------------------------------------------------------------------------

function Styles() {
	const templateRef = React.useRef<HTMLTemplateElement | null>(null);
	const [loaded, setLoaded] = React.useState(false);

	useLayoutEffect(() => {
		const rootNode = templateRef.current?.getRootNode();
		if (!isDocument(rootNode) && !isShadow(rootNode)) {
			return;
		}

		const { loaded } = loadStyles(rootNode, { css: css });
		setLoaded(loaded);
	}, []);

	return !loaded ? <template ref={templateRef} /> : null;
}

// ----------------------------------------------------------------------------

/** Maintains a single stylesheet object per window to enable reuse. */
const styleSheets = new WeakMap<Window, CSSStyleSheet>();

/**
 * Adds css to the root node using `adoptedStyleSheets` in modern browsers
 * and falls back to using a `<style>` element in older browsers.
 */
function loadStyles(rootNode: Document | ShadowRoot, { css }: { css: string }) {
	const loaded = (() => {
		if (!isBrowser) return false;

		const ownerDocument = getOwnerDocument(rootNode);
		const _window = getWindow(rootNode);

		if (!ownerDocument || !_window) return false;

		// Inject <style> elements if `adoptedStyleSheets` is not supported.
		if (
			!supportsAdoptedStylesheets &&
			!rootNode.querySelector("style[data-kiwi]")
		) {
			const styleElement = ownerDocument.createElement("style");
			styleElement.dataset.kiwi = "true";
			styleElement.textContent = css;
			((rootNode as Document).head || rootNode).appendChild(styleElement);
			return true;
		}

		const styleSheet = styleSheets.get(_window) || new _window.CSSStyleSheet();
		if (!styleSheets.has(_window)) {
			styleSheets.set(_window, styleSheet);
		}
		styleSheet.replaceSync(css);

		if (!rootNode.adoptedStyleSheets.includes(styleSheet)) {
			rootNode.adoptedStyleSheets.push(styleSheet);
		}
		return true;
	})();

	return { loaded };
}

// ----------------------------------------------------------------------------

const isBrowser = typeof document !== "undefined";

const supportsAdoptedStylesheets =
	isBrowser && "adoptedStyleSheets" in Document.prototype;

function isShadow(node?: Node): node is ShadowRoot {
	return (
		node instanceof ShadowRoot ||
		(node?.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
			!!(node as ShadowRoot)?.host)
	);
}

function isDocument(node?: Node): node is Document {
	return node?.nodeType === Node.DOCUMENT_NODE;
}

function getOwnerDocument(node: Node) {
	return (isDocument(node) ? node : node.ownerDocument) || null;
}

function getWindow(node: Node) {
	const ownerDocument = getOwnerDocument(node);
	return ownerDocument?.defaultView || null;
}

const useLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;
