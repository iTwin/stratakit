/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/internal-utils/react";
import cx from "classnames";
import { useInit } from "./~utils.useInit.js";

import type { BaseProps } from "@stratakit/internal-utils/props";

interface TextProps extends BaseProps {
	/**
	 * The typography variant to use.
	 */
	variant:
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
 * An element with text styles applied. Useful for paragraphs, headings, and other text content.
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
 *
 * @deprecated Use MUI [`Typography`](https://mui.com/material-ui/api/typography/) component instead.
 * See [migration guide](https://stratakit.bentley.com/docs/getting-started/migration-from-legacy-stratakit/#text).
 */
const Text = forwardRef<"div", TextProps>((props, forwardedRef) => {
	useInit();

	const { variant, ...rest } = props;

	return (
		<Role
			{...rest}
			className={cx("🥝Text", props.className)}
			data-_sk-text-variant={variant}
			ref={forwardedRef}
		/>
	);
});
DEV: Text.displayName = "Text";

// ----------------------------------------------------------------------------

export default Text;
