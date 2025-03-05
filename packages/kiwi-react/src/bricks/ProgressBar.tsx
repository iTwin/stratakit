/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react/role";
import cx from "classnames";
import { VisuallyHidden } from "./VisuallyHidden.js";
import { forwardRef, type BaseProps } from "./~utils.js";

interface ProgressBarProps extends BaseProps {
	/**
	 * A text alternative for the progress bar.
	 * @default "Loading…"
	 */
	alt?: string;

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
 * Supports an `alt` prop to provide an accessible alternative (default is “Loading”).
 */
export const ProgressBar = forwardRef<"div", ProgressBarProps>(
	(props, forwardedRef) => {
		const {
			alt = "Loading…",
			size = "medium",
			tone = "neutral",
			...rest
		} = props;

		return (
			<Ariakit.Role
				{...rest}
				data-kiwi-size={size}
				data-kiwi-tone={tone}
				className={cx("🥝-progress-bar", props.className)}
				role="progressbar"
				ref={forwardedRef}
			>
				<div className="🥝-progress-bar-wrapper">
					<div className="🥝-progress-bar-fill" />
				</div>

				<VisuallyHidden>{alt}</VisuallyHidden>
			</Ariakit.Role>
		);
	},
);
DEV: ProgressBar.displayName = "ProgressBar";
