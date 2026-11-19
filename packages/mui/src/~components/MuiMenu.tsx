/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import MenuList from "@mui/material/MenuList";
import { useMergedRefs } from "@stratakit/internal-utils/hooks";
import { forwardRef } from "@stratakit/internal-utils/react";
import { useFallbackLabel } from "./MuiPopover.js";
import { MuiSelectSizeContext } from "./MuiSelect.js";

import type { MenuOwnerState } from "@mui/material/Menu";
import type { MenuListProps } from "@mui/material/MenuList";

// ----------------------------------------------------------------------------

interface MuiMenuListSlotProps extends MenuListProps {
	ownerState?: Pick<MenuOwnerState, "anchorEl">;
}

const MuiMenuListSlot = forwardRef<"ul", MuiMenuListSlotProps>(
	(props, forwardedRef) => {
		const selectSize = React.useContext(MuiSelectSizeContext);

		const dense = (() => {
			if (props.dense !== undefined) return props.dense;
			if (selectSize) return selectSize === "small"; // use dense Menu for small Select
			return undefined;
		})();

		return (
			<MenuList
				{...props}
				dense={dense}
				ref={useMergedRefs(forwardedRef, useFallbackLabel(props))}
			/>
		);
	},
);
DEV: MuiMenuListSlot.displayName = "MuiMenuListSlot";

// ----------------------------------------------------------------------------

export { MuiMenuListSlot };
