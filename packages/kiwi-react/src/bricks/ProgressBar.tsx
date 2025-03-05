/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react/role";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";
import { VisuallyHidden } from "./VisuallyHidden.js";
import * as React from "react";

interface ProgressBarProps extends BaseProps {
	/**
	 * Accessible name for the progress bar.
	 * @default "Loading…"
	 */
	label?: string;

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
 * A loading progress bar.
 *
 * Example:
 * ```tsx
 * <ProgressBar />
 * ```
 *
 * Supports a `tone` prop to change the tone (color) of the progress bar.
 * Supports a `size` prop to change the size of the progress bar.
 * Supports a `label` prop to provide an accessible name (default is “Loading…”).
 */
export const ProgressBar = forwardRef<"div", ProgressBarProps>(
	(props, forwardedRef) => {
		const {
			label = "Loading…",
			size = "medium",
			tone = "neutral",
			...rest
		} = props;

		const labelId = React.useId();

		return (
			<Ariakit.Role
				aria-labelledby={labelId}
				role="progressbar"
				{...rest}
				data-kiwi-size={size}
				data-kiwi-tone={tone}
				className={cx("🥝-progress-bar", props.className)}
				ref={forwardedRef}
			>
				<div className="🥝-progress-bar-wrapper">
					<div className="🥝-progress-bar-fill" />
				</div>
				<VisuallyHidden id={labelId}>{label}</VisuallyHidden>
			</Ariakit.Role>
		);
	},
);
DEV: ProgressBar.displayName = "ProgressBar";
