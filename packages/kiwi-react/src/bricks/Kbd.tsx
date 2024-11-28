/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface KbdProps extends Ariakit.RoleProps<"kbd"> {
	/**
	 * Content of the key to be passed as children.
	 */
	children: string;

	/** @default "solid" */
	variant?: "solid" | "muted" | "ghost";
}

/**
 * A keyboard key element, enhanced with AriaKit.
 * @example
 * <Kbd ref={kbdRef}>Cmd</Kbd>
 * <Kbd>Ctrl</Kbd>
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
