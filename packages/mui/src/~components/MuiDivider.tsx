/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/internal-utils/react";

import type { DividerOwnProps } from "@mui/material/Divider";
import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

interface MuiDividerProps
	extends BaseProps<"hr">,
		Pick<DividerOwnProps, "children" | "margin"> {}

const MuiDivider = forwardRef<"hr", MuiDividerProps>((props, forwardedRef) => {
	const { children, margin, ...rest } = props;

	const defaultRender = (() => {
		if (
			children ||
			props["aria-orientation"] === "vertical" ||
			props.role === "presentation"
		)
			return <div />;
		return <hr />;
	})();

	return (
		<Role
			render={defaultRender}
			data-_sk-margin={margin ? "" : undefined}
			{...rest}
			// Remove separator semantics when children is passed, to prevent the content from being suppressed.
			role={children ? undefined : props.role}
			aria-orientation={children ? undefined : props["aria-orientation"]}
			ref={forwardedRef}
		>
			{children}
		</Role>
	);
});
DEV: MuiDivider.displayName = "MuiDivider";

// ----------------------------------------------------------------------------

export { MuiDivider };
