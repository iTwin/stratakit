/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import { Role } from "@ariakit/react/role";
import { Focusable } from "@ariakit/react/focusable";
import { forwardRef, type FocusableProps } from "./~utils.js";

interface AnchorProps extends FocusableProps<"a"> {
	/** @default "neutral" */
	tone?: "neutral" | "accent" | "critical";
}

/**
 * A styled anchor element, typically used for navigating to a different location.
 *
 * Example:
 * ```tsx
 * <Anchor href="https://www.example.com">Example</Anchor>
 * ```
 *
 * Supports a `tone` prop to change the tone (color) of the anchor.
 */
export const Anchor = forwardRef<"a", AnchorProps>((props, forwardedRef) => {
	const { tone = "neutral", ...rest } = props;
	return (
		<Role.a
			{...rest}
			data-kiwi-tone={tone}
			className={cx("🥝-anchor", props.className)}
			render={
				<Focusable accessibleWhenDisabled render={props.render || <a />} />
			}
			ref={forwardedRef}
		/>
	);
});
DEV: Anchor.displayName = "Anchor";
