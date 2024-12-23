/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { VisuallyHidden } from "@itwin/itwinui-react/bricks";
import { forwardRef, type BaseProps } from "./~utils.js";

interface ProgressProps extends BaseProps {
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
 * <Progress />
 * ```
 *
 * Supports a `tone` prop to change the tone (color) of the progress indicator.
 * Supports a `size` prop to change the size of the progress indicator.
 */
export const Progress = forwardRef<"div", ProgressProps>(
	(props, forwardedRef) => {
		const { size = "medium", tone = "neutral", ...rest } = props;

		return (
			<Ariakit.Role
				{...rest}
				data-kiwi-size={size}
				data-kiwi-tone={tone}
				className={cx("🥝-progress", props.className)}
				ref={forwardedRef}
			>
				<svg aria-hidden="true" className="🥝-progress-svg" viewBox="0 0 16 16">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						d="M9.5 1.674a6.503 6.503 0 0 1 0 12.652m-3-12.652a6.503 6.503 0 0 0 0 12.652"
					/>
				</svg>
				<VisuallyHidden>Loading</VisuallyHidden>
			</Ariakit.Role>
		);
	},
);
DEV: Progress.displayName = "Progress";
