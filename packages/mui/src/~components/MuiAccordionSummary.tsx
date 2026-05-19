/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";

import type { AccordionSummaryOwnProps } from "@mui/material/AccordionSummary";
import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface MuiAccordionSummaryProps
	extends BaseProps,
		Pick<AccordionSummaryOwnProps, "markerPosition"> {}

const MuiAccordionSummary = forwardRef<"div", MuiAccordionSummaryProps>(
	(props, forwardedRef) => {
		const { markerPosition = "auto", ...rest } = props;
		return (
			<Role.div
				{...rest}
				data-_sk-marker-position={
					markerPosition === "auto" ? undefined : markerPosition
				}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: MuiAccordionSummary.displayName = "MuiAccordionSummary";

// ----------------------------------------------------------------------------

export { MuiAccordionSummary };
