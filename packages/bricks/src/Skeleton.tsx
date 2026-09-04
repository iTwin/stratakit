/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/internal-utils/react";
import cx from "classnames";
import { useInit } from "./~utils.useInit.js";

import type { BaseProps } from "@stratakit/internal-utils/props";

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
 * <Skeleton variant="object" size="small" />
 * <Skeleton variant="text" size="medium" />
 * ```
 *
 * @deprecated Use MUI [`Skeleton`](https://mui.com/material-ui/api/skeleton/) component instead.
 * See [migration guide](https://stratakit.bentley.com/docs/getting-started/migration-from-legacy-stratakit/#skeleton).
 */
const Skeleton = forwardRef<"div", SkeletonProps>((props, forwardedRef) => {
	useInit();

	const { variant = "text", size = "medium", ...rest } = props;

	return (
		<Role.div
			{...rest}
			ref={forwardedRef}
			className={cx("🥝Skeleton", props.className)}
			data-_sk-variant={variant}
			data-_sk-size={size}
			aria-hidden
		/>
	);
});
DEV: Skeleton.displayName = "Skeleton";

// ----------------------------------------------------------------------------

export default Skeleton;
