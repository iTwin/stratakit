/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { Icon } from "@stratakit/foundations";
import { forwardRef } from "./~utils.js";

import type { BaseProps } from "./~utils.js";

// ----------------------------------------------------------------------------

/** Creates an inline icon component for the specified `<path>` definition (`d` attribute). */
export function createIconFromPath(d: string) {
	return forwardRef<"svg", Omit<BaseProps<"svg">, "children">>(
		(props, forwardedRef) => {
			return (
				<Icon
					render={
						<Role.svg
							width="16"
							height="16"
							fill="none"
							viewBox="0 0 16 16"
							{...props}
							ref={forwardedRef}
						>
							<path fill="currentColor" d={d} />
						</Role.svg>
					}
				/>
			);
		},
	);
}
