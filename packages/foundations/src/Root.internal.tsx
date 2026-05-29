/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { PortalContext } from "@ariakit/react/portal";
import { useIsClient, useSafeContext } from "./~hooks.js";

// ----------------------------------------------------------------------------

/** @private */
export const RootContext = React.createContext<RootContextValue | undefined>(
	undefined,
);
DEV: RootContext.displayName = "RootContext";

interface RootContextValue {
	/** A map of all StrataKit packages and their versions. */
	versions?: Map<string, string>;

	/** Value of the `rootNode` prop passed to the `Root`. */
	rootNode?: Document | ShadowRoot;

	/** Function to load styles into the rootNode. */
	loadStyles?: (
		rootNode: Document | ShadowRoot,
		options: { css: string; key: string },
	) => { cleanup: () => void };

	/** Function to wrap the portal boundary. */
	wrapPortal?: (portal: React.ReactNode) => React.ReactNode;
}

// ----------------------------------------------------------------------------

export const RootNodeContext = React.createContext<
	Document | ShadowRoot | undefined
>(undefined);

/** Returns the closest [rootNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode). */
export function useRootNode() {
	const maybeRootNode = React.useContext(RootNodeContext);
	const isClient = useIsClient();

	if (!isClient) return undefined;
	return maybeRootNode;
}

// ----------------------------------------------------------------------------

export const spriteSheetId = "🥝-inline-sprites";

// ----------------------------------------------------------------------------

export const HtmlSanitizerContext = React.createContext<
	((html: string) => string) | undefined
>(undefined);

// ----------------------------------------------------------------------------

interface PortalProviderProps {
	children?: React.ReactNode;
	container: HTMLElement | null;
}

/**
 * Provides the element that will contain the portal.
 */
export function PortalProvider(props: PortalProviderProps) {
	const { children, container } = props;

	const { wrapPortal } = useSafeContext(RootContext);
	return (
		<PortalContext.Provider value={container}>
			{wrapPortal ? wrapPortal(children) : children}
		</PortalContext.Provider>
	);
}
DEV: PortalProvider.displayName = "PortalProvider";

// ----------------------------------------------------------------------------
