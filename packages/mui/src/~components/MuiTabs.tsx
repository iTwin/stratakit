/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEventHandlers } from "@stratakit/internal-utils/hooks";
import { forwardRef } from "@stratakit/internal-utils/react";

import type Tabs from "@mui/material/Tabs";
import type { BaseProps } from "@stratakit/internal-utils/props";

// ----------------------------------------------------------------------------

type TabsProps = React.ComponentProps<typeof Tabs>;

interface MuiTabsProps extends BaseProps<"div">, Pick<TabsProps, "size"> {}

const MuiTabs = forwardRef<"div", MuiTabsProps>((props, forwardedRef) => {
	const { size = "medium", ...rest } = props;

	return (
		<Role.div
			{...rest}
			data-_sk-size={size !== "medium" ? size : undefined}
			ref={forwardedRef}
		/>
	);
});
DEV: MuiTabs.displayName = "MuiTabs";

const MuiTab = forwardRef<"button", BaseProps<"button">>(
	(props, forwardedRef) => {
		const motionOk = useMediaQuery("(prefers-reduced-motion: no-preference)");

		return (
			<Role.button
				{...props}
				onFocus={useEventHandlers(props.onFocus, (event) => {
					event?.currentTarget?.scrollIntoView({
						block: "nearest",
						inline: "nearest",
						behavior: motionOk ? "smooth" : "auto",
					});
				})}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: MuiTab.displayName = "MuiTab";

// ----------------------------------------------------------------------------

export { MuiTab, MuiTabs };
