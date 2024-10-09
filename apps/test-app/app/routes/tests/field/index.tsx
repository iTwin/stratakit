/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Field, Input, Label } from "@itwin/kiwi-react/bricks";

export default function Page() {
	return (
		<form>
			{/* These should be synced */}
			<Field>
				<Label>Name</Label>
				<Input />
			</Field>
			{/* These aren’t synced and right now that’s intentional */}
			<Field>
				<Label>Fruit</Label>
				<Input id="fruit" />
			</Field>
		</form>
	);
}
