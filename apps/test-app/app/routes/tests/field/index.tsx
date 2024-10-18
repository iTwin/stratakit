/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
	Checkbox,
	Field,
	Icon,
	Input,
	Label,
	Radio,
	Switch,
	TextField,
	Textarea,
} from "@itwin/kiwi-react/bricks";

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;

export default function Page() {
	return (
		<form>
			<Field>
				<Label>Text example</Label> <Input />
			</Field>
			<Field>
				<Label>TextField example</Label>
				<TextField>
					<Icon href={placeholderIcon} />
					<Input />
				</TextField>
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
