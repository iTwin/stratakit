/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface RadioProps extends Omit<Ariakit.RadioProps, "store"> {}

export const Radio = React.forwardRef<
	React.ElementRef<typeof Ariakit.Radio>,
	RadioProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Radio
			accessibleWhenDisabled
			{...props}
			className={cx("🥝-checkbox 🥝-radio", props.className)}
			ref={forwardedRef}
		/>
	);
});
