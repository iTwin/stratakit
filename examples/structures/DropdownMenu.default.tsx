/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { DropdownMenu } from "@stratakit/structures";

export default () => {
	return (
		<DropdownMenu.Provider>
			<DropdownMenu.Button>Actions</DropdownMenu.Button>
			<DropdownMenu.Content>
				<DropdownMenu.Item shortcuts="Command+N" label="New" />
				<DropdownMenu.Item shortcuts="Command+O" label="Open" />
				<DropdownMenu.Item shortcuts="Command+S" label="Save" />
			</DropdownMenu.Content>
		</DropdownMenu.Provider>
	);
};
