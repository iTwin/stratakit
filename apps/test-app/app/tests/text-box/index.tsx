/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Field, Label, TextBox } from "@stratakit/bricks";
import { definePage } from "~/~utils.tsx";

import type { VariantProps } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export const handle = { title: "TextBox" };

function TextAffix({ children }: React.PropsWithChildren) {
	return (
		<TextBox.Text
			style={{ color: "var(--stratakit-color-text-neutral-tertiary)" }}
		>
			{children}
		</TextBox.Text>
	);
}

export default definePage(
	function Page({ disabled, defaultValue }) {
		return (
			<Field.Root>
				<Field.Label>Fruit</Field.Label>
				<Field.Control
					render={
						<TextBox.Input disabled={!!disabled} defaultValue={defaultValue} />
					}
				/>
			</Field.Root>
		);
	},
	{
		textarea: Textarea,
		composition: CompositionTest,
		visual: VisualTest,
	},
);

function Textarea({ disabled }: VariantProps) {
	return (
		<Field.Root>
			<Field.Label>Fruit</Field.Label>
			<Field.Control
				render={<TextBox.Textarea rows={3} disabled={!!disabled} />}
			/>
		</Field.Root>
	);
}

function CompositionTest({ disabled, defaultValue }: VariantProps) {
	const id = React.useId();

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
			<TextBox.Input placeholder="Placeholder" />
			<TextBox.Input defaultValue="Value" />
			<TextBox.Textarea defaultValue="Value" />
			<TextBox.Input disabled defaultValue="Disabled value" />
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
			<TextBox.Root>
				<TextBox.Icon href={placeholderIcon} />
				<TextAffix>%</TextAffix>
				<TextBox.Input disabled defaultValue="Disabled value" />
				<TextAffix>%</TextAffix>
				<TextBox.Icon href={placeholderIcon} />
			</TextBox.Root>
		</div>
	);
}
