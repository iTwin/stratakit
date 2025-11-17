/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { useIsClient } from "./~hooks.js";

// ----------------------------------------------------------------------------

/** @private */
export const RootContext = React.createContext<RootContextValue | undefined>(
	undefined,
);
DEV: RootContext.displayName = "RootContext";

interface RootContextValue {
	/** A map of all StrataKit packages and their versions. */
	versions?: Map<string, string>;
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
