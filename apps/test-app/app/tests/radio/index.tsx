/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage, type VariantProps } from "~/~utils.tsx";
import {
	Radio,
	Label,
	VisuallyHidden,
	Field,
} from "@itwin/itwinui-react/bricks";
import { useId } from "react";

export const handle = { title: "Radio" };

export default definePage(
	function Page({ disabled, defaultValue }) {
		return (
			<div style={{ display: "grid", gap: 8 }}>
				<Field>
					<Radio
						name="test"
						value="A"
						defaultChecked={defaultValue === "A"}
						disabled={!!disabled}
					/>
					<Label>A</Label>
				</Field>

				<Field>
					<Radio
						name="test"
						value="B"
						defaultChecked={defaultValue === "B"}
						disabled={!!disabled}
					/>
					<Label>B</Label>
				</Field>
			</div>
		);
	},
	{ visual: VisualTest },
);

function VisualTest({ checked, disabled }: VariantProps) {
	const id = useId();

	return (
		<>
			<Radio
				name="test"
				value="A"
				id={id}
				defaultChecked={!!checked}
				disabled={!!disabled}
			/>
			<VisuallyHidden render={<Label htmlFor={id} />}>Toggle me</VisuallyHidden>
		</>
	);
}
