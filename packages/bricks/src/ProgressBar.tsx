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
	 * The value of the progress bar. By default, is it between 0 and 100.
	 * This can be modified using `valueMin` and `valueMax`.
	 *
	 * - If passed, the progress bar will be determinate.
	 * - If not passed, the progress bar will be indeterminate.
	 *
	 * Note: Indeterminate progress bars (`value` not passed) should only be used for indicating the progress of short
	 * operations (i.e. less than 5 seconds).
	 */
	value?: number;
	/**
	 * The minimum value of the progress bar.
	 * @default 0
	 */
	valueMin?: number;
	/**
	 * The maximum value of the progress bar.
	 * @default 100
	 */
	valueMax?: number;
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
 * Note: Indeterminate progress bars (`value` not passed) should only be used for indicating the progress of short
 * operations (i.e. less than 5 seconds).
 */
export const ProgressBar = forwardRef<"div", ProgressBarProps>(
	(props, forwardedRef) => {
		const {
			size = "medium",
			tone = "neutral",
			style: styleProp,
			valueMin = 0,
			valueMax = 100,
			value: valueProp,
			...rest
		} = props;

		/**
		 * Keeps the value between `valueMin` and `valueMax`.
		 */
		const value = React.useMemo(() => {
			return valueProp != null
				? Math.min(Math.max(valueProp, valueMin), valueMax)
				: null;
		}, [valueProp, valueMin, valueMax]);

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

		const determinateAriaProps = React.useMemo(
			() =>
				value != null
					? {
							"aria-valuenow": value,
							"aria-valuemin": valueMin,
							"aria-valuemax": valueMax,
						}
					: {},
			[value, valueMin, valueMax],
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
				{...determinateAriaProps}
			/>
		);
	},
);
DEV: ProgressBar.displayName = "ProgressBar";
