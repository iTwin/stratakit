/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import {
	type BaseProps,
	forwardRef,
} from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

type MarkerPosition = "auto" | "start" | "end";

interface MuiAccordionProps extends BaseProps<"div"> {
	markerPosition?: MarkerPosition;
}

const MuiAccordion = forwardRef<"div", MuiAccordionProps>(
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
DEV: MuiAccordion.displayName = "MuiAccordion";

// ----------------------------------------------------------------------------

export { MuiAccordion };
