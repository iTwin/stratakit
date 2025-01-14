/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { forwardRef, type FocusableProps } from "./~utils.js";

type ButtonProps = FocusableProps<"button"> &
	(
		| {
				/**
				 * The variant of the button, i.e. solid, outline, or ghost.
				 *
				 * @default "solid"
				 */
				variant?: "solid";
				/**
				 * The tone of the button. Most buttons should be neutral.
				 * Accent buttons can be used to draw attention to the primary action.
				 *
				 * **Note:** The `"accent"` tone is only supported for the `"solid"` variant.
				 *
				 * @default "neutral"
				 */
				tone?: "neutral" | "accent";
		  }
		| {
				variant: "outline" | "ghost";
				tone?: never;
		  }
	);

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
export const Button = forwardRef<"button", ButtonProps>(
	(props, forwardedRef) => {
		const { variant = "solid", tone = "neutral", ...rest } = props;
		return (
			<Ariakit.Button
				accessibleWhenDisabled
				{...rest}
				data-kiwi-variant={variant}
				data-kiwi-tone={tone}
				className={cx("🥝-button", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: Button.displayName = "Button";
