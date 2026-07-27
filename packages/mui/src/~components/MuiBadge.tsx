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

const MuiBadgeContext = React.createContext<{ inline?: boolean } | undefined>(
	undefined,
);

// ----------------------------------------------------------------------------

type BadgeProps = React.ComponentProps<typeof Badge>;

interface MuiBadgeProps
	extends BaseProps<"span">,
		Pick<BadgeProps, "inline" | "size" | "type"> {}

const MuiBadge = forwardRef<"span", MuiBadgeProps>((props, forwardedRef) => {
	const { inline, size = "medium", type = "strong", ...rest } = props;

	return (
		<MuiBadgeContext.Provider value={{ inline }}>
			<Role.span
				{...rest}
				data-_sk-inline={inline ? "" : undefined}
				data-_sk-size={size === "small" ? "small" : undefined}
				data-_sk-type={inline ? type : undefined}
				ref={forwardedRef}
			/>
		</MuiBadgeContext.Provider>
	);
});
DEV: MuiBadge.displayName = "MuiBadge";

// ----------------------------------------------------------------------------

const MuiBadgeBadge = forwardRef<"span", BaseProps>((props, forwardedRef) => {
	const { inline } = useSafeContext(MuiBadgeContext);

	if (inline && props.className?.match(/(^|\s)MuiBadge-colorPrimary($|\s)/)) {
		throw new Error(
			'inline cannot be used with color="primary" for Badge component',
		);
	}

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
