/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
	PortalContext as AkPortalContext,
	Portal,
} from "@ariakit/react/portal";
import { PortalContext } from "@stratakit/foundations";
import { forwardRef } from "@stratakit/internal-utils/react";

import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

const MuiSnackbar = forwardRef<"div", BaseProps<"div">>(
	(props, forwardedRef) => {
		const { container } = React.useContext(PortalContext) ?? {};

		return (
			<AkPortalContext.Provider value={container ?? null}>
				<Portal {...props} ref={forwardedRef} />
			</AkPortalContext.Provider>
		);
	},
);
DEV: MuiSnackbar.displayName = "MuiSnackbar";

// ----------------------------------------------------------------------------

export { MuiSnackbar };
