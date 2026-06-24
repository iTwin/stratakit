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

interface MuiBadgeProps
	extends BaseProps<"span">,
		Pick<BadgeProps, "inline" | "size"> {}

const MuiBadge = forwardRef<"span", MuiBadgeProps>((props, forwardedRef) => {
	const { inline, size = "medium", ...rest } = props;
	return (
		<MuiBadgeContext.Provider value={{ inline }}>
			<Role.span
				{...rest}
				data-_sk-inline={inline ? "" : undefined}
				data-_sk-size={size === "small" ? "small" : undefined}
				ref={forwardedRef}
			/>
		</MuiBadgeContext.Provider>
	);
});
DEV: MuiBadge.displayName = "MuiBadge";

// ----------------------------------------------------------------------------

const MuiBadgeBadge = forwardRef<"span", BaseProps>((props, forwardedRef) => {
	const { inline } = useSafeContext(MuiBadgeContext);
	return (
		<Role.span
			{...props}
			aria-hidden={inline ? undefined : props["aria-hidden"]}
			ref={forwardedRef}
		/>
	);
});
DEV: MuiBadgeBadge.displayName = "MuiBadgeBadge";

// ----------------------------------------------------------------------------

export { MuiBadge, MuiBadgeBadge };
