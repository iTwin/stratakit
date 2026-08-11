/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import { forwardRef } from "@stratakit/internal-utils/react";

import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

interface MuiAvatarGroupProps extends BaseProps<"div"> {}

const MuiAvatarGroup = forwardRef<"div", MuiAvatarGroupProps>(
	(props, forwardedRef) => {
		const { children: childrenProp, ...rest } = props;

		const children = React.Children.map(childrenProp, (child) => {
			// When no surplus chip is present, the first child is null. We must skip it,
			// or it will render an empty list item.
			if (child == null) return null;

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
