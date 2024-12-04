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

export const kbdKeys = {
	Command: "\u2318 Cmd",
	Shift: "\u21e7 Shift",
	Backspace: "\u232b Backspace",
	Enter: "\u21b5 Enter",
	Eject: "\u23cf Eject",
	Control: "Ctrl",
	Windows: "\u229e Win",
	Apple: "\uf8ff",
	Option: "\u2325 Option",
	Left: "\u2190",
	Up: "\u2191",
	Right: "\u2192",
	Down: "\u2193",
} as const;

/**
 * A styled wrapper over the HTML `<kbd>` element. This is typically
 * used for displaying keyboard shortcuts.
 *
 * ```tsx
 * <Kbd>Ctrl</Kbd> <Kbd>S</Kbd>
 * ```
 *
 * ```tsx
 * <Kbd>{KbdKeys.Enter} - Enter</Kbd>
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
DEV: Kbd.displayName = "Kbd";
