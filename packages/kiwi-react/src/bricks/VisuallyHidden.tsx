/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import { forwardRef, type BaseProps } from "./~utils.js";

interface VisuallyHiddenProps extends BaseProps<"span"> {}

export const VisuallyHidden = forwardRef<"span", VisuallyHiddenProps>(
	(props, forwardedRef) => {
		return <Ariakit.VisuallyHidden {...props} ref={forwardedRef} />;
	},
);
DEV: VisuallyHidden.displayName = "VisuallyHidden";
