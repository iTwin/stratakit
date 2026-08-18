/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { PortalContext as AkPortalContext } from "@ariakit/react/portal";
import { useIsClient } from "@stratakit/internal-utils/hooks";

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

export const PortalWrapperContext = React.createContext<
	((portal: React.ReactNode) => React.ReactNode) | undefined
>(undefined);

// ----------------------------------------------------------------------------

export const PortalContext = React.createContext<
	(() => HTMLElement | null) | undefined
>(undefined);

// ----------------------------------------------------------------------------

interface PortalProviderProps {
	children?: React.ReactNode;
	/**
	 * Needs to be a function as a workaround for https://github.com/mui/material-ui/issues/48882
	 *
	 * Function is lazily resolved by MUI when the portal mounts. Passing the
	 * element directly requires the theme to be recreated once the element becomes available, which
	 * leaves a one-commit window where portals fall back to `<body>`.
	 *
	 * The Ariakit `PortalContext` value is resolved by calling the provided
	 * function whenever its reference changes.
	 */
	container: () => HTMLElement | null;
}

/**
 * Provides the element that will contain the portal.
 */
export function PortalProvider(props: PortalProviderProps) {
	const { children, container: getContainer } = props;

	const wrapPortal = React.useContext(PortalWrapperContext);

	const container = React.useMemo(() => {
		return getContainer();
	}, [getContainer]);
	return (
		<PortalContext.Provider value={getContainer}>
			<AkPortalContext.Provider value={container}>
				{wrapPortal ? wrapPortal(children) : children}
			</AkPortalContext.Provider>
		</PortalContext.Provider>
	);
}
DEV: PortalProvider.displayName = "PortalProvider";

// ----------------------------------------------------------------------------
