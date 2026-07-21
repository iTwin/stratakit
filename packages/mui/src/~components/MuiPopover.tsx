/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { PopoverPaper } from "@mui/material/Popover";
import { useMergedRefs } from "@stratakit/internal-utils/hooks";
import { forwardRef } from "@stratakit/internal-utils/react";

import type { PopoverOwnerState } from "@mui/material/Popover";
import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

/** Returns a callback ref that sets a fallback value for `ariaLabelledByElements` using `ownerState.anchorEl`. */
export function useFallbackLabel(
	props: Pick<
		MuiPopoverPaperSlotProps,
		"aria-label" | "aria-labelledby" | "ownerState"
	>,
) {
	const {
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledBy,
		ownerState = {},
	} = props;

	return React.useCallback(
		(element?: HTMLElement) => {
			if (!element || !(ownerState.anchorEl instanceof HTMLElement)) return;
			if (
				ariaLabel ||
				ariaLabelledBy ||
				element.ariaLabel ||
				element.ariaLabelledByElements?.length
			) {
				return;
			}

			// Use the trigger button as the fallback accessible name for the popover.
			element.ariaLabelledByElements = [ownerState.anchorEl];
		},
		[ownerState.anchorEl, ariaLabel, ariaLabelledBy],
	);
}

// ----------------------------------------------------------------------------

interface MuiPopoverPaperSlotProps extends BaseProps {
	ownerState?: Pick<PopoverOwnerState, "anchorEl">;
}

const MuiPopoverPaperSlot = forwardRef<"div", MuiPopoverPaperSlotProps>(
	(props, forwardedRef) => {
		return (
			<PopoverPaper
				{...props}
				ref={useMergedRefs(forwardedRef, useFallbackLabel(props))}
			/>
		);
	},
);
DEV: MuiPopoverPaperSlot.displayName = "MuiPopoverPaperSlot";

// ----------------------------------------------------------------------------

export { MuiPopoverPaperSlot };
