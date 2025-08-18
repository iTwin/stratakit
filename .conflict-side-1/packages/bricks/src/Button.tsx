/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button as AkButton } from "@ariakit/react/button";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { useGhostAlignment } from "./~utils.GhostAligner.js";

import type { FocusableProps } from "@stratakit/foundations/secret-internals";

interface ButtonProps extends FocusableProps<"button"> {
	/**
	 * The variant of the button, i.e. solid, outline, or ghost.
	 *
	 * @default "solid"
	 */
	variant?: "solid" | "outline" | "ghost";
	/**
	 * The tone of the button. Most buttons should be neutral.
	 * Accent buttons can be used to draw attention to the primary action.
	 *
	 * @default "neutral"
	 */
	tone?: "neutral" | "accent";
}

/**
 * A styled button element which allows the user to perform an action when clicked.
 *
 * Example:
 * ```tsx
 * <Button onClick={() => doSomething()}>Click me</Button>
 * ```
 *
 * Start and end icons can be added by passing `Icon` as children.
 *
 * ```tsx
 * <Button>
 *   <Icon href={…} />
 *   Click me
 *   <Icon href={…} />
 * </Button>
 * ```
 *
 * The button's appearance can be customized using the `variant` and `tone` props.
 */
const Button = forwardRef<"button", ButtonProps>((props, forwardedRef) => {
	const { variant = "solid", tone = "neutral", ...rest } = props;

	const ghostAlignment = useGhostAlignment();

	return (
		<AkButton
			accessibleWhenDisabled
			{...rest}
			data-kiwi-variant={variant}
			data-kiwi-tone={tone}
			data-kiwi-ghost-align={variant === "ghost" ? ghostAlignment : undefined}
			className={cx(
				"🥝Button",
				{ "🥝GhostAligner": variant === "ghost" },
				props.className,
			)}
			ref={forwardedRef}
		/>
	);
});
DEV: Button.displayName = "Button";

// ----------------------------------------------------------------------------

export default Button;
