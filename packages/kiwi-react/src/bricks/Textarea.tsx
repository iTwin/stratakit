/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { useFieldDescribedBy, useFieldId } from "./Field.js";
import { forwardRef, type FocusableProps } from "./~utils.js";

interface TextareaProps extends FocusableProps<"textarea"> {}

/**
 * A styled textarea element that allows users to enter multiline text values.
 *
 * Example usage:
 * ```tsx
 * <TextBox.Textarea defaultValue="Hello" />
 * ```
 *
 * Works well with the `Field` and `Label` components.
 * ```tsx
 * <Field>
 *   <Label>Leave a comment, be kind</Label>
 *   <TextBox.Textarea />
 * </Field>
 * ```
 *
 * Underneath, it's an HTML textarea, i.e. `<textarea>`, so it supports the same props, including
 * `value`, `defaultValue`, `onChange`, and `disabled`.
 */
export const Textarea = forwardRef<"textarea", TextareaProps>(
	(props, forwardedRef) => {
		const fieldId = useFieldId();
		const describedBy = useFieldDescribedBy(props["aria-describedby"]);

		return (
			<Ariakit.Role.textarea
				id={fieldId}
				{...props}
				className={cx("🥝-text-box", props.className)}
				aria-describedby={describedBy}
				render={
					<Ariakit.Focusable
						accessibleWhenDisabled
						render={props.render || <textarea />}
					/>
				}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: Textarea.displayName = "Textarea";
