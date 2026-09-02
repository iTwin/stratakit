/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Role } from "@ariakit/react/role";
import { useSafeContext } from "@stratakit/internal-utils/hooks";
import { forwardRef } from "@stratakit/internal-utils/react";

import type Badge from "@mui/material/Badge";
import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

const MuiBadgeContext = React.createContext<
	Pick<BadgeProps, "size" | "type"> | undefined
>(undefined);

// ----------------------------------------------------------------------------

type BadgeProps = React.ComponentProps<typeof Badge>;

interface MuiBadgeProps
	extends BaseProps<"span">,
		Pick<BadgeProps, "size" | "type"> {}

const MuiBadge = forwardRef<"span", MuiBadgeProps>((props, forwardedRef) => {
	const { size = "medium", type = "strong", ...rest } = props;

	return (
		<MuiBadgeContext.Provider value={{ size, type }}>
			<Role.span {...rest} ref={forwardedRef} />
		</MuiBadgeContext.Provider>
	);
});
DEV: MuiBadge.displayName = "MuiBadge";

// ----------------------------------------------------------------------------

const MuiBadgeBadge = forwardRef<"span", BaseProps>((props, forwardedRef) => {
	const { size, type } = useSafeContext(MuiBadgeContext);
	const inline = props.className?.includes("MuiBadge-inline");

	return (
		<Role.span
			{...props}
			aria-hidden={inline ? undefined : props["aria-hidden"]}
			data-_sk-size={inline && size === "small" ? "small" : undefined}
			data-_sk-type={inline && type !== "strong" ? type : undefined}
			ref={forwardedRef}
		/>
	);
});
DEV: MuiBadgeBadge.displayName = "MuiBadgeBadge";

// ----------------------------------------------------------------------------

export { MuiBadge, MuiBadgeBadge };
