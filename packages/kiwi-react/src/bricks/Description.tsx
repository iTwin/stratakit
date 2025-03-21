/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { forwardRef, type BaseProps } from "./~utils.js";
import cx from "classnames";
import { Text } from "./Text.js";

interface DescriptionProps extends BaseProps {
	/**
	 * The tone of the description.
	 * @default "neutral"
	 */
	tone?: "neutral" | "critical";
}

/**
 * A presentational description.
 *
 * See `Field.Description` for convenient usage with form controls.
 */
export const Description = forwardRef<"div", DescriptionProps>(
	(props, forwardedRef) => {
		const { tone, ...rest } = props;

		return (
			<Text
				{...rest}
				variant="caption-md"
				data-kiwi-tone={tone ?? "neutral"}
				className={cx("🥝-description", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
