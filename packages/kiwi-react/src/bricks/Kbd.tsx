/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import { Role, type RoleProps } from "@ariakit/react/role";
import { forwardRef, type BaseProps } from "./~utils.js";
import { VisuallyHidden } from "./VisuallyHidden.js";
import { predefinedSymbols, type PredefinedSymbol } from "./Kbd.internal.js";

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
	symbol?: PredefinedSymbol;
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
