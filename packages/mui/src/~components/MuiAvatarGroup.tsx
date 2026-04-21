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
		const { children: childrenProp, ...rest } = props;

		const children = React.Children.map(childrenProp, (child) => {
			return (
				<div className="🥝MuiAvatarGroupItem" role="listitem">
					{child}
				</div>
			);
		})?.reverse(); // Reverse children to match source order in HTML output

		return (
			<Role.div role="list" {...rest} ref={forwardedRef}>
				{children}
			</Role.div>
		);
	},
);

export { MuiAvatarGroup };
