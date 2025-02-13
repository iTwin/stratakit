/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";
import { FieldCollection, FieldInvalidContext } from "./Field.internal.js";

// ----------------------------------------------------------------------------

interface FieldProps extends BaseProps {
	/**
	 * Allows overriding the default block layout for text controls.
	 */
	layout?: "inline";

	/**
	 * Is the field initially invalid.
	 */
	invalid?: boolean;
}

/**
 * A container for form controls. It manages ID associations provides a consistent layout and spacing.
 *
 * Example:
 * ```tsx
 * <Field>
 *   <Label>Label</Label>
 *   <TextBox.Input />
 * </Field>
 * ```
 *
 * Supports a `layout` prop, which can be set to `inline` to align the label and control horizontally.
 *
 * Should contain a `Label` component paired with a form control. Supported form controls include:
 * - `TextBox.Input`
 * - `TextBox.Textarea`
 * - `Checkbox`
 * - `Radio`
 * - `Switch`
 */
export const Field = forwardRef<"div", FieldProps>((props, forwardedRef) => {
	const { invalid, layout, ...rest } = props;
	return (
		<FieldInvalidContext.Provider value={invalid}>
			<FieldCollection
				render={
					<Ariakit.Role.div
						{...rest}
						className={cx("🥝-field", props.className)}
						data-kiwi-layout={layout}
						ref={forwardedRef}
					/>
				}
			/>
		</FieldInvalidContext.Provider>
	);
});
DEV: Field.displayName = "Field";
