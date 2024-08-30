/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";

interface LabelProps extends Ariakit.RoleProps<"label"> {}

export const Label = React.forwardRef<
	React.ElementRef<typeof Ariakit.Role.label>,
	LabelProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Role.label
			{...props}
			className={cx("🥝-label", props.className)}
			ref={forwardedRef}
		/>
	);
});
