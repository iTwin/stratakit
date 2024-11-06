/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
	Checkbox,
	Field,
	TextInput,
	Label,
	Radio,
	Switch,
	Textarea,
} from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";

export const handle = { title: "Field" };

const controls: Record<string, React.ElementType> = {
	checkbox: Checkbox,
	input: TextInput.Input,
	radio: Radio,
	switch: Switch,
	textarea: Textarea,
};

export default function Page() {
	const [searchParams] = useSearchParams();
	const visual = searchParams.has("visual", "");
	const controlName = searchParams.get("control") ?? "input";
	const asLabel = searchParams.has("asLabel", "");
	const layout = searchParams.has("layout", "inline") ? "inline" : undefined;
	const labelPlacement = searchParams.get("labelPlacement") ?? "before";

	const Control = controls[controlName];
	const ControlLabel = asLabel ? "span" : Label;

	if (visual) return <VisualTest />;

	return (
		<form style={{ display: "grid", gap: 32, justifyContent: "start" }}>
			<Field layout={layout} render={asLabel ? <Label /> : undefined}>
				{labelPlacement === "before" ? (
					<ControlLabel>{controlName} example</ControlLabel>
				) : null}
				<Control />
				{labelPlacement === "after" ? (
					<ControlLabel>{controlName} example</ControlLabel>
				) : null}
			</Field>
		</form>
	);
}

function VisualTest() {
	const [searchParams] = useSearchParams();

	if (searchParams.has("controlType", "text")) {
		return <VisualTestForTextControls />;
	}

	if (searchParams.has("controlType", "checkable")) {
		return <VisualTestForCheckableControls />;
	}
}

function VisualTestForTextControls() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			{/* Default layout for text controls (block) */}
			<Field>
				<Label>Text control</Label>
				<TextInput.Input />
			</Field>

			{/* Default layout for text controls (block) with wrapper rendered as a `<Label>` */}
			<Field render={<Label />}>
				<span>Textarea control</span>
				<Textarea />
			</Field>

			{/* Inline layout for text controls */}
			<Field layout="inline">
				<Label>Text control</Label>
				<TextInput.Input />
			</Field>

			{/* Inline layout for text controls with wrapper rendered as a `<Label>` */}
			<Field render={<Label />} layout="inline">
				<span>Textarea control</span>
				<Textarea />
			</Field>
		</div>
	);
}

function VisualTestForCheckableControls() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			{/* Label before control */}
			<Field>
				<Label>Checkbox control</Label>
				<Checkbox />
			</Field>
			<Field>
				<Label>Radio control</Label>
				<Radio />
			</Field>
			<Field>
				<Label>Switch control</Label>
				<Switch />
			</Field>

			{/* Label after control */}
			<Field>
				<Checkbox />
				<Label>Checkbox control</Label>
			</Field>
			<Field>
				<Radio />
				<Label>Radio control</Label>
			</Field>
			<Field>
				<Switch />
				<Label>Switch control</Label>
			</Field>

			{/* Field rendering as label, text before control */}
			<Field render={<Label />}>
				<span>Checkbox control</span>
				<Checkbox />
			</Field>
			<Field render={<Label />}>
				<span>Radio control</span>
				<Radio />
			</Field>
			<Field render={<Label />}>
				<span>Switch control</span>
				<Switch />
			</Field>

			{/* Field rendering as label, text after control */}
			<Field render={<Label />}>
				<Checkbox />
				<span>Checkbox control</span>
			</Field>
			<Field render={<Label />}>
				<Radio />
				<span>Radio control</span>
			</Field>
			<Field render={<Label />}>
				<Switch />
				<span>Switch control</span>
			</Field>
		</div>
	);
}
