/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage, type VariantProps } from "~/~utils.tsx";
import {
	Checkbox,
	Field,
	TextBox,
	Label,
	Radio,
	Switch,
	Description,
} from "@itwin/itwinui-react/bricks";

export const handle = { title: "Field" };

const controls: Record<string, React.ElementType> = {
	checkbox: Checkbox,
	input: TextBox.Input,
	radio: Radio,
	switch: Switch,
	textarea: TextBox.Textarea,
};

export default definePage(
	function Page({
		control = "input",
		asLabel,
		layout,
		labelPlacement = "before",
		descriptions,
		controlId,
	}) {
		const Control = controls[control];
		const ControlLabel = asLabel ? "span" : Label;

		return (
			<form style={{ display: "grid", gap: 32, justifyContent: "start" }}>
				<Field
					layout={layout as "inline" | undefined}
					render={asLabel ? <Label /> : undefined}
				>
					{labelPlacement === "before" ? (
						<ControlLabel>{control} example</ControlLabel>
					) : null}
					<Control id={controlId} />
					{labelPlacement === "after" ? (
						<ControlLabel>{control} example</ControlLabel>
					) : null}
					{descriptions
						?.split(";")
						.map((description) => (
							<Description key={description}>{description}</Description>
						)) || null}
				</Field>
			</form>
		);
	},
	{ visual: VisualTest },
);

function VisualTest({ controlType }: VariantProps) {
	if (controlType === "text") {
		return <VisualTestForTextControls />;
	}

	if (controlType === "checkable") {
		return <VisualTestForCheckableControls />;
	}
}

function VisualTestForTextControls() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			{/* Default layout for text controls (block) */}
			<Field>
				<Label>Text control</Label>
				<TextBox.Input />
				<Description>Text description</Description>
			</Field>

			{/* Default layout for text controls (block) with wrapper rendered as a `<Label>` */}
			<Field render={<Label />}>
				<span>Textarea control</span>
				<TextBox.Textarea />
			</Field>

			{/* Inline layout for text controls */}
			<Field layout="inline">
				<Label>Text control</Label>
				<TextBox.Input />
				<Description>Text description</Description>
			</Field>

			{/* Inline layout for text controls with wrapper rendered as a `<Label>` */}
			<Field render={<Label />} layout="inline">
				<span>Textarea control</span>
				<TextBox.Textarea />
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
				<Description>Checkbox description</Description>
			</Field>
			<Field>
				<Label>Radio control</Label>
				<Radio value="A" />
				<Description>Radio description</Description>
			</Field>
			<Field>
				<Label>Switch control</Label>
				<Switch />
				<Description>Switch description</Description>
			</Field>

			{/* Label after control */}
			<Field>
				<Checkbox />
				<Label>Checkbox control</Label>
				<Description>Checkbox description</Description>
			</Field>
			<Field>
				<Radio value="A" />
				<Label>Radio control</Label>
				<Description>Radio description</Description>
			</Field>
			<Field>
				<Switch />
				<Label>Switch control</Label>
				<Description>Switch description</Description>
			</Field>

			{/* Field rendering as label, text before control */}
			<Field render={<Label />}>
				<span>Checkbox control</span>
				<Checkbox />
			</Field>
			<Field render={<Label />}>
				<span>Radio control</span>
				<Radio value="A" />
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
				<Radio value="A" />
				<span>Radio control</span>
			</Field>
			<Field render={<Label />}>
				<Switch />
				<span>Switch control</span>
			</Field>
		</div>
	);
}
