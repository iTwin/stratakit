/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Portal } from "@ariakit/react/portal";
import { forwardRef } from "@stratakit/internal-utils";

import type { BaseProps } from "@stratakit/internal-utils";

// ----------------------------------------------------------------------------

const MuiSnackbar = forwardRef<"div", BaseProps<"div">>(
	(props, forwardedRef) => {
		return <Portal {...props} ref={forwardedRef} />;
	},
);
DEV: MuiSnackbar.displayName = "MuiSnackbar";

// ----------------------------------------------------------------------------

export { MuiSnackbar };
