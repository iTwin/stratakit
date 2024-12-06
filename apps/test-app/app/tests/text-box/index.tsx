/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage, type VariantProps } from "~/~utils.tsx";
import { TextBox, Label, Field } from "@itwin/kiwi-react/bricks";
import { useId } from "react";
import placeholderIcon from "@itwin/kiwi-icons/placeholder.svg";

export const handle = { title: "TextBox" };

function TextAffix({ children }: React.PropsWithChildren) {
	return (
		<TextBox.Text style={{ color: "var(--kiwi-color-text-neutral-tertiary)" }}>
			{children}
		</TextBox.Text>
	);
}

export default definePage(
	function Page({ disabled, defaultValue }) {
		return (
			<Field>
				<Label>Fruit</Label>
				<TextBox.Input disabled={!!disabled} defaultValue={defaultValue} />
			</Field>
		);
	},
	{
		composition: CompositionTest,
		visual: VisualTest,
	},
);

function CompositionTest({ disabled, defaultValue }: VariantProps) {
	const id = useId();

	return (
		<div style={{ display: "flex", gap: 4, alignItems: "center" }}>
			<Label htmlFor={id}>Fruit</Label>
			<TextBox.Root>
				<TextBox.Input
					id={id}
					disabled={!!disabled}
					defaultValue={defaultValue}
				/>
				<TextBox.Icon href={placeholderIcon} />
			</TextBox.Root>
		</div>
	);
}

function VisualTest() {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<TextBox.Input defaultValue="Value" />
			<TextBox.Root>
				<TextBox.Input defaultValue="Value" />
			</TextBox.Root>
			<TextBox.Root>
				<TextBox.Icon href={placeholderIcon} />
				<TextBox.Input defaultValue="Value" />
			</TextBox.Root>
			<TextBox.Root>
				<TextBox.Input defaultValue="Value" />
				<TextBox.Icon href={placeholderIcon} />
			</TextBox.Root>
			<TextBox.Root>
				<TextBox.Icon href={placeholderIcon} />
				<TextBox.Input defaultValue="Value" />
				<TextBox.Icon href={placeholderIcon} />
			</TextBox.Root>
			<TextBox.Root>
				<TextBox.Icon href={placeholderIcon} />
				<TextAffix>%</TextAffix>
				<TextBox.Input defaultValue="Value" />
				<TextAffix>%</TextAffix>
				<TextBox.Icon href={placeholderIcon} />
			</TextBox.Root>
		</div>
	);
}
