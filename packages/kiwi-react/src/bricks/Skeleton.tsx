/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";
import { VisuallyHidden } from "./VisuallyHidden.js";

// ----------------------------------------------------------------------------

interface SkeletonProps extends BaseProps {
	/**
	 * A text alternative for the skeleton.
	 * @default "Loading…"
	 */
	alt?: string;
}

/**
 * A skeleton component to roughly represent the loaded content before it finishes loading.
 *
 * TODO: JSDocs
 */
const Skeleton = forwardRef<"div", SkeletonProps>((props, forwardedRef) => {
	const { alt = "Loading…", ...rest } = props;

	return (
		<Ariakit.Role.div
			{...rest}
			className={cx("🥝-skeleton", props.className)}
			ref={forwardedRef}
		>
			{props.children}
			<VisuallyHidden>{alt}</VisuallyHidden>
		</Ariakit.Role.div>
	);
});
DEV: Skeleton.displayName = "Skeleton.Root";

// ----------------------------------------------------------------------------

interface SkeletonItemPropsBase extends BaseProps {
	children?: never;
}

type SkeletonItemProps = SkeletonItemPropsBase &
	(
		| {
				variant: "text";
				size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge";
				shape?: never;
		  }
		| {
				variant?: "object";
				size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
				shape?: "square" | "pill" | "circle";
		  }
	);

/**
 * TODO: JSDocs
 */
const SkeletonItem = forwardRef<"div", SkeletonItemProps>(
	(props, forwardedRef) => {
		const { variant, shape, size, ...rest } = props;

		return (
			<Ariakit.Role.div
				{...rest}
				ref={forwardedRef}
				className={cx("🥝-skeleton-item", props.className)}
				data-kiwi-variant={variant}
				data-kiwi-size={size}
				data-kiwi-shape={shape}
				aria-hidden="true"
			/>
		);
	},
);
DEV: SkeletonItem.displayName = "Skeleton.Item";

// ----------------------------------------------------------------------------

export { Skeleton as Root, SkeletonItem as Item };
