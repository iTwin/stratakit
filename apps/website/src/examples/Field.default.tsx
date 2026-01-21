/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Field, TextBox } from "@stratakit/bricks";

export default () => {
	return (
		<Field.Root>
			<Field.Label>Name</Field.Label>
			<Field.Control render={<TextBox.Input />} />
		</Field.Root>
	);
};
