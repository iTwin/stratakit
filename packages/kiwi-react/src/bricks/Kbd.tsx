/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface KbdProps extends Ariakit.RoleProps<"kbd"> {
	/** @default "solid" */
	variant?: "solid" | "muted" | "ghost";
}

/**
 * A styled wrapper over the HTML `<kbd>` element. This is typically
 * used for displaying keyboard shortcuts.
 *
 * ```tsx
 * <Kbd>Ctrl</Kbd> <Kbd>S</Kbd>
 * ```
 */
export const Kbd = React.forwardRef<React.ElementRef<"kbd">, KbdProps>(
	(props, forwardedRef) => {
		const { variant = "solid", ...rest } = props;
		return (
			<Ariakit.Role
				data-kiwi-variant={variant}
				{...rest}
				className={cx("🥝-kbd", props.className)}
				render={props.render || <kbd />}
				ref={forwardedRef as Ariakit.RoleProps["ref"]}
			/>
		);
	},
);
Kbd.displayName = "Kbd";
