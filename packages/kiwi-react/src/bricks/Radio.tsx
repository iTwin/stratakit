/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import {
	Radio as AkRadio,
	type RadioProps as AkRadioProps,
} from "@ariakit/react/radio";
import { FieldControl } from "./Field.js";
import { forwardRef, type FocusableProps } from "./~utils.js";

type InputBaseProps = Omit<FocusableProps<"input">, "defaultValue" | "value">;

type RadioOwnProps = Pick<AkRadioProps, "value" | "checked" | "onChange">;

interface RadioProps extends InputBaseProps, RadioOwnProps {}

/**
 * A styled radio input element, typically used for selecting a single option from a list.
 *
 * Works well with the `Field` and `Label` components.
 *
 * ```tsx
 * <Field>
 *   <Label>Choose one</Label>
 *   <Radio />
 * </Field>
 * ```
 *
 * Underneath, it's an HTML radio input, i.e. `<input type="radio">`, so it supports the same props,
 * including `value`, `defaultChecked`, `checked`, and `onChange`.
 */
export const Radio = forwardRef<"input", RadioProps>((props, forwardedRef) => {
	const { id, ...rest } = props;

	return (
		<FieldControl
			type="checkable"
			id={id}
			render={
				<AkRadio
					accessibleWhenDisabled
					{...rest}
					className={cx("🥝-checkbox", "🥝-radio", props.className)}
					ref={forwardedRef}
				/>
			}
		/>
	);
});
DEV: Radio.displayName = "Radio";
