/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import Text from "./Text.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

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
const Description = forwardRef<"div", DescriptionProps>(
	(props, forwardedRef) => {
		const { tone, ...rest } = props;

		return (
			<Text
				{...rest}
				variant="caption-lg"
				data-_sk-tone={tone ?? "neutral"}
				className={cx("🥝Description", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);

// ----------------------------------------------------------------------------

export default Description;
