/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";

interface ProgressProps extends BaseProps {
	/**
	 * The variant of the progress indicator.
	 */
	variant: "radial";

	/**
	 * The size of the progress indicator.
	 * @default "medium"
	 */
	size?: "small" | "medium" | "large" | "xlarge";

	/**
	 * The tone of the progress indicator.
	 * @default "neutral"
	 */
	tone?: "neutral" | "accent";
}

/**
 * A progress indicator, used to show the status of a process in real time.
 *
 * Example:
 * ```tsx
 * <Progress variant="radial" />
 * ```
 *
 * Supports a `tone` prop to change the tone (color) of the progress indicator.
 * Supports a `size` prop to change the size of the progress indicator.
 */
export const Progress = forwardRef<"div", ProgressProps>(
	(props, forwardedRef) => {
		const { size = "medium", tone = "neutral", variant, ...rest } = props;

		return (
			<Ariakit.Role
				{...rest}
				role="progressbar"
				data-kiwi-size={size}
				data-kiwi-tone={tone}
				data-kiwi-variant={variant}
				data-kiwi-indeterminate
				className={cx("🥝-progress", props.className)}
				ref={forwardedRef}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						d="M9.5 1.674a6.503 6.503 0 0 1 0 12.652m-3-12.652a6.503 6.503 0 0 0 0 12.652"
					/>
				</svg>
			</Ariakit.Role>
		);
	},
);
DEV: Progress.displayName = "Progress";
