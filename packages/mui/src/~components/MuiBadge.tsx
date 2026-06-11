/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Role } from "@ariakit/react/role";
import {
	forwardRef,
	useSafeContext,
} from "@stratakit/foundations/secret-internals";

import type Badge from "@mui/material/Badge";
import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const MuiBadgeContext = React.createContext<{ inline?: boolean } | undefined>(
	undefined,
);

// ----------------------------------------------------------------------------

type BadgeProps = React.ComponentProps<typeof Badge>;

interface MuiBadgeRootProps
	extends BaseProps<"span">,
		Pick<BadgeProps, "inline"> {}

const MuiBadgeRoot = forwardRef<"span", MuiBadgeRootProps>(
	(props, forwardedRef) => {
		const { inline, ...rest } = props;
		return (
			<MuiBadgeContext.Provider value={{ inline }}>
				<Role.span
					{...rest}
					data-_sk-inline={inline ? "" : undefined}
					ref={forwardedRef}
				/>
			</MuiBadgeContext.Provider>
		);
	},
);
DEV: MuiBadgeRoot.displayName = "MuiBadgeRoot";

// ----------------------------------------------------------------------------

interface MuiBadgeProps extends BaseProps<"span">, Pick<BadgeProps, "inline"> {}

const MuiBadge = forwardRef<"span", MuiBadgeProps>((props, forwardedRef) => {
	const { inline } = useSafeContext(MuiBadgeContext);
	return (
		<Role.span
			{...props}
			aria-hidden={inline ? undefined : props["aria-hidden"]}
			ref={forwardedRef}
		/>
	);
});
DEV: MuiBadge.displayName = "MuiBadge";

// ----------------------------------------------------------------------------
export { MuiBadge, MuiBadgeRoot };
