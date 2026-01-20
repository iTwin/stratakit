/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IconButton } from "@stratakit/bricks";
import boldIcon from "@stratakit/icons/font-bold.svg";
import italicIcon from "@stratakit/icons/font-italic.svg";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";

export default () => {
	return (
		<Toolbar.Group variant="solid">
			<Toolbar.Item
				render={
					<IconButton
						label="Bold"
						icon={`${boldIcon}#icon-large`}
						variant="ghost"
						active
					/>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton
						label="Italic"
						icon={`${italicIcon}#icon-large`}
						variant="ghost"
					/>
				}
			/>
		</Toolbar.Group>
	);
};
