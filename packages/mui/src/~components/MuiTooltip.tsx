/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Popper from "@mui/material/Popper";
import {
	forwardRef,
	identity,
	useMergedRefs,
	usePopoverApi,
} from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

type PopperProps = React.ComponentProps<typeof Popper>;

interface MuiTooltipPopperProps extends PopperProps {}

const MuiTooltipPopper = forwardRef<"div", MuiTooltipPopperProps>(
	(props, forwardedRef) => {
		const [popoverElement, setPopoverElement] =
			React.useState<HTMLDivElement | null>(null);

		const popoverProps = usePopoverApi({
			element: popoverElement,
			open: props.open,
			setOpen: identity,
		});

		return (
			<Popper
				{...popoverProps}
				{...props}
				style={{ ...popoverProps.style, ...props.style }}
				ref={useMergedRefs(setPopoverElement, forwardedRef)}
			/>
		);
	},
);
DEV: MuiTooltipPopper.displayName = "MuiTooltipPopper";

// ----------------------------------------------------------------------------

export { MuiTooltipPopper };
