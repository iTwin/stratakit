/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { useFieldId } from "./Field.js";
import type { BaseProps } from "./~utils.js";

type LabelProps = BaseProps<"label">;

export const Label = React.forwardRef<
	React.ElementRef<typeof Ariakit.Role.label>,
	LabelProps
>((props, forwardedRef) => {
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
