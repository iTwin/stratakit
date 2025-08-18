/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button } from "@stratakit/bricks";
import { DropdownMenu, MenuItem } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "DropdownMenu" };

export default definePage(function Page() {
	return (
		<DropdownMenu
			menuItems={() => [
				<MenuItem key={1}>Item #1</MenuItem>,
				<MenuItem key={2}>Item #2</MenuItem>,
				<MenuItem key={3} disabled>
					Item #3
				</MenuItem>,
			]}
		>
			<Button>Default</Button>
		</DropdownMenu>
	);
});
