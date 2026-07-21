/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/internal-utils/react";
import cx from "classnames";
import { useInit } from "./~utils.useInit.js";
import VisuallyHidden from "./VisuallyHidden.js";

import type { BaseProps } from "@stratakit/internal-utils/props";

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
 *
 * @deprecated Use MUI [`CircularProgress`](https://mui.com/material-ui/api/circular-progress/) component instead.
 * See [migration guide](https://stratakit.bentley.com/docs/getting-started/migration-from-legacy-stratakit/#spinner).
 */
const Spinner = forwardRef<"div", SpinnerProps>((props, forwardedRef) => {
	useInit();

	const {
		alt = "Loading…",
		size = "medium",
		tone = "neutral",
		...rest
	} = props;

	return (
		<Role
			{...rest}
			data-_sk-size={size}
			data-_sk-tone={tone}
			data-_sk-variant="indeterminate"
			className={cx("🥝Spinner", props.className)}
			ref={forwardedRef}
		>
			<svg aria-hidden="true" className="🥝SpinnerSvg" viewBox="0 0 16 16">
				<circle
					pathLength="100"
					className="🥝SpinnerSvgTrack"
					cx="8"
					cy="8"
					r="6.5"
				/>
				<circle
					pathLength="100"
					className="🥝SpinnerSvgFill"
					cx="8"
					cy="8"
					r="6.5"
				/>
			</svg>
			<VisuallyHidden>{alt}</VisuallyHidden>
		</Role>
	);
});
DEV: Spinner.displayName = "Spinner";

// ----------------------------------------------------------------------------

export default Spinner;
