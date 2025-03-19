/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import { Role, type RoleProps } from "@ariakit/react/role";
import { forwardRef, type BaseProps } from "./~utils.js";

interface CodeProps extends BaseProps<"code"> {
	/** @default "solid" */
	variant?: "solid" | "outline" | "ghost";
}

/**
 * The HTML `<code>` element, typically used for displaying code snippets inline.
 *
 * ```tsx
 * <Code>&lt;html&gt;</Code>
 * ```
 */
export const Code = forwardRef<"code", CodeProps>((props, forwardedRef) => {
	const { variant = "solid", children, ...rest } = props;

	return (
		<Role
			{...rest}
			data-kiwi-variant={variant}
			className={cx("🥝-code", props.className)}
			render={props.render || <code />}
			ref={forwardedRef as RoleProps["ref"]}
		>
			{children}
		</Role>
	);
});
DEV: Code.displayName = "Code";
