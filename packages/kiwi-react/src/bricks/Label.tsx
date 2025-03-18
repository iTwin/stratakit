/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import { Role } from "@ariakit/react/role";
import { forwardRef, type BaseProps } from "./~utils.js";

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
 */
export const Label = forwardRef<"label", LabelProps>((props, forwardedRef) => {
	return (
		<Role.label
			{...props}
			className={cx("🥝-label", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: Label.displayName = "Label";
