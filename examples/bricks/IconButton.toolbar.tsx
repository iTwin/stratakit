/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IconButton } from "@stratakit/bricks";
import { svgFontBoldLarge } from "@stratakit/icons/font-bold";
import { svgFontItalicLarge } from "@stratakit/icons/font-italic";
import { unstable_Toolbar as Toolbar } from "@stratakit/structures";

export default () => {
	return (
		<Toolbar.Group variant="solid">
			<Toolbar.Item
				render={
					<IconButton
						label="Bold"
						icon={svgFontBoldLarge}
						variant="ghost"
						active
					/>
				}
			/>
			<Toolbar.Item
				render={
					<IconButton
						label="Italic"
						icon={svgFontItalicLarge}
						variant="ghost"
					/>
				}
			/>
		</Toolbar.Group>
	);
};
