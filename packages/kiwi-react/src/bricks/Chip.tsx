/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { forwardRef, type BaseProps } from "./~utils.js";

interface ChipProps extends BaseProps<"div"> {
	/** @default "solid" */
	variant?: "solid" | "outline";
}

/**
 */
export const Chip = forwardRef<"div", ChipProps>((props, forwardedRef) => {
	return <div>Chip</div>;
});
DEV: Chip.displayName = "Chip";
