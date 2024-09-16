/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface DividerProps extends Ariakit.SeparatorProps<"hr"> {}

export const Divider = React.forwardRef<
	React.ElementRef<typeof Ariakit.Separator>,
	DividerProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Separator
			{...props}
			className={cx("🥝-divider", props.className)}
			ref={forwardedRef}
		/>
	);
});
