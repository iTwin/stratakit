/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { forwardRef } from "@stratakit/internal-utils/react";

import type { AccordionOwnerState } from "@mui/material/Accordion";
import type { AccordionSummaryOwnProps } from "@mui/material/AccordionSummary";
import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

interface MuiAccordionRootSlotProps extends BaseProps {
	ownerState?: AccordionOwnerState;
}

const MuiAccordionRootSlot = forwardRef<"div", MuiAccordionRootSlotProps>(
	(props, forwardedRef) => {
		const { square, variant } = props.ownerState || {};

		return (
			<Paper
				{...props}
				square={square ?? variant !== "outlined"} // Disable rounded corners on non-outlined variants
				ref={forwardedRef}
			/>
		);
	},
);
DEV: MuiAccordionRootSlot.displayName = "MuiAccordionRootSlot";

// ----------------------------------------------------------------------------

interface MuiAccordionHeadingSlotProps {
	ownerState?: AccordionOwnerState;
}

const MuiAccordionHeadingSlot = forwardRef<"div", MuiAccordionHeadingSlotProps>(
	(props, forwardedRef) => {
		const { ownerState: _, ...rest } = props;

		return <Typography render={<h3 />} {...rest} ref={forwardedRef} />;
	},
);
DEV: MuiAccordionHeadingSlot.displayName = "MuiAccordionHeadingSlot";

// ----------------------------------------------------------------------------

interface MuiAccordionSummaryProps
	extends BaseProps,
		Pick<AccordionSummaryOwnProps, "markerPlacement"> {}

const MuiAccordionSummary = forwardRef<"div", MuiAccordionSummaryProps>(
	(props, forwardedRef) => {
		const { markerPlacement = "auto", ...rest } = props;
		return (
			<Role.div
				{...rest}
				data-_sk-marker-placement={
					markerPlacement === "auto" ? undefined : markerPlacement
				}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: MuiAccordionSummary.displayName = "MuiAccordionSummary";

// ----------------------------------------------------------------------------

export { MuiAccordionHeadingSlot, MuiAccordionRootSlot, MuiAccordionSummary };
