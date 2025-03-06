/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Role } from "@ariakit/react/role";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";

// ----------------------------------------------------------------------------

interface SkeletonPropsBase extends BaseProps {
	children?: never;
}

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
export const Skeleton = forwardRef<"div", SkeletonProps>(
	(props, forwardedRef) => {
		const { variant = "text", size = "medium", ...rest } = props;

		return (
			<Role.div
				{...rest}
				ref={forwardedRef}
				className={cx("🥝-skeleton", props.className)}
				data-kiwi-variant={variant}
				data-kiwi-size={size}
				aria-hidden
			/>
		);
	},
);
DEV: Skeleton.displayName = "Skeleton";
