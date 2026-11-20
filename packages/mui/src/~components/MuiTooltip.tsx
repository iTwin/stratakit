/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Popper from "@mui/material/Popper";
import { useMergedRefs, usePopoverApi } from "@stratakit/internal-utils/hooks";
import { forwardRef } from "@stratakit/internal-utils/react";

// ----------------------------------------------------------------------------

type PopperProps = React.ComponentProps<typeof Popper>;

interface MuiTooltipPopperProps extends PopperProps {}

const MuiTooltipPopper = forwardRef<"div", MuiTooltipPopperProps>(
	(props, forwardedRef) => {
		const [popoverElement, setPopoverElement] =
			React.useState<HTMLDivElement | null>(null);
		const [popper, setPopper] = React.useState<object | null>(null);

		const popoverProps = usePopoverApi({
			element: popoverElement,
			open: !!popper, // use the popper instance which accounts for entry/exit transitions
		});

		return (
			<Popper
				{...popoverProps}
				{...props}
				data-color-scheme="dark" // force dark mode for all descendants
				style={{ ...popoverProps.style, ...props.style }}
				popperRef={useMergedRefs(setPopper, props.popperRef)}
				ref={useMergedRefs(setPopoverElement, forwardedRef)}
			/>
		);
	},
);
DEV: MuiTooltipPopper.displayName = "MuiTooltipPopper";

// ----------------------------------------------------------------------------

export { MuiTooltipPopper };
