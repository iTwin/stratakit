/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import cx from "classnames";
import * as React from "react";
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
	/**
	 * The value out of 100 of the progress bar.
	 *
	 * - If passed, the progress bar will be determinate.
	 * - If not passed, the progress bar will be indeterminate.
	 */
	value?: number;
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
		const {
			size = "medium",
			tone = "neutral",
			value,
			style: styleProp,
			...rest
		} = props;

		const style = React.useMemo(
			() =>
				value != null
					? {
							...styleProp,
							"--🥝progress-bar-fill-size": `${value}%`,
						}
					: styleProp,
			[value, styleProp],
		);

		return (
			<Role
				role="progressbar"
				{...rest}
				data-kiwi-size={size}
				data-kiwi-tone={tone}
				data-kiwi-variant={value != null ? "determinate" : "indeterminate"}
				className={cx("🥝-progress-bar", props.className)}
				style={style}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: ProgressBar.displayName = "ProgressBar";
