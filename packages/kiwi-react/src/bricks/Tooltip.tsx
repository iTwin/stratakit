/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as Ariakit from "@ariakit/react";

interface TooltipProps extends Omit<Ariakit.TooltipProps, "store"> {}

export const Tooltip = React.forwardRef<
	React.ElementRef<typeof Ariakit.Tooltip>,
	TooltipProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Tooltip accessibleWhenDisabled {...props} ref={forwardedRef} />
	);
});
