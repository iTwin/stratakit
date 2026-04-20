/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/foundations/secret-internals";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface MuiAvatarGroupProps extends BaseProps<"div"> {}

const MuiAvatarGroup = forwardRef<"div", MuiAvatarGroupProps>(
	(props, forwardedRef) => {
		const { children, ...rest } = props;

		// Reverse children to match source order in HTML output
		const reversedChildren = React.Children.toArray(children).reverse();

		return (
			<Role.div {...rest} ref={forwardedRef}>
				{reversedChildren}
			</Role.div>
		);
	},
);

export { MuiAvatarGroup };
