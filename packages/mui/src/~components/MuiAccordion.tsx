/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";

import type { AccordionDetailsProps } from "@mui/material/AccordionDetails";
import type { AccordionSummaryOwnProps } from "@mui/material/AccordionSummary";
import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface MuiAccordionDetailsProps
	extends BaseProps,
		Pick<AccordionDetailsProps, "startIndent"> {}

const MuiAccordionDetails = forwardRef<"div", MuiAccordionDetailsProps>(
	(props, forwardedRef) => {
		const { startIndent = false, ...rest } = props;

		return (
			<Role.div
				{...rest}
				data-_sk-start-indent={startIndent ? "" : undefined}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: MuiAccordionDetails.displayName = "MuiAccordionDetails";

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

export { MuiAccordionDetails, MuiAccordionSummary };
