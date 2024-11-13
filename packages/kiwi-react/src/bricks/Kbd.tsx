/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
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

interface KbdProps extends Omit<Ariakit.RoleOptions<"kbd">, "as"> {
	/**
	 * Content of the key to be passed as children. Must be a string or one of the `KbdKeys`.
	 */
	children: string;
	/**
	 * Custom class name for styling.
	 */
	className?: string;
}

/**
 * A keyboard key element, enhanced with AriaKit.
 * @example
 * <Kbd>{KbdKeys.Command}</Kbd>
 * <Kbd>{KbdKeys.Enter}</Kbd>
 */
export const Kbd = React.forwardRef<HTMLElement, KbdProps>((props) => {
	const { className, children, ...rest } = props;

	return (
		<Ariakit.Role {...rest} className={cx("🥝-kbd", className)}>
			{children}
		</Ariakit.Role>
	);
});
