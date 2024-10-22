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
import { useSearchParams } from "@remix-run/react";

export default function Page() {
	const visual = useSearchParams()[0].get("visual") === "true";

	if (visual) {
		return <VisualTest />;
	}

	return (
		<form style={{ display: "grid", gap: 4, justifyContent: "start" }}>
			<Field>
				<Label>Text example</Label>
				<Input />
			</Field>
			<Field labelPlacement="inline">
				<Label>Textarea example (label inline)</Label>
				<Textarea />
			</Field>
			<Field render={<Label />}>
				<Radio name="radio" value="radio" />
				<span>Radio example</span>
			</Field>
			<Field render={<Label />}>
				<Checkbox />
				<span>Checkbox example</span>
			</Field>
			<Field render={<Label />}>
				<Switch />
				<span>Switch example</span>
			</Field>
		</form>
	);
}

function VisualTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			{/* Labels before */}
			<Field>
				<Label>Text control</Label>
				<Input />
			</Field>
			<Field>
				<Label>Textarea control</Label>
				<Textarea />
			</Field>
			<Field labelPlacement="inline">
				<Label>Text control</Label>
				<Input />
			</Field>
			<Field labelPlacement="inline">
				<Label>Textarea control</Label>
				<Textarea />
			</Field>
			<Field>
				<Label>Checkbox control</Label>
				<Checkbox />
			</Field>
			<Field>
				<Label>Radio control</Label>
				<Radio value="radio" />
			</Field>
			<Field>
				<Label>Switch control</Label>
				<Switch />
			</Field>

			{/* Labels after */}
			<Field>
				<Checkbox />
				<Label>Checkbox control</Label>
			</Field>
			<Field>
				<Radio value="radio" />
				<Label>Radio control</Label>
			</Field>
			<Field>
				<Switch />
				<Label>Switch control</Label>
			</Field>

			{/* Field rendering as label, text before */}
			<Field render={<Label />}>
				<span>Text control</span>
				<Input />
			</Field>
			<Field render={<Label />}>
				<span>Textarea control</span>
				<Textarea />
			</Field>
			<Field render={<Label />}>
				<span>Checkbox control</span>
				<Checkbox />
			</Field>
			<Field render={<Label />}>
				<span>Radio control</span>
				<Radio value="radio" />
			</Field>
			<Field render={<Label />}>
				<span>Switch control</span>
				<Switch />
			</Field>

			{/* Field rendering as label, text after */}
			<Field render={<Label />}>
				<Checkbox />
				<span>Checkbox control</span>
			</Field>
			<Field render={<Label />}>
				<Radio value="radio" />
				<span>Radio control</span>
			</Field>
			<Field render={<Label />}>
				<Switch />
				<span>Switch control</span>
			</Field>
		</div>
	);
}
