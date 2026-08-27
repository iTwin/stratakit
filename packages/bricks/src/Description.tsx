/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { forwardRef } from "@stratakit/internal-utils/react";
import cx from "classnames";
import { useInit } from "./~utils.useInit.js";
import Text from "./Text.js";

import type { BaseProps } from "@stratakit/internal-utils/props";

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
 *
 * @deprecated Use MUI [`FormHelperText`](https://mui.com/material-ui/api/form-helper-text/) component instead.
 * See [migration guide](https://stratakit.bentley.com/docs/getting-started/migration-from-legacy-stratakit/#description).
 */
const Description = forwardRef<"div", DescriptionProps>(
	(props, forwardedRef) => {
		useInit();

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
