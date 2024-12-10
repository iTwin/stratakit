/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import * as Ariakit from "@ariakit/react";
import type { BaseProps } from "./~utils.js";

interface VisuallyHiddenProps extends BaseProps<"span"> {}

export const VisuallyHidden = React.forwardRef<
	React.ElementRef<"span">,
	VisuallyHiddenProps
>((props, forwardedRef) => {
	return <Ariakit.VisuallyHidden {...props} ref={forwardedRef} />;
});
DEV: VisuallyHidden.displayName = "VisuallyHidden";
