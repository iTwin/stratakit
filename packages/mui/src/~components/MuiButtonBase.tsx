/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import {
	forwardRef,
	useMergedRefs,
} from "@stratakit/foundations/secret-internals";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface MuiButtonBaseProps extends BaseProps<"button"> {}

const MuiButtonBase = forwardRef<"button", MuiButtonBaseProps>(
	(props, forwardedRef) => {
		const { "aria-disabled": ariaDisabled, ...rest } = props;

		// MUI's ButtonBase treats this wrapper as a non-button, so it always sets `aria-disabled`.
		// We need to infer the `disabled` prop from `aria-disabled` for native `<button>` elements.
		const isDisabled = ariaDisabled === true || ariaDisabled === "true";

		const [tagName, setTagName] = React.useState<string | undefined>(undefined);
		const determineTagName = React.useCallback(
			(element: HTMLElement | null) => {
				if (!element) return;
				setTagName(element.tagName);
			},
			[],
		);
		const isNativeButton = !props.render || tagName === "BUTTON";

		const type = (() => {
			if (!isNativeButton || props.type) return props.type;
			if (props.formAction) return "submit"; // https://github.com/mui/material-ui/pull/47185
			return "button";
		})();

		// Remove redundant `role="button"` for native `<button>`.
		const role =
			isNativeButton && props.role === "button" ? undefined : props.role;

		return (
			<Role.button
				{...rest}
				type={type}
				role={role}
				ref={useMergedRefs(determineTagName, forwardedRef)}
				disabled={isNativeButton ? isDisabled : undefined}
				aria-disabled={isNativeButton ? undefined : ariaDisabled}
			/>
		);
	},
);
DEV: MuiButtonBase.displayName = "MuiButtonBase";

// ----------------------------------------------------------------------------

export { MuiButtonBase };
