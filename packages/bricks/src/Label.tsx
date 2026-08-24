/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/internal-utils/react";
import cx from "classnames";
import { useInit } from "./~utils.useInit.js";

import type { BaseProps } from "@stratakit/internal-utils/props";

interface LabelProps extends BaseProps<"label"> {}

/**
 * A styled wrapper over the HTML `<label>` element, used for labelling form
 * controls.
 *
 * Example usage:
 * ```tsx
 * <Label htmlFor="my-input">Label</Label>
 * <TextBox.Input id="my-input" />
 * ```
 *
 * See `Field.Label` for convenient usage with form controls (e.g. automatic
 * association with adjacent form control).
 *
 * @deprecated Use MUI [`FormLabel`](https://mui.com/material-ui/api/form-label/) or [`InputLabel`](https://mui.com/material-ui/api/input-label/) component instead.
 * See [migration guide](https://stratakit.bentley.com/docs/getting-started/migration-from-legacy-stratakit/#field).
 */
const Label = forwardRef<"label", LabelProps>((props, forwardedRef) => {
	useInit();
	return (
		<Role.label
			{...props}
			className={cx("🥝Label", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: Label.displayName = "Label";

// ----------------------------------------------------------------------------

export default Label;
