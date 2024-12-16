/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { useFieldId } from "./Field.js";
import { forwardRef, type BaseProps } from "./~utils.js";

interface LabelProps extends BaseProps<"label"> {}

export const Label = forwardRef<"label", LabelProps>((props, forwardedRef) => {
	const fieldId = useFieldId();

	return (
		<Ariakit.Role.label
			htmlFor={fieldId}
			{...props}
			className={cx("🥝-label", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: Label.displayName = "Label";
