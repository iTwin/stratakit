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
	}) {
		const Control = controls[control];
		const ControlLabel = asLabel ? "span" : Label;

		return (
			<form style={{ display: "grid", gap: 32, justifyContent: "start" }}>
				<Field.Root
					layout={layout as "inline" | undefined}
					render={asLabel ? <Label /> : undefined}
				>
					{labelPlacement === "before" ? (
						<ControlLabel>{control} example</ControlLabel>
					) : null}
					<Control />
					{labelPlacement === "after" ? (
						<ControlLabel>{control} example</ControlLabel>
					) : null}
					{descriptions?.split(";").map((description) => (
						<Description key={description}>{description}</Description>
					))}
				</Field.Root>
			</form>
		);
	},
	{
		visual: VisualTest,
		customAriaDescribedBy: CustomAriaDescribedByTest,
		customControlId: CustomControlIdTest,
		customDescriptionIds: CustomDescriptionIdsTest,
	},
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
			<Field.Root>
				<Label>Text control</Label>
				<TextBox.Input />
				<Description>Text description</Description>
			</Field.Root>

			{/* Default layout for text controls (block) with wrapper rendered as a `<Label>` */}
			<Field.Root render={<Label />}>
				<span>Textarea control</span>
				<TextBox.Textarea />
			</Field.Root>

			{/* Inline layout for text controls */}
			<Field.Root layout="inline">
				<Label>Text control</Label>
				<TextBox.Input />
				<Description>Text description</Description>
			</Field.Root>

			{/* Inline layout for text controls with wrapper rendered as a `<Label>` */}
			<Field.Root render={<Label />} layout="inline">
				<span>Textarea control</span>
				<TextBox.Textarea />
			</Field.Root>
		</div>
	);
}

function VisualTestForCheckableControls() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			{/* Label before control */}
			<Field.Root>
				<Label>Checkbox control</Label>
				<Checkbox />
				<Description>Checkbox description</Description>
			</Field.Root>
			<Field.Root>
				<Label>Radio control</Label>
				<Radio value="A" />
				<Description>Radio description</Description>
			</Field.Root>
			<Field.Root>
				<Label>Switch control</Label>
				<Switch />
				<Description>Switch description</Description>
			</Field.Root>

			{/* Label after control */}
			<Field.Root>
				<Checkbox />
				<Label>Checkbox control</Label>
				<Description>Checkbox description</Description>
			</Field.Root>
			<Field.Root>
				<Radio value="A" />
				<Label>Radio control</Label>
				<Description>Radio description</Description>
			</Field.Root>
			<Field.Root>
				<Switch />
				<Label>Switch control</Label>
				<Description>Switch description</Description>
			</Field.Root>

			{/* Field rendering as label, text before control */}
			<Field.Root render={<Label />}>
				<span>Checkbox control</span>
				<Checkbox />
			</Field.Root>
			<Field.Root render={<Label />}>
				<span>Radio control</span>
				<Radio value="A" />
			</Field.Root>
			<Field.Root render={<Label />}>
				<span>Switch control</span>
				<Switch />
			</Field.Root>

			{/* Field rendering as label, text after control */}
			<Field.Root render={<Label />}>
				<Checkbox />
				<span>Checkbox control</span>
			</Field.Root>
			<Field.Root render={<Label />}>
				<Radio value="A" />
				<span>Radio control</span>
			</Field.Root>
			<Field.Root render={<Label />}>
				<Switch />
				<span>Switch control</span>
			</Field.Root>
		</div>
	);
}

function CustomAriaDescribedByTest() {
	return (
		<Field.Root>
			<Label>Example</Label>
			<TextBox.Input aria-describedby="custom-description" />
			<div id="custom-description">Custom description.</div>
		</Field.Root>
	);
}

function CustomDescriptionIdsTest() {
	return (
		<Field.Root>
			<Label>Example</Label>
			<TextBox.Input />
			<Description id="a">Supporting text.</Description>
			<Description id="b">More supporting text.</Description>
		</Field.Root>
	);
}

function CustomControlIdTest() {
	return (
		<Field.Root>
			<Label>Example</Label>
			<TextBox.Input id="custom" />
		</Field.Root>
	);
}
