/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Tooltip from "@mui/material/Tooltip";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import { MuiButtonBase } from "./MuiButtonBase.js";

import type { IconButtonOwnProps } from "@mui/material/IconButton";
import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface MuiIconButtonProps
	extends BaseProps<"button">,
		Pick<IconButtonOwnProps, "label"> {}

const MuiIconButton = forwardRef<"button", MuiIconButtonProps>(
	(props, forwardedRef) => {
		const { label, ...rest } = props;

		if (label) {
			return (
				<Tooltip title={label} describeChild={false}>
					<MuiButtonBase {...rest} ref={forwardedRef} />
				</Tooltip>
			);
		}

		return <MuiButtonBase {...rest} ref={forwardedRef} />;
	},
);
DEV: MuiIconButton.displayName = "MuiIconButton";

// ----------------------------------------------------------------------------

export { MuiIconButton };
