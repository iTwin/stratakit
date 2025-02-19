/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";

interface SkeletonPropsBase extends BaseProps {
	children?: never;
}

type SkeletonProps = SkeletonPropsBase &
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
 * A skeleton component to roughly represent the loaded content before it finishes loading.
 */
export const Skeleton = forwardRef<"div", SkeletonProps>(
	(props, forwardedRef) => {
		const { variant, shape, size, ...rest } = props;

		return (
			<Ariakit.Role
				{...rest}
				ref={forwardedRef}
				className={cx("🥝-skeleton", props.className)}
				data-kiwi-variant={variant}
				data-kiwi-size={size}
				data-kiwi-shape={shape}
			/>
		);
	},
);
DEV: Skeleton.displayName = "Skeleton";
