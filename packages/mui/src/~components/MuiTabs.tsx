/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import {
	type BaseProps,
	forwardRef,
} from "@stratakit/foundations/secret-internals";

import type Tabs from "@mui/material/Tabs";

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
		const { onFocus, ...rest } = props;

		const handleFocus: React.FocusEventHandler<HTMLButtonElement> = (event) => {
			(onFocus as React.FocusEventHandler<HTMLButtonElement> | undefined)?.(
				event,
			);
			event.currentTarget.scrollIntoView({
				block: "nearest",
				inline: "nearest",
			});
		};

		return <Role.button {...rest} onFocus={handleFocus} ref={forwardedRef} />;
	},
);
DEV: MuiTab.displayName = "MuiTab";

// ----------------------------------------------------------------------------

export { MuiTab, MuiTabs };
