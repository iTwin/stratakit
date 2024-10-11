/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
	Checkbox,
	Field,
	Input,
	Label,
	Radio,
	Switch,
	Textarea,
} from "@itwin/kiwi-react/bricks";

export default function Page() {
	return (
		<form>
			<Field>
				<Label>Text example</Label> <Input />
			</Field>
			<Field>
				<Label>Textarea example</Label> <Textarea />
			</Field>
			<Field>
				<Label>
					<Radio name="radio" value="radio" /> Radio example
				</Label>
			</Field>
			<Field render={<Label />}>
				<Checkbox /> Checkbox example
			</Field>
			<Field>
				<Label>
					<Switch /> Switch example
				</Label>
			</Field>
		</form>
	);
}
