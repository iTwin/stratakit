/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { useFieldId } from "./Field.js";
import { forwardRef, type FocusableProps } from "./~utils.js";

type InputBaseProps = Omit<FocusableProps<"input">, "defaultValue" | "value">;

type RadioOwnProps = Pick<Ariakit.RadioProps, "value" | "checked" | "onChange">;

interface RadioProps extends InputBaseProps, RadioOwnProps {}

export const Radio = forwardRef<"input", RadioProps>((props, forwardedRef) => {
	const fieldId = useFieldId();

	return (
		<Ariakit.Radio
			accessibleWhenDisabled
			id={fieldId}
			{...props}
			className={cx("🥝-checkbox", "🥝-radio", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: Radio.displayName = "Radio";
