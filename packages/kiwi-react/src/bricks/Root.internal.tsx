/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { useIsClient } from "./~hooks.js";
import { identity } from "./~utils.js";

// ----------------------------------------------------------------------------

export const RootNodeContext = React.createContext<
	Document | ShadowRoot | null
>(null);

/** Returns the closest [rootNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode). */
export function useRootNode() {
	const maybeRootNode = React.useContext(RootNodeContext);
	const isClient = useIsClient();

	if (!isClient) return undefined;
	return maybeRootNode;
}

// ----------------------------------------------------------------------------

export const spriteSheetId = "🥝-inline-sprite";

// ----------------------------------------------------------------------------

export const HtmlSanitizerContext = React.createContext<
	((html: string) => string) | undefined
>(identity);
