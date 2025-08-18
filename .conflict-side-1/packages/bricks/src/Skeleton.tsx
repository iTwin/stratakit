/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface SkeletonPropsBase extends Omit<BaseProps, "children"> {}

type SkeletonProps = SkeletonPropsBase & {
	/**
	 * The type of the skeleton item. Available variants: `text`, `object`.
	 * @default "text"
	 */
	variant?: "text" | "object";
	/**
	 * The size of the skeleton item. Available sizes: `xsmall`, `small`, `medium`, `large`, `xlarge`
	 * @default "medium"
	 */
	size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
};

/**
 * Represents the loaded content before it finishes loading.
 *
 * Example:
 * ```tsx
 * <Skeleton variant="object" size="small" shape="square" />
 * <Skeleton variant="text" size="medium" />
 * ```
 */
const Skeleton = forwardRef<"div", SkeletonProps>((props, forwardedRef) => {
	const { variant = "text", size = "medium", ...rest } = props;

	return (
		<Role.div
			{...rest}
			ref={forwardedRef}
			className={cx("🥝Skeleton", props.className)}
			data-kiwi-variant={variant}
			data-kiwi-size={size}
			aria-hidden
		/>
	);
});
DEV: Skeleton.displayName = "Skeleton";

// ----------------------------------------------------------------------------

export default Skeleton;
