/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";

interface ProgressIndicatorProps extends BaseProps {
	/** @default "medium" */
	size?: "small" | "medium" | "large" | "xlarge";

	/** @default "neutral" */
	tone?: "neutral" | "accent";
}

/**
 * A progress indicator, used to show the status of a process in real time.
 *
 * Example:
 * ```tsx
 * <ProgressIndicator />
 * ```
 *
 * Supports a `tone` prop to change the tone (color) of the progress indicator.
 */
export const ProgressIndicator = forwardRef<"div", ProgressIndicatorProps>(
	(props, forwardedRef) => {
		const { className, size = "medium", tone = "neutral", ...rest } = props;

		return (
			<Ariakit.Role
				role="progressbar"
				data-kiwi-size={size}
				data-kiwi-tone={tone}
				{...rest}
				className={cx("🥝-progress", className)}
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
DEV: ProgressIndicator.displayName = "ProgressIndicator";
