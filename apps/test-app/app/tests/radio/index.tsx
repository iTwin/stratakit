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
import * as React from "react";

export const handle = { title: "Radio" };

export default definePage(
	function Page({ disabled, defaultValue }) {
		return (
			<div style={{ display: "grid", gap: 8 }}>
				<Field.Root>
					<Field.Control
						render={
							<Radio
								name="test"
								value="A"
								defaultChecked={defaultValue === "A"}
								disabled={!!disabled}
							/>
						}
					/>
					<Field.Label>A</Field.Label>
				</Field.Root>

				<Field.Root>
					<Field.Control
						render={
							<Radio
								name="test"
								value="B"
								defaultChecked={defaultValue === "B"}
								disabled={!!disabled}
							/>
						}
					/>
					<Field.Label>B</Field.Label>
				</Field.Root>
			</div>
		);
	},
	{ visual: VisualTest },
);

function VisualTest({ checked, disabled }: VariantProps) {
	const id = React.useId();

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
