/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { forwardRef } from "@stratakit/foundations/secret-internals";
import { MuiButtonBase } from "./MuiButtonBase.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const MuiBottomNavigationAction = forwardRef<"button", BaseProps<"button">>(
	(props, forwardedRef) => {
		const { children, ...rest } = props;

		const classList = props.className?.split(" ") ?? [];
		const selected = classList.includes("Mui-selected");

		return (
			<MuiButtonBase
				aria-current={selected ? "true" : "false"}
				{...rest}
				ref={forwardedRef}
			>
				<span className="MuiBottomNavigationAction-content">{children}</span>
			</MuiButtonBase>
		);
	},
);
DEV: MuiBottomNavigationAction.displayName = "MuiBottomNavigationAction";

// ----------------------------------------------------------------------------

export { MuiBottomNavigationAction };
