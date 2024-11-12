/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type * as Ariakit from "@ariakit/react";

interface TreeProps extends Ariakit.RoleProps<"div"> {
}

export const Tree = React.forwardRef<
	React.ElementRef<"div">,
	TreeProps
>((props, forwardedRef) => {
	return (
		<div {...props} role="tree" ref={forwardedRef} >
			{props.children}
		</div>
	);
});

export { Tree as Root };
