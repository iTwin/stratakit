/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";

const GhostAlignerContext =
	React.createContext<GhostAlignerProps["align"]>(undefined);

interface GhostAlignerProps {
	/** The direction in which the ghost control should be aligned (using negative margin). */
	align:
		| "block"
		| "block-start"
		| "block-end"
		| "inline"
		| "inline-start"
		| "inline-end"
		| undefined;
}

/**
 * A context provider that helps with visual alignment of ghost controls.
 * @private
 */
export function GhostAligner(
	props: React.PropsWithChildren<GhostAlignerProps>,
) {
	return (
		<GhostAlignerContext.Provider value={props.align}>
			{props.children}
		</GhostAlignerContext.Provider>
	);
}

/**
 * Returns the value of the nearest `GhostAligner`.
 *
 * This should be used together with the CSS API:
 * - `🥝GhostAligner` class.
 * - `data-_sk-ghost-align` attribute.
 * - `--🥝GhostAligner-block-offset` and `--🥝GhostAligner-inline-offset` variables.
 *
 * @private
 */
export function useGhostAlignment() {
	return React.useContext(GhostAlignerContext);
}
