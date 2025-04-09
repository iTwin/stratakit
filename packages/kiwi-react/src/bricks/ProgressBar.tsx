/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import cx from "classnames";
import { forwardRef } from "./~utils.js";

import type { BaseProps } from "./~utils.js";

interface ProgressBarProps extends Omit<BaseProps, "aria-labelledby"> {
	/**
	 * Label for the progress bar.
	 *
	 * This prop is required because `role="progressbar"` requires an accessible name.
	 */
	"aria-labelledby": string;
	/**
	 * The size of the progress bar.
	 * @default "medium"
	 */
	size?: "small" | "medium" | "large";

	/**
	 * The tone of the progress bar.
	 * @default "neutral"
	 */
	tone?: "neutral" | "accent";
}

/**
 * A linear progress bar for indicating progress of an operation (or loading of data).
 * This component maps to the [ARIA `progressbar` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/progressbar_role)
 * and must be labelled using `aria-labelledby`.
 *
 * Example:
 * ```tsx
 * <ProgressBar aria-labelledby={…} />
 * ```
 *
 * Supports a `tone` prop to change the tone (color) of the progress bar.
 * Supports a `size` prop to change the size of the progress bar.
 *
 * Note: This component currently only supports indeterminate progress, and should
 * only be used for indicating the progress of short operations (i.e. less than 5 seconds).
 */
export const ProgressBar = forwardRef<"div", ProgressBarProps>(
	(props, forwardedRef) => {
		const { size = "medium", tone = "neutral", ...rest } = props;

		return (
			<Role
				role="progressbar"
				{...rest}
				data-kiwi-size={size}
				data-kiwi-tone={tone}
				data-kiwi-variant="indeterminate"
				className={cx("🥝-progress-bar", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: ProgressBar.displayName = "ProgressBar";
