/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as ReactDOM from "react-dom";
import { PortalContext } from "@ariakit/react/portal";
import { Role } from "@ariakit/react/role";
import cx from "classnames";
import componentsCss from "./~components.css.js"; // TODO: remove this implicit dependency on bricks and structures
import foundationsCss from "./~styles.css.js";
import {
	forwardRef,
	getOwnerDocument,
	getWindow,
	identity,
	isBrowser,
	isDocument,
} from "./~utils.js";
import {
	HtmlSanitizerContext,
	RootContext,
	RootNodeContext,
	spriteSheetId,
	useRootNode,
} from "./Root.internal.js";
import { loadStyles } from "./styles.internal.js";

import type { BaseProps } from "./~utils.js";

const css = foundationsCss + componentsCss;

/** This helps pinpoint the location where this module is imported from. */
const stack = new Error()?.stack?.split("Error")?.at(-1)?.trim() || "";

/** A map of all StrataKit packages and their versions. Will be expanded later (via Context). */
const versions = new Map([["@stratakit/foundations", __VERSION__]]);

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
	 * It can be disabled if you want to isolate StrataKit's styles to `<Root>` and its descendants.
	 *
	 * @default true
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
	 * unstable_htmlSanitizer={DOMPurify.sanitize}
	 * ```
	 */
	unstable_htmlSanitizer?: (html: string) => string;

	/**
	 * Allows to customize the root portal container element.
	 */
	portalContainer?: React.ReactElement;

	/**
	 * The root node to which this `Root` component is attached.
	 *
	 * This needs to be set when the `Root` is rendered within shadow DOM or a popout window.
	 *
	 * @default document
	 */
	rootNode?: Document | ShadowRoot;
}

/**
 * Component to be used at the root of your application. It ensures that StrataKit styles and fonts are loaded
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
	throwIfNotSingleton();

	const {
		children,
		synchronizeColorScheme = false,
		unstable_htmlSanitizer = identity,
		portalContainer: portalContainerProp,
		...rest
	} = props;

	return (
		<RootContext.Provider value={{ versions }}>
			<RootInternal {...rest} ref={forwardedRef}>
				<Styles />
				<Fonts />
				<InlineSpriteSheet />

				{synchronizeColorScheme ? (
					<SynchronizeColorScheme colorScheme={props.colorScheme} />
				) : null}

				<HtmlSanitizerContext.Provider value={unstable_htmlSanitizer}>
					<PortalProvider
						colorScheme={props.colorScheme}
						density={props.density}
						portalContainerProp={portalContainerProp}
					>
						{children}
					</PortalProvider>
				</HtmlSanitizerContext.Provider>
			</RootInternal>
		</RootContext.Provider>
	);
});
DEV: Root.displayName = "Root";

// ----------------------------------------------------------------------------

interface RootInternalProps
	extends BaseProps,
		Pick<RootProps, "colorScheme" | "density" | "rootNode"> {}

const RootInternal = forwardRef<"div", RootInternalProps>(
	(props, forwardedRef) => {
		const {
			children,
			colorScheme,
			density,
			rootNode = isBrowser ? document : undefined,
			...rest
		} = props;

		return (
			<Role
				{...rest}
				className={cx("🥝Root", props.className)}
				data-_sk-theme={colorScheme}
				data-_sk-density={density}
				ref={forwardedRef}
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
}: {
	colorScheme: RootProps["colorScheme"];
}) {
	const rootNode = useRootNode();

	React.useInsertionEffect(() => {
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

interface PortalProviderProps
	extends Pick<RootProps, "colorScheme" | "density"> {
	portalContainerProp?: RootProps["portalContainer"];
}

function PortalProvider(props: React.PropsWithChildren<PortalProviderProps>) {
	const [portalContainer, setPortalContainer] =
		React.useState<HTMLElement | null>(null);

	return (
		<PortalContext.Provider value={portalContainer}>
			{props.children}
			<PortalContainer
				colorScheme={props.colorScheme}
				density={props.density}
				ref={setPortalContainer}
				render={props.portalContainerProp}
			/>
		</PortalContext.Provider>
	);
}

// ----------------------------------------------------------------------------

interface PortalContainerProps
	extends Pick<RootProps, "colorScheme" | "density" | "render"> {}

/** A separate root rendered at the end of root node, to be used as the container for all portals. */
const PortalContainer = forwardRef<"div", PortalContainerProps>(
	(props, forwardedRef) => {
		const rootNode = useRootNode();
		if (!rootNode) return null;

		const destination = isDocument(rootNode) ? rootNode.body : rootNode;
		if (!destination) return null;

		return ReactDOM.createPortal(
			<Role
				render={props.render}
				className="🥝Root"
				data-_sk-theme={props.colorScheme}
				data-_sk-density={props.density}
				style={{ display: "contents" }}
				ref={forwardedRef}
			/>,
			destination,
		);
	},
);

// ----------------------------------------------------------------------------

function Styles() {
	const rootNode = useRootNode();

	React.useInsertionEffect(
		/** Adds `@layer reset` _before_ all other styles to ensure correct layer order.  */
		function addResetLayer() {
			if (!rootNode) return;
			const styleElement = document.createElement("style");
			((rootNode as Document).head || rootNode).prepend(styleElement);
			styleElement.textContent = "@layer reset;";
		},
		[rootNode],
	);

	React.useInsertionEffect(() => {
		if (!rootNode) return;
		const { cleanup } = loadStyles(rootNode, { css });
		return cleanup;
	}, [rootNode]);

	return null;
}

// ----------------------------------------------------------------------------

function Fonts() {
	const rootNode = useRootNode();

	React.useInsertionEffect(() => {
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

	React.useInsertionEffect(
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

/**
 * This function injects the location of this file into `globalThis`, and throws an error
 * if more than one location is detected.
 */
function throwIfNotSingleton() {
	DROP: return;

	// biome-ignore lint/correctness/noUnreachable: The early return will be removed by build script.
	const symbol = Symbol.for("@stratakit/foundations");

	const _globalThis = globalThis as typeof globalThis & {
		[symbol]: { versions?: Set<string> };
	};
	_globalThis[symbol] ??= { versions: new Set() };

	if (stack) _globalThis[symbol].versions?.add(stack);
	if ((_globalThis[symbol].versions?.size || 0) > 1) {
		console.table(
			Array.from(_globalThis[symbol].versions || []).map((stack) => ({
				"@stratakit/foundations location": stack,
			})),
		);
		throw new Error(
			`Multiple instances of @stratakit/foundations detected. This can lead to unexpected behavior.`,
		);
	}
}

// ----------------------------------------------------------------------------

function isShadow(node?: Node): node is ShadowRoot {
	return (
		node instanceof ShadowRoot ||
		(node?.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
			!!(node as ShadowRoot)?.host)
	);
}
