/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import MenuList from "@mui/material/MenuList";
import { useMergedRefs } from "@stratakit/internal-utils/hooks";
import { forwardRef } from "@stratakit/internal-utils/react";
import { useFallbackLabel } from "./MuiPopover.js";

import type { MenuOwnerState } from "@mui/material/Menu";
import type { MenuListProps } from "@mui/material/MenuList";

// ----------------------------------------------------------------------------

interface MuiMenuListSlotProps extends MenuListProps {
	ownerState?: Pick<MenuOwnerState, "anchorEl">;
}

const MuiMenuListSlot = forwardRef<"ul", MuiMenuListSlotProps>(
	(props, forwardedRef) => {
		return (
			<MenuList
				{...props}
				ref={useMergedRefs(forwardedRef, useFallbackLabel(props))}
			/>
		);
	},
);
DEV: MuiMenuListSlot.displayName = "MuiMenuListSlot";

// ----------------------------------------------------------------------------

export { MuiMenuListSlot };
