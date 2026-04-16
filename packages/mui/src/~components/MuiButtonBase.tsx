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

import type { ButtonOwnProps } from "@mui/material/Button";
import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface MuiButtonBaseProps
	extends BaseProps<"button">,
		Pick<ButtonOwnProps, "href"> {}

const MuiButtonBase = forwardRef<"button", MuiButtonBaseProps>(
	(props, forwardedRef) => {
		const { href, "aria-disabled": ariaDisabled, disabled, ...rest } = props;

		const isDisabled =
			disabled || ariaDisabled === true || ariaDisabled === "true";

		const [tagName, setTagName] = React.useState<string | undefined>(undefined);
		const determineTagName = React.useCallback(
			(element: HTMLElement | null) => {
				if (!element) return;
				setTagName(element.tagName);
			},
			[],
		);

		const isNativeButton = (!props.render && !href) || tagName === "BUTTON";
		const isLink = (!props.render && href) || tagName === "A";

		const type = (() => {
			if (!isNativeButton || props.type) return props.type;
			if (props.formAction) return "submit"; // https://github.com/mui/material-ui/pull/47185
			return "button";
		})();

		// Remove redundant `role="button"` for native `<button>` and `<a>`.
		const role = (() => {
			if (isLink && props.role === "button") return undefined;
			if (isNativeButton && props.role === "button") return undefined;
			return props.role;
		})();

		const render = (() => {
			if (href) return <Role.a href={href} render={props.render} />;
			return props.render;
		})();

		return (
			<Role.button
				{...rest}
				render={render}
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
