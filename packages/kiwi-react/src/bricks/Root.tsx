/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import foundationsCss from "../foundations/styles.css.js";
import bricksCss from "./styles.css.js";
import { forwardRef, isBrowser, type BaseProps } from "./~utils.js";
import { useMergedRefs } from "./~hooks.js";

const css = foundationsCss + bricksCss;

// ----------------------------------------------------------------------------

interface RootProps extends BaseProps {
	/**
	 * The color scheme to use for all components under the Root.
	 */
	colorScheme: "light" | "dark";

	/**
	 * Whether to synchronize the color scheme with the parent document (or shadow-root host).
	 *
	 * This is useful when you don't have explicit control over the color scheme of the host.
	 *
	 * @default false
	 */
	synchronizeColorScheme?: boolean;

	/**
	 * The density to use for all components under the Root.
	 */
	density: "dense";
}

/**
 * Component to be used at the root of your application. It ensures that kiwi styles are loaded
 * and automatically applied to the current page or the encompassing shadow-root.
 */
export const Root = forwardRef<"div", RootProps>((props, forwardedRef) => {
	const { children, synchronizeColorScheme = false, ...rest } = props;

	return (
		<RootInternal {...rest} ref={forwardedRef}>
			<Styles />
			<Fonts />
			{synchronizeColorScheme ? (
				<SynchronizeColorScheme colorScheme={props.colorScheme} />
			) : null}
			{children}
		</RootInternal>
	);
});
DEV: Root.displayName = "Root";

// ----------------------------------------------------------------------------

const RootNodeContext = React.createContext<Document | ShadowRoot | null>(null);

/** Returns the closest [rootNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode). */
function useRootNode() {
	return React.useContext(RootNodeContext);
}

// ----------------------------------------------------------------------------

interface RootInternalProps extends Omit<RootProps, "synchronizeColorScheme"> {}

const RootInternal = forwardRef<"div", RootInternalProps>(
	(props, forwardedRef) => {
		const { children, colorScheme, density, ...rest } = props;

		const [rootNode, setRootNode] = React.useState<
			Document | ShadowRoot | null
		>(null);

		const findRootNodeFromRef = React.useCallback((element?: HTMLElement) => {
			if (!element) return;

			const rootNode = element.getRootNode();
			if (!isDocument(rootNode) && !isShadow(rootNode)) return;
			setRootNode(rootNode);
		}, []);

		return (
			<Ariakit.Role
				{...rest}
				className={cx("🥝-root", props.className)}
				data-kiwi-theme={colorScheme}
				data-kiwi-density={density}
				ref={useMergedRefs(forwardedRef, findRootNodeFromRef)}
			>
				<RootNodeContext.Provider value={rootNode}>
					{children}
				</RootNodeContext.Provider>
			</Ariakit.Role>
		);
	},
);

// ----------------------------------------------------------------------------

/**
 * Synchronizes `colorScheme` with the parent document (or shadow-root host).
 *
 * The host will have a `data-color-scheme` attribute set to the current color scheme.
 * If the host is a document, a `<meta name="color-scheme">` tag will also be updated (if found).
 */
function SynchronizeColorScheme({
	colorScheme,
}: { colorScheme: RootProps["colorScheme"] }) {
	const rootNode = useRootNode();

	useLayoutEffect(() => {
		if (!rootNode) return;

		if (isDocument(rootNode)) {
			rootNode.documentElement.dataset.colorScheme = colorScheme;
			const meta = rootNode.querySelector("meta[name='color-scheme']");
			if (meta) (meta as HTMLMetaElement).content = colorScheme;
		} else if (isShadow(rootNode)) {
			(rootNode.host as HTMLElement).dataset.colorScheme = colorScheme;
		}
	}, [rootNode, colorScheme]);

	return null;
}

// ----------------------------------------------------------------------------

function Styles() {
	const rootNode = useRootNode();

	useLayoutEffect(() => {
		if (!rootNode) return;
		loadStyles(rootNode, { css });
	}, [rootNode]);

	return null;
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

function Fonts() {
	const rootNode = useRootNode();

	useLayoutEffect(() => {
		if (!rootNode) return;
		loadFonts(rootNode);
	}, [rootNode]);

	return null;
}

// ----------------------------------------------------------------------------

/**
 * Conditionally loads InterVariable from the official CDN if the document
 * doesn’t already have it.
 */
function loadFonts(rootNode: Document | ShadowRoot) {
	const ownerWindow = getWindow(rootNode);

	if (
		!ownerWindow ||
		Array.from(ownerWindow.document.fonts).some(
			(font) => font.family === "InterVariable",
		)
	) {
		return;
	}

	const interStyles = {
		normal: "https://rsms.me/inter/font-files/InterVariable.woff2?v=4.1",
		italic: "https://rsms.me/inter/font-files/InterVariable-Italic.woff2?v=4.1",
	};

	for (const [style, url] of Object.entries(interStyles)) {
		const font = new ownerWindow.FontFace(
			"InterVariable",
			`url(${url}) format("woff2")`,
			{
				display: "swap",
				weight: "100 900",
				style,
			},
		);
		ownerWindow.document.fonts.add(font);
	}
}

// ----------------------------------------------------------------------------

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
