/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import cx from "classnames";
import * as React from "react";
import { VisuallyHidden } from "./VisuallyHidden.js";
import { forwardRef } from "./~utils.js";

import type { BaseProps } from "./~utils.js";

interface SpinnerProps extends BaseProps {
	/**
	 * A text alternative for the spinner.
	 * @default "Loading…"
	 */
	alt?: string;

	/**
	 * The size of the spinner.
	 * @default "medium"
	 */
	size?: "small" | "medium" | "large" | "xlarge";

	/**
	 * The tone of the spinner.
	 * @default "neutral"
	 */
	tone?: "neutral" | "accent";

	/**
	 * The value out of 100 of the spinner.
	 *
	 * - If passed, the spinner will be determinate.
	 * - If not passed, the spinner will be indeterminate.
	 */
	value?: number;
}

/**
 * A loading spinner.
 *
 * Example:
 * ```tsx
 * <Spinner />
 * ```
 *
 * Supports a `tone` prop to change the tone (color) of the spinner.
 * Supports a `size` prop to change the size of the spinner.
 */
export const Spinner = forwardRef<"div", SpinnerProps>(
	(props, forwardedRef) => {
		const {
			alt = "Loading…",
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
							"--🥝spinner-dash-array": `${value} ${100 - value}`,
						}
					: styleProp,
			[styleProp, value],
		);

		return (
			<Role
				{...rest}
				data-kiwi-size={size}
				data-kiwi-tone={tone}
				data-kiwi-variant={value != null ? "determinate" : "indeterminate"}
				className={cx("🥝-spinner", props.className)}
				style={style}
				ref={forwardedRef}
			>
				<svg aria-hidden="true" className="🥝-spinner-svg" viewBox="0 0 16 16">
					<circle
						pathLength="100"
						className="🥝-spinner-svg-track"
						cx="8"
						cy="8"
						r="6.5"
					/>
					<circle
						pathLength="100"
						className="🥝-spinner-svg-fill"
						cx="8"
						cy="8"
						r="6.5"
					/>
				</svg>
				<VisuallyHidden>{alt}</VisuallyHidden>
			</Role>
		);
	},
);
DEV: Spinner.displayName = "Spinner";
