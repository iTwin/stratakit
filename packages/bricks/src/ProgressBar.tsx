/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import * as React from "react";

import type { BaseProps } from "@stratakit/foundations/secret-internals";
// changed file test
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
	 * The value of the progress bar between 0 and 100 (inclusive). This value is rounded to 3 decimal places.
	 *
	 * - If passed, the progress bar will be determinate.
	 * - If not passed, the progress bar will be indeterminate.
	 *
	 * Note: Indeterminate progress bars (`value` not passed) should only be used for indicating the progress of short
	 * operations (i.e. less than 5 seconds).
	 */
	value?: number;
}

/**
 * A linear progress bar for indicating progress of an operation (or loading of data).
 * This component maps to the [ARIA `progressbar` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/progressbar_role)
 * and must be labelled using `aria-labelledby`.
 *
 * Note: A progress bar is indeterminate if no `value` is passed.
 *
 * Example:
 * ```tsx
 * <ProgressBar aria-labelledby={…} /> // indeterminate
 * <ProgressBar aria-labelledby={…} value={50} /> // determinate
 * ```
 *
 * Supports a `tone` prop to change the tone (color) of the progress bar.
 * Supports a `size` prop to change the size of the progress bar.
 *
 */
export const ProgressBar = forwardRef<"div", ProgressBarProps>(
	(props, forwardedRef) => {
		const {
			size = "medium",
			tone = "neutral",
			style: styleProp,
			value: valueProp,
			...rest
		} = props;

		/**
		 * `valueProp` between 0 and 100 rounded to 3 decimal places.
		 */
		const value = React.useMemo(() => {
			if (valueProp == null) return undefined;

			const clampedValue = Math.min(Math.max(valueProp, 0), 100);
			return Number(clampedValue.toFixed(3));
		}, [valueProp]);

		const style = React.useMemo(() => {
			return value != null
				? {
						...styleProp,
						"--🥝progress-bar-fill-size": `${value}%`,
					}
				: styleProp;
		}, [styleProp, value]);

		return (
			<Role
				role="progressbar"
				aria-valuenow={value}
				aria-valuemin={value != null ? 0 : undefined}
				aria-valuemax={value != null ? 100 : undefined}
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
