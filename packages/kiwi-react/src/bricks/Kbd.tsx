/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { forwardRef } from "react";
import cx from "classnames";

/**
 * Some predefined strings for common keyboard keys.
 */
export const KbdKeys = {
	ArrowDown: "\u2193",
	ArrowLeft: "\u2190",
	ArrowRight: "\u2192",
	ArrowUp: "\u2191",
	Backspace: "\u232b Backspace",
	CapsLock: "\u21ea Caps Lock",
	Command: "\u2318 Cmd",
	Control: "Ctrl",
	Delete: "\u2326 Del",
	End: "\u2198 End",
	Escape: "\u238b Esc",
	Home: "\u2196 Home",
	Menu: "\u2630 Menu",
	NumLock: "\u21ed Num Lock",
	PageDown: "\u21df PgDn",
	PageUp: "\u21de PgUp",
	Pause: "\u23f8 Pause",
	PrintScreen: "\u2399 PrtSc",
	Shift: "\u21e7 Shift",
	Space: "␣ Space",
	Tab: "\u21e5 Tab",
} as const;

interface KbdProps extends Ariakit.RoleProps<"kbd"> {
	/**
	 * Content of the key to be passed as children. Must be a string or one of the `KbdKeys`.
	 */
	children: string;

	/** @default "solid" */
	variant?: "solid" | "muted" | "ghost";
}

/**
 * A keyboard key element, enhanced with AriaKit.
 * @example
 * <Kbd ref={kbdRef}>{KbdKeys.Command}</Kbd>
 * <Kbd>{KbdKeys.Enter}</Kbd>
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(
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
