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

	return <Role.div {...rest} data-_sk-size={size} ref={forwardedRef} />;
});
DEV: MuiTabs.displayName = "MuiTabs";

// ----------------------------------------------------------------------------

export { MuiTabs };
