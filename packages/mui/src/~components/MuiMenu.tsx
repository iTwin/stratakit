/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import MenuList from "@mui/material/MenuList";
import {
	forwardRef,
	useMergedRefs,
} from "@stratakit/foundations/secret-internals";

import type { MenuOwnerState } from "@mui/material/Menu";
import type { MenuListProps } from "@mui/material/MenuList";

// ----------------------------------------------------------------------------

interface MuiMenuListSlotProps extends MenuListProps {
	ownerState?: Pick<MenuOwnerState, "anchorEl">;
}

const MuiMenuListSlot = forwardRef<"ul", MuiMenuListSlotProps>(
	(props, forwardedRef) => {
		const { anchorEl } = props.ownerState || {};

		const addFallbackLabel = React.useCallback(
			(element?: HTMLElement) => {
				if (!element || !(anchorEl instanceof HTMLElement)) return;
				if (
					element.getAttribute("aria-labelledby") != null ||
					element.getAttribute("aria-label") != null
				) {
					return;
				}

				// Use the trigger button as the fallback accessible name for the menu.
				element.ariaLabelledByElements = [anchorEl];
			},
			[anchorEl],
		);

		return (
			<MenuList
				{...props}
				ref={useMergedRefs(forwardedRef, addFallbackLabel)}
			/>
		);
	},
);
DEV: MuiMenuListSlot.displayName = "MuiMenuListSlot";

// ----------------------------------------------------------------------------

export { MuiMenuListSlot };
