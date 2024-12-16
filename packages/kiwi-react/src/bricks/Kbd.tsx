/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { forwardRef, type BaseProps } from "./~utils.js";

interface KbdProps extends BaseProps<"kbd"> {
	/** @default "solid" */
	variant?: "solid" | "muted" | "ghost";
}

export const kbdKeys = {
	Apple: "\uf8ff",
	Backspace: "\u232b",
	Command: "\u2318",
	Control: "Ctrl",
	Down: "\u2193",
	End: "\u001b",
	Eject: "\u23cf",
	Enter: "\u21b5",
	Escape: "\u001b",
	Home: "\u001a",
	Help: "\u003f",
	Left: "\u2190",
	Option: "\u2325",
	PageUp: "\u0010",
	PageDown: "\u0011",
	Right: "\u2192",
	Shift: "\u21e7",
	Space: "\u0020",
	Tab: "\u0009",
	Up: "\u2191",
	Windows: "\u229e",
	WinAlt: "\u2387",
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
 * <Kbd>{kbdKeys.Enter}</Kbd>
 * ```
 */
export const Kbd = forwardRef<"kbd", KbdProps>((props, forwardedRef) => {
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
});
DEV: Kbd.displayName = "Kbd";
