/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import {
	type BaseProps,
	forwardRef,
} from "@stratakit/foundations/secret-internals";

import type Badge from "@mui/material/Badge";

// ----------------------------------------------------------------------------

type BadgeProps = React.ComponentProps<typeof Badge>;

interface MuiBadgeProps extends BaseProps<"span">, Pick<BadgeProps, "inline"> {}

const MuiBadge = forwardRef<"span", MuiBadgeProps>((props, forwardedRef) => {
	const { inline, ...rest } = props;
	return (
		<Role.span
			{...rest}
			data-_sk-inline={inline ? "" : undefined}
			ref={forwardedRef}
		/>
	);
});
DEV: MuiBadge.displayName = "MuiBadge";

// ----------------------------------------------------------------------------

export { MuiBadge };
