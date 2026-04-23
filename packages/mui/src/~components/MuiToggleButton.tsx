/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import IconButton from "@mui/material/IconButton";
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

		const classList = props.className?.split(" ") ?? [];
		const size = (() => {
			if (classList.includes("MuiToggleButton-sizeSmall")) return "small";
			if (classList.includes("MuiToggleButton-sizeLarge")) return "large";
			if (classList.includes("MuiToggleButton-sizeMedium")) return "medium";
			return undefined;
		})() satisfies ToggleButtonOwnProps["size"];

		if (label) {
			return (
				<Tooltip title={label} describeChild={false}>
					<MuiButtonBase
						{...rest}
						render={props.render ?? <IconButton size={size} />}
						ref={forwardedRef}
					/>
				</Tooltip>
			);
		}

		return (
			<MuiButtonBase
				{...rest}
				render={props.render ?? <IconButton size={size} />}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: MuiToggleButton.displayName = "MuiToggleButton";

// ----------------------------------------------------------------------------

export { MuiToggleButton };
