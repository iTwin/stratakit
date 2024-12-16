/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";

interface TextProps extends BaseProps {
	/**
	 * The typography variant to use.
	 */
	variant?:
		| "display-lg"
		| "display-md"
		| "display-sm"
		| "headline-lg"
		| "headline-md"
		| "headline-sm"
		| "body-lg"
		| "body-md"
		| "body-sm"
		| "caption-lg"
		| "caption-md"
		| "caption-sm"
		| "mono-sm";
}

/**
 * An element with text styles applied.
 *
 * Example usage:
 * ```tsx
 * <Text variant="display-sm">Hello, World!</Text>
 * ```
 *
 * Use the `render` prop to change the underlying element (defaults to a `<div>`):
 * ```tsx
 * <Text render={<h1 />} variant="headline-lg">Hello, World!</Text>
 * ```
 */
export const Text = forwardRef<"div", TextProps>((props, forwardedRef) => {
	const { variant, ...rest } = props;

	return (
		<Ariakit.Role
			{...rest}
			className={cx("🥝-text", props.className)}
			data-kiwi-text-variant={variant}
			ref={forwardedRef}
		/>
	);
});
DEV: Text.displayName = "Text";
