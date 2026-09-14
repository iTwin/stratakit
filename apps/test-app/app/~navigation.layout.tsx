/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Outlet } from "react-router";
import { AppNavigationRail } from "./~navigation.tsx";

// This is a layout route export.
// https://reactrouter.com/start/framework/routing#layout-routes
export default function NavigationLayout() {
	return <AppNavigationRail mainContent={<Outlet />} />;
}
