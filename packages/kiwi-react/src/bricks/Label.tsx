/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { useFieldId } from "./Field.js";
import { forwardRef, type BaseProps } from "./~utils.js";
import { FieldLabel } from "./FieldCollection.js";

interface LabelProps extends BaseProps<"label"> {}

/**
 * A styled wrapper over the HTML `<label>` element, used for labelling form controls.
 * 
 * Can be used standalone:

 * ```tsx
 * <Label htmlFor="my-input">Label</Label>
 * <TextBox.Input id="my-input" />
 * ```
 * 
 * Or within a `Field` component to automatically manage ID associations:
 * 
 * ```tsx
 * <Field>
 *   <Label>Label</Label>
 *   <TextBox.Input />
 * </Field>
 * ```
 * 
 */
export const Label = forwardRef<"label", LabelProps>((props, forwardedRef) => {
	const fieldId = useFieldId();

	return (
		<FieldLabel
			render={
				<Ariakit.Role.label
					htmlFor={fieldId}
					{...props}
					className={cx("🥝-label", props.className)}
					ref={forwardedRef}
				/>
			}
		/>
	);
});
DEV: Label.displayName = "Label";
