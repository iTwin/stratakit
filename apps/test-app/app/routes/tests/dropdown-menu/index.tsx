/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Button, DropdownMenu } from "@itwin/kiwi-react/bricks";

export const handle = { title: "DropdownMenu" };

export default function Page() {
	return (
		<DropdownMenu>
			<Button>Actions</Button>
		</DropdownMenu>
	);
}
