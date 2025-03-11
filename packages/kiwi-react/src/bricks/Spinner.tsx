/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Role } from "@ariakit/react/role";
import cx from "classnames";
import { VisuallyHidden } from "./VisuallyHidden.js";
import { forwardRef, type BaseProps } from "./~utils.js";

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
			...rest
		} = props;

		return (
			<Role
				{...rest}
				data-kiwi-size={size}
				data-kiwi-tone={tone}
				className={cx("🥝-spinner", props.className)}
				ref={forwardedRef}
			>
				<svg aria-hidden="true" className="🥝-spinner-svg" viewBox="0 0 16 16">
					<path
						stroke="currentColor"
						strokeLinecap="round"
						d="M9.5 1.674a6.503 6.503 0 0 1 0 12.652m-3-12.652a6.503 6.503 0 0 0 0 12.652"
					/>
				</svg>
				<VisuallyHidden>{alt}</VisuallyHidden>
			</Role>
		);
	},
);
DEV: Spinner.displayName = "Spinner";
