/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import rawStyles from "./styles.css?inline";

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

	useLayoutEffect(() => {
		const rootNode = templateRef.current?.getRootNode();
		if (!(rootNode instanceof Document) && !(rootNode instanceof ShadowRoot)) {
			return;
		}

		loadStyles(rootNode).then((loaded) => {
			if (loaded) templateRef.current?.remove();
		});
	}, []);

	return <template ref={templateRef} />;
}

// ----------------------------------------------------------------------------

/** Maintains a single stylesheet object per window to enable reuse. */
const styleSheets = new WeakMap<Window, CSSStyleSheet>();

/** Adds an adopted stylesheet to the root node, and falls back to <style> element on older browsers. */
function loadStyles(rootNode: Document | ShadowRoot) {
	return new Promise((resolve) =>
		resolve(
			(() => {
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
					styleElement.textContent = rawStyles;
					((rootNode as Document).head || rootNode).appendChild(styleElement);
					return true;
				}

				const styleSheet =
					styleSheets.get(_window) || new _window.CSSStyleSheet();
				if (!styleSheets.has(_window)) {
					styleSheets.set(_window, styleSheet);
				}
				styleSheet.replaceSync(rawStyles);

				if (!rootNode.adoptedStyleSheets.includes(styleSheet)) {
					rootNode.adoptedStyleSheets.push(styleSheet);
				}
				return true;
			})(),
		),
	);
}

// ----------------------------------------------------------------------------

const isBrowser = typeof document !== "undefined";

const supportsAdoptedStylesheets =
	isBrowser && "adoptedStyleSheets" in Document.prototype;

function getOwnerDocument(node: Node) {
	return (node instanceof Document ? node : node.ownerDocument) || null;
}

function getWindow(node: Node) {
	const ownerDocument = getOwnerDocument(node);
	return ownerDocument?.defaultView || null;
}

const useLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;
