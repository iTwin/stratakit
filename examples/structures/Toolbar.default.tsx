/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IconButton } from "@stratakit/bricks";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";

import svgAdd from "@stratakit/icons/add.svg";
import svgDelete from "@stratakit/icons/delete.svg";
import svgEdit from "@stratakit/icons/edit.svg";

export default () => {
	return (
		<Toolbar.Group variant="solid">
			<Toolbar.Item
				render={
					<IconButton
						icon={`${svgAdd}#icon-large`}
						label="Add"
						variant="ghost"
					/>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton
						icon={`${svgEdit}#icon-large`}
						label="Edit"
						variant="ghost"
					/>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton
						icon={`${svgDelete}#icon-large`}
						label="Delete"
						variant="ghost"
					/>
				}
			/>
		</Toolbar.Group>
	);
};
