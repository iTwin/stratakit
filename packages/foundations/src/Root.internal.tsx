/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
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

	/** Element to customize the portal provider. */
	portalProvider?: React.ReactElement | undefined;
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

export const PortalContext = React.createContext<
	| {
			container: HTMLElement | null;
			/**
			 * Function that is lazily resolved by MUI when the portal mounts. Passing the
			 * element directly requires the theme to be recreated once the element becomes available, which
			 * leaves a one-commit window where portals fall back to `<body>`.
			 *
			 * Needed to workaround https://github.com/mui/material-ui/issues/48882
			 */
			unstable_getContainer?: () => HTMLElement | null;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------
