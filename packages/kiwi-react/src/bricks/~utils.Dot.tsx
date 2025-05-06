/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import { Role } from "@ariakit/react/role";
import { forwardRef, type BaseProps } from "./~utils.js";
import { VisuallyHidden } from "./VisuallyHidden.js";

interface DotProps extends BaseProps<"span"> {
	/**
	 * Children will be visually and semantically hidden, to be used
	 * in conjunction with `aria-describedby`.
	 */
	children: string;
}

/** @private */
export const Dot = forwardRef<"span", DotProps>((props, forwardedRef) => {
	const { children, ...rest } = props;

	return (
		<Role.span
			aria-hidden="true"
			{...rest}
			className={cx("🥝-dot", props.className)}
			ref={forwardedRef}
		>
			<VisuallyHidden>{children}</VisuallyHidden>
		</Role.span>
	);
});
DEV: Dot.displayName = "Dot";
