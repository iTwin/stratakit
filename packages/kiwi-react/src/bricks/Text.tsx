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

export const Text = forwardRef<"div", TextProps>((props, forwardedRef) => {
	const { className, variant, ...rest } = props;

	return (
		<Ariakit.Role
			{...rest}
			className={cx("🥝-text", className)}
			data-kiwi-text-variant={variant}
			ref={forwardedRef}
		/>
	);
});
DEV: Text.displayName = "Text";
