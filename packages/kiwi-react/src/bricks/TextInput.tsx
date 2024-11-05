/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { useFieldId } from "./Field.js";

type BaseInputProps = Ariakit.FocusableProps<"input">;

interface TextInputProps extends Omit<BaseInputProps, "children" | "type"> {
	/** Input is a [void element](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) and no content is permitted. */
	children?: never;
	/**
	 * Describes a text based [input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)
	 * based on the value type the user will enter.
	 *
	 * @default "text"
	 */
	type?: Extract<
		BaseInputProps["type"],
		"text" | "email" | "password" | "search" | "tel" | "url" | "number"
	>;
}

export const TextInput = React.forwardRef<
	React.ElementRef<"input">,
	TextInputProps
>((props, forwardedRef) => {
	const fieldId = useFieldId();

	return (
		<Ariakit.Role.input
			id={fieldId}
			{...props}
			className={cx("🥝-text-input", props.className)}
			render={
				<Ariakit.Focusable
					accessibleWhenDisabled
					render={props.render || <input />}
				/>
			}
			ref={forwardedRef}
		/>
	);
});
