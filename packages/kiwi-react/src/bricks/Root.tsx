/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Role } from "@ariakit/react/role";
import { PortalContext } from "@ariakit/react/portal";
import cx from "classnames";
import foundationsCss from "../foundations/styles.css.js";
import bricksCss from "./styles.css.js";
import {
	forwardRef,
	getOwnerDocument,
	identity,
	isBrowser,
	isDocument,
	type BaseProps,
} from "./~utils.js";
import { useLayoutEffect, useMergedRefs } from "./~hooks.js";
import {
	HtmlSanitizerContext,
	RootNodeContext,
	spriteSheetId,
	useRootNode,
} from "./Root.internal.js";

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

	/**
	 * An HTML sanitizer function that will be used across all components wherever DOM elements
	 * are created from HTML strings.
	 *
	 * When this prop is not passed, sanitization will be skipped.
	 *
	 * Example:
	 * ```tsx
	 * unstablized_htmlSanitizer={DOMPurify.sanitize}
	 * ```
	 */
	unstable_htmlSanitizer?: (html: string) => string;
}

/**
 * Component to be used at the root of your application. It ensures that kiwi styles and fonts are loaded
 * and automatically applied to the current page or the encompassing shadow-root.
 *
 * Make sure to specify the `colorScheme` and `density` props.
 *
 * Example:
 * ```tsx
 * <Root colorScheme="dark" density="dense">
 *   <App />
 * </Root>
 * ```
 */
export const Root = forwardRef<"div", RootProps>((props, forwardedRef) => {
	const {
		children,
		synchronizeColorScheme = false,
		unstable_htmlSanitizer = identity,
		...rest
	} = props;

	const [portalContainer, setPortalContainer] =
		React.useState<HTMLElement | null>(null);

	return (
		<RootInternal {...rest} ref={forwardedRef}>
			<Styles />
			<Fonts />
			<InlineSpriteSheet />

			{synchronizeColorScheme ? (
				<SynchronizeColorScheme colorScheme={props.colorScheme} />
			) : null}

			<PortalContainer
				colorScheme={props.colorScheme}
				density={props.density}
				ref={setPortalContainer}
			/>

			<PortalContext.Provider value={portalContainer}>
				<HtmlSanitizerContext.Provider value={unstable_htmlSanitizer}>
					{children}
				</HtmlSanitizerContext.Provider>
			</PortalContext.Provider>
		</RootInternal>
	);
});
DEV: Root.displayName = "Root";

// ----------------------------------------------------------------------------

interface RootInternalProps
	extends BaseProps,
		Pick<RootProps, "colorScheme" | "density"> {}

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
			<Role
				{...rest}
				className={cx("🥝-root", props.className)}
				data-kiwi-theme={colorScheme}
				data-kiwi-density={density}
				ref={useMergedRefs(forwardedRef, findRootNodeFromRef)}
			>
				<RootNodeContext.Provider value={rootNode}>
					{children}
				</RootNodeContext.Provider>
			</Role>
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

/** A separate root rendered at the end of root node, to be used as the container for all portals. */
const PortalContainer = forwardRef<
	"div",
	Pick<RootProps, "colorScheme" | "density">
>((props, forwardedRef) => {
	const rootNode = useRootNode();
	if (!rootNode) return null;

	const destination = isDocument(rootNode) ? rootNode.body : rootNode;
	if (!destination) return null;

	return ReactDOM.createPortal(
		<div
			className="🥝-root"
			data-kiwi-theme={props.colorScheme}
			data-kiwi-density={props.density}
			style={{ display: "contents" }}
			ref={forwardedRef}
		/>,
		destination,
	);
});

// ----------------------------------------------------------------------------

function Styles() {
	const rootNode = useRootNode();

	useLayoutEffect(() => {
		if (!rootNode) return;
		const { cleanup } = loadStyles(rootNode, { css });
		return cleanup;
	}, [rootNode]);

	return null;
}

// ----------------------------------------------------------------------------

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
 * A hidden `<svg>` element that gets injected into the `<body>`. This hidden element gets used as
 * a container for holding inlined SVG sprites (added/used by `<Icon>` component in certain scenarios).
 */
function InlineSpriteSheet() {
	const rootNode = useRootNode();

	React.useEffect(
		function maybeCreateSpriteSheet() {
			const ownerDocument = getOwnerDocument(rootNode);
			if (!ownerDocument) return;

			// Ensure there is only one.
			const spriteSheet = ownerDocument?.getElementById(spriteSheetId);
			if (spriteSheet) return;

			const svg = ownerDocument.createElementNS(
				"http://www.w3.org/2000/svg",
				"svg",
			);
			svg.id = spriteSheetId;
			svg.style.display = "none";
			Object.defineProperty(svg, Symbol.for("🥝"), {
				value: { icons: new Map() }, // Map of icon URLs that have already been inlined.
			});
			ownerDocument.body.appendChild(svg);

			return () => {
				if (svg.isConnected) {
					ownerDocument.body.removeChild(svg);
				}
			};
		},
		[rootNode],
	);

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
		!ownerWindow?.document?.fonts ||
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

function getWindow(node: Node) {
	const ownerDocument = getOwnerDocument(node);
	return ownerDocument?.defaultView || null;
}
