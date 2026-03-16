/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import Tooltip from "@mui/material/Tooltip";
import { forwardRef } from "@stratakit/foundations/secret-internals";

import type { IconButtonOwnProps } from "@mui/material";

// ----------------------------------------------------------------------------

const MuiIconButton = forwardRef<"button", IconButtonOwnProps>(
	(props, forwardedRef) => {
		const { label, ...rest } = props;

		if (label) {
			return (
				<Tooltip title={label} describeChild={false}>
					<Role.button {...rest} ref={forwardedRef} />
				</Tooltip>
			);
		}

		return <Role.button {...rest} ref={forwardedRef} />;
	},
);
DEV: MuiIconButton.displayName = "MuiIconButton";

// ----------------------------------------------------------------------------

export { MuiIconButton };
