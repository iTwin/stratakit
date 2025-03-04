/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import { Role, type RoleProps } from "@ariakit/react/role";
import { forwardRef, type BaseProps } from "./~utils.js";
import { VisuallyHidden } from "./VisuallyHidden.js";

const predefinedSymbols = {
	Backspace: "\u232b",
	Command: "\u2318",
	Control: "Ctrl",
	Down: "\u2193",
	Eject: "\u23cf",
	Enter: "\u21b5",
	Escape: "Esc",
	Left: "\u2190",
	Option: "\u2325",
	Right: "\u2192",
	Shift: "\u21e7",
	Space: "\u2423",
	Tab: "Tab",
	Up: "\u2191",
} as const;

interface KbdProps extends BaseProps<"kbd"> {
	/** @default "solid" */
	variant?: "solid" | "muted" | "ghost";

	/**
	 * Display a specific key symbol from a predefined list. This is useful for
	 * displaying modifier keys or special keys, such as `Control`, `Shift`, `Enter`, etc.
	 *
	 * Example:
	 * ```tsx
	 * <Kbd symbol="Control" />
	 * ```
	 */
	symbol?: keyof typeof predefinedSymbols;
}

/**
 * A styled wrapper over the HTML `<kbd>` element. This is typically
 * used for displaying keyboard shortcuts.
 *
 * ```tsx
 * <Kbd>Ctrl</Kbd> <Kbd>S</Kbd>
 * ```
 *
 * ```tsx
 * <Kbd symbol="Control" />
 * ```
 */
export const Kbd = forwardRef<"kbd", KbdProps>((props, forwardedRef) => {
	const { variant = "solid", symbol, children, ...rest } = props;

	DEV: {
		if (symbol && !(symbol in predefinedSymbols)) {
			console.error(
				`Kbd: Invalid symbol "${symbol}". Must be one of: ${Object.keys(predefinedSymbols).join(", ")}`,
			);
		}
	}

	let content = children;

	if (symbol) {
		content = (
			<>
				<span aria-hidden="true">{predefinedSymbols[symbol]}</span>
				{children || <VisuallyHidden>{symbol}</VisuallyHidden>}
			</>
		);
	}

	return (
		<Role
			{...rest}
			data-kiwi-variant={variant}
			className={cx("🥝-kbd", props.className)}
			render={props.render || <kbd />}
			ref={forwardedRef as RoleProps["ref"]}
		>
			{content}
		</Role>
	);
});
DEV: Kbd.displayName = "Kbd";
