/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import { CheckmarkIcon, ErrorIcon } from "../Icon.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const MuiStepIcon = forwardRef<"span", BaseProps<"span">>(
	(props, forwardedRef) => {
		// Exclude `children` 🔞
		const { children: _, ...rest } = props;

		const classList = props.className?.split(" ") ?? [];

		const completed = classList.includes("Mui-completed");
		const error = classList.includes("Mui-error");

		const children = (() => {
			if (error) return <ErrorIcon />;
			if (completed) return <CheckmarkIcon />;
		})();

		return (
			<Role.span aria-hidden="true" {...rest} ref={forwardedRef}>
				{children}
			</Role.span>
		);
	},
);
DEV: MuiStepIcon.displayName = "MuiStepIcon";

// ----------------------------------------------------------------------------

export { MuiStepIcon };
