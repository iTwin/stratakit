/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import {
	Radio as AkRadio,
	type RadioProps as AkRadioProps,
} from "@ariakit/react/radio";
import { forwardRef, type FocusableProps } from "./~utils.js";
import { useFieldControlType } from "./Field.internal.js";

type InputBaseProps = Omit<FocusableProps<"input">, "defaultValue" | "value">;

type RadioOwnProps = Pick<AkRadioProps, "value" | "checked" | "onChange">;

interface RadioProps extends InputBaseProps, RadioOwnProps {}

/**
 * A styled radio input element, typically used for selecting a single option from a list.
 *
 * Use with the `Field` components to automatically handle ID associations for
 * labels and descriptions:
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Choose one</Field.Label>
 *   <Field.Control render={<Radio />} />
 * </Field.Root>
 * ```
 *
 * Without the `Field` components you will need to manually associate labels,
 * descriptions, etc.:
 * ```tsx
 * <Radio id="editor-vim" name="editor" value="vim" />
 * <Label htmlFor="editor-vim">Vim</Label>
 * <Radio id="editor-emacs" name="editor" value="emacs" />
 * <Label htmlFor="editor-emacs">Emacs</Label>
 * ```
 *
 * Underneath, it's an HTML radio input, i.e. `<input type="radio">`, so it supports the same props,
 * including `value`, `defaultChecked`, `checked`, and `onChange`.
 */
export const Radio = forwardRef<"input", RadioProps>((props, forwardedRef) => {
	useFieldControlType("checkable");
	return (
		<AkRadio
			accessibleWhenDisabled
			{...props}
			className={cx("🥝-checkbox", "🥝-radio", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: Radio.displayName = "Radio";
