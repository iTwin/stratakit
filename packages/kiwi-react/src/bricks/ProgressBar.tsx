/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Role } from "@ariakit/react/role";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";

// TODO: Handle label and remove the requirement for the aria-labelledby prop
interface ProgressBarProps
	extends Omit<BaseProps, "aria-labelledby">,
		Required<Pick<BaseProps, "aria-labelledby">> {
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

const ProgressBarWrapper = null; // TODO
