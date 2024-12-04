/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { useFieldId } from "./Field.js";

interface TextareaProps extends Ariakit.FocusableProps<"textarea"> {}

/**
 * Textarea component that allows users to enter multiline text values.
 *
 * Example usage:
 * ```tsx
 * <TextBox.Textarea defaultValue="Hello" />
 * ```
 */
export const Textarea = React.forwardRef<
	React.ElementRef<"textarea">,
	TextareaProps
>((props, forwardedRef) => {
	const fieldId = useFieldId();

	return (
		<Ariakit.Role.textarea
			id={fieldId}
			{...props}
			className={cx("🥝-text-box", props.className)}
			render={
				<Ariakit.Focusable
					accessibleWhenDisabled
					render={props.render || <textarea />}
				/>
			}
			ref={forwardedRef}
		/>
	);
});
DEV: Textarea.displayName = "Textarea";
