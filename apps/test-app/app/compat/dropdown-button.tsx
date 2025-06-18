/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { DropdownButton, MenuItem } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "DropdownButton" };

export default definePage(function Page() {
	return (
		<DropdownButton
			menuItems={() => [
				<MenuItem key={1}>Item #1</MenuItem>,
				<MenuItem key={2}>Item #2</MenuItem>,
				<MenuItem key={3} disabled>
					Item #3
				</MenuItem>,
			]}
		>
			Default
		</DropdownButton>
	);
});
