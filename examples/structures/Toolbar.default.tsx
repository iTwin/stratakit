/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IconButton } from "@stratakit/bricks";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";

import addIcon from "@stratakit/icons/add.svg";
import deleteIcon from "@stratakit/icons/delete.svg";
import editIcon from "@stratakit/icons/edit.svg";

export default () => {
	return (
		<Toolbar.Group variant="solid">
			<Toolbar.Item
				render={
					<IconButton
						icon={`${addIcon}#icon-large`}
						label="Add"
						variant="ghost"
					/>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton
						icon={`${editIcon}#icon-large`}
						label="Edit"
						variant="ghost"
					/>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton
						icon={`${deleteIcon}#icon-large`}
						label="Delete"
						variant="ghost"
					/>
				}
			/>
		</Toolbar.Group>
	);
};
