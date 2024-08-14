/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";

interface DividerProps extends Ariakit.SeparatorProps<"hr"> {}

export const Divider = React.forwardRef<React.ElementRef<"hr">, DividerProps>(
	(props, forwardedRef) => {
		return <Ariakit.Separator {...props} ref={forwardedRef} />;
	},
);
