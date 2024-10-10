/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { useFieldId } from "./Field.js";

interface RadioProps extends Omit<Ariakit.RadioProps, "store"> {}

export const Radio = React.forwardRef<
	React.ElementRef<typeof Ariakit.Radio>,
	RadioProps
>((props, forwardedRef) => {
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
