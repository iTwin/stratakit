/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Field, TextBox } from "@stratakit/bricks";

export default () => {
	return (
		<Field.Root>
			<Field.Label>Bio</Field.Label>
			<Field.Description>Tell us a little about yourself.</Field.Description>
			<Field.Control render={<TextBox.Textarea />} />
		</Field.Root>
	);
};
