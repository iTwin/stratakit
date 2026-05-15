/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";

import type { BaseProps } from "@stratakit/foundations/secret-internals";
// ----------------------------------------------------------------------------

type MarkerPosition = "auto" | "start" | "end";

interface MuiAccordionSummaryProps extends BaseProps {
	markerPosition?: MarkerPosition;
}

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
