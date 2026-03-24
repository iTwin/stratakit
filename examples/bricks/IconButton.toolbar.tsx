/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IconButton } from "@stratakit/bricks";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";

import svgBold from "@stratakit/icons/font-bold.svg";
import svgItalic from "@stratakit/icons/font-italic.svg";

export default () => {
	return (
		<Toolbar.Group variant="solid">
			<Toolbar.Item
				render={
					<IconButton
						label="Bold"
						icon={`${svgBold}#icon-large`}
						variant="ghost"
						active
					/>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton
						label="Italic"
						icon={`${svgItalic}#icon-large`}
						variant="ghost"
					/>
				}
			/>
		</Toolbar.Group>
	);
};
