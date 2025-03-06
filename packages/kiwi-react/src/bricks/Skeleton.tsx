/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Role } from "@ariakit/react/role";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";

// ----------------------------------------------------------------------------

interface SkeletonProps extends BaseProps {}

/**
 * A wrapper around `Skeleton.Item`s to roughly represent the loaded content before it finishes loading.
 *
 * ```tsx
 * <Skeleton.Group>
 *   <Skeleton.Item variant="object" size="small" shape="square" />
 *   <Skeleton.Item variant="text" size="medium" />
 * </Skeleton.Group>
 * ```
 */
const Skeleton = forwardRef<"div", SkeletonProps>((props, forwardedRef) => {
	const { children, ...rest } = props;

	return (
		<Role.div
			{...rest}
			className={cx("🥝-skeleton", props.className)}
			ref={forwardedRef}
		>
			{children}
		</Role.div>
	);
});
DEV: Skeleton.displayName = "Skeleton.Group";

// ----------------------------------------------------------------------------

interface SkeletonItemPropsBase extends BaseProps {
	children?: never;
}

type SkeletonItemProps = SkeletonItemPropsBase & {
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
 * Needs to be wrapped around `Skeleton.Group`.
 *
 * `Skeleton.Item` represents the loaded content before it finishes loading.
 *
 * ```tsx
 * <Skeleton.Group>
 *   <Skeleton.Item variant="object" size="small" shape="square" />
 *   <Skeleton.Item variant="text" size="medium" />
 * </Skeleton.Group>
 * ```
 */
const SkeletonItem = forwardRef<"div", SkeletonItemProps>(
	(props, forwardedRef) => {
		const { variant = "text", size = "medium", ...rest } = props;

		return (
			<Role.div
				{...rest}
				ref={forwardedRef}
				className={cx("🥝-skeleton-item", props.className)}
				data-kiwi-variant={variant}
				data-kiwi-size={size}
				aria-hidden
			/>
		);
	},
);
DEV: SkeletonItem.displayName = "Skeleton.Item";

// ----------------------------------------------------------------------------

export { Skeleton as Group, SkeletonItem as Item };
