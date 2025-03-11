/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage, type VariantProps } from "~/~utils.tsx";
import {
	Checkbox,
	Field,
	TextBox,
	Radio,
	Switch,
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
		const ControlLabel = asLabel ? "span" : Field.Label;

		return (
			<form style={{ display: "grid", gap: 32, justifyContent: "start" }}>
				<Field.Root
					layout={layout as "inline" | undefined}
					render={asLabel ? <Field.Label /> : undefined}
				>
					{labelPlacement === "before" ? (
						<ControlLabel>{control} example</ControlLabel>
					) : null}
					<Field.Control render={<Control />} />
					{labelPlacement === "after" ? (
						<ControlLabel>{control} example</ControlLabel>
					) : null}
					{descriptions?.split(";").map((description) => (
						<Field.Description key={description}>
							{description}
						</Field.Description>
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
				<Field.Label>Text control</Field.Label>
				<Field.Control render={<TextBox.Input />} />
				<Field.Description>Text description</Field.Description>
			</Field.Root>

			{/* Default layout for text controls (block) with wrapper rendered as a `<Field.Label>` */}
			<Field.Root render={<Field.Label />}>
				<span>Textarea control</span>
				<Field.Control render={<TextBox.Textarea />} />
			</Field.Root>

			{/* Inline layout for text controls */}
			<Field.Root layout="inline">
				<Field.Label>Text control</Field.Label>
				<Field.Control render={<TextBox.Input />} />
				<Field.Description>Text description</Field.Description>
			</Field.Root>

			{/* Inline layout for text controls with wrapper rendered as a `<Field.Label>` */}
			<Field.Root render={<Field.Label />} layout="inline">
				<span>Textarea control</span>
				<Field.Control render={<TextBox.Textarea />} />
			</Field.Root>
		</div>
	);
}

function VisualTestForCheckableControls() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			{/* Label before control */}
			<Field.Root>
				<Field.Label>Checkbox control</Field.Label>
				<Field.Control render={<Checkbox />} />
				<Field.Description>Checkbox description</Field.Description>
			</Field.Root>
			<Field.Root>
				<Field.Label>Radio control</Field.Label>
				<Field.Control render={<Radio value="A" />} />
				<Field.Description>Radio description</Field.Description>
			</Field.Root>
			<Field.Root>
				<Field.Label>Switch control</Field.Label>
				<Field.Control render={<Switch />} />
				<Field.Description>Switch description</Field.Description>
			</Field.Root>

			{/* Label after control */}
			<Field.Root>
				<Field.Control render={<Checkbox />} />
				<Field.Label>Checkbox control</Field.Label>
				<Field.Description>Checkbox description</Field.Description>
			</Field.Root>
			<Field.Root>
				<Field.Control render={<Radio value="A" />} />
				<Field.Label>Radio control</Field.Label>
				<Field.Description>Radio description</Field.Description>
			</Field.Root>
			<Field.Root>
				<Field.Control render={<Switch />} />
				<Field.Label>Switch control</Field.Label>
				<Field.Description>Switch description</Field.Description>
			</Field.Root>

			{/* Field rendering as label, text before control */}
			<Field.Root render={<Field.Label />}>
				<span>Checkbox control</span>
				<Field.Control render={<Checkbox />} />
			</Field.Root>
			<Field.Root render={<Field.Label />}>
				<span>Radio control</span>
				<Field.Control render={<Radio value="A" />} />
			</Field.Root>
			<Field.Root render={<Field.Label />}>
				<span>Switch control</span>
				<Field.Control render={<Switch />} />
			</Field.Root>

			{/* Field rendering as label, text after control */}
			<Field.Root render={<Field.Label />}>
				<Field.Control render={<Checkbox />} />
				<span>Checkbox control</span>
			</Field.Root>
			<Field.Root render={<Field.Label />}>
				<Field.Control render={<Radio value="A" />} />
				<span>Radio control</span>
			</Field.Root>
			<Field.Root render={<Field.Label />}>
				<Field.Control render={<Switch />} />
				<span>Switch control</span>
			</Field.Root>
		</div>
	);
}

function CustomAriaDescribedByTest() {
	return (
		<Field.Root>
			<Field.Label>Example</Field.Label>
			<Field.Control
				render={<TextBox.Input aria-describedby="custom-description" />}
			/>
			<div id="custom-description">Custom description.</div>
		</Field.Root>
	);
}

function CustomDescriptionIdsTest() {
	return (
		<Field.Root>
			<Field.Label>Example</Field.Label>
			<Field.Control render={<TextBox.Input />} />
			<Field.Description id="a">Supporting text.</Field.Description>
			<Field.Description id="b">More supporting text.</Field.Description>
		</Field.Root>
	);
}

function CustomControlIdTest() {
	return (
		<Field.Root>
			<Field.Label>Example</Field.Label>
			<Field.Control id="custom" render={<TextBox.Input />} />
		</Field.Root>
	);
}
