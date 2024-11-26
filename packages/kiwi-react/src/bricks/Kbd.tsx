/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { forwardRef } from "react";
import cx from "classnames";
import type * as Ariakit from "@ariakit/react";

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
export const Kbd = forwardRef<React.ElementRef<"kbd">, KbdProps>(
	({ variant = "solid", className, children, ...rest }, ref) => {
		return (
			<kbd
				ref={ref}
				data-kiwi-variant={variant}
				{...rest}
				className={cx("🥝-kbd", className)}
			>
				{children}
			</kbd>
		);
	},
);
