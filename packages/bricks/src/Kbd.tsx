/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import VisuallyHidden from "@stratakit/bricks/VisuallyHidden";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { predefinedSymbols } from "./Kbd.internal.js";

import type { RoleProps } from "@ariakit/react/role";
import type { BaseProps } from "@stratakit/foundations/secret-internals";
import type { PredefinedSymbol } from "./Kbd.internal.js";

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
const Kbd = forwardRef<"kbd", KbdProps>((props, forwardedRef) => {
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
			data-_sk-variant={variant}
			className={cx("🥝Kbd", props.className)}
			render={props.render || <kbd />}
			ref={forwardedRef as RoleProps["ref"]}
		>
			{content}
		</Role>
	);
});
DEV: Kbd.displayName = "Kbd";

// ----------------------------------------------------------------------------

export default Kbd;
