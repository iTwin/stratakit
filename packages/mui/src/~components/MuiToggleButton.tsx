/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Tooltip from "@mui/material/Tooltip";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import { MuiButtonBase } from "./MuiButtonBase.js";

import type { ToggleButtonOwnProps } from "@mui/material/ToggleButton";
import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface MuiToggleButtonProps
	extends BaseProps<"button">,
		Pick<ToggleButtonOwnProps, "label"> {}

const MuiToggleButton = forwardRef<"button", MuiToggleButtonProps>(
	(props, forwardedRef) => {
		const { label, ...rest } = props;

		if (label) {
			return (
				<Tooltip title={label} describeChild={false}>
					<MuiButtonBase {...rest} ref={forwardedRef} />
				</Tooltip>
			);
		}

		return <MuiButtonBase data-_sk-type="text" {...rest} ref={forwardedRef} />;
	},
);
DEV: MuiToggleButton.displayName = "MuiToggleButton";

// ----------------------------------------------------------------------------

export { MuiToggleButton };
