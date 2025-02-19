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

const variants = ["solid", "outline"] as const;

export default definePage(
	function Page({ disabled, defaultValue, variant = "solid" }) {
		return (
			<div style={{ display: "grid", gap: 8 }}>
				<Field>
					<Radio
						name="test"
						value="A"
						defaultChecked={defaultValue === "A"}
						disabled={!!disabled}
						variant={variant as (typeof variants)[number]}
					/>
					<Label>A</Label>
				</Field>

				<Field>
					<Radio
						name="test"
						value="B"
						defaultChecked={defaultValue === "B"}
						disabled={!!disabled}
						variant={variant as (typeof variants)[number]}
					/>
					<Label>B</Label>
				</Field>
			</div>
		);
	},
	{ visual: VisualTest },
);

function VisualTest({ checked, disabled }: VariantProps) {
	const id = React.useId();

	return (
		<div style={{ display: "flex", gap: 4, flexDirection: "column" }}>
			{variants.map((variant) => (
				<div key={variant}>
					<Radio
						name="test"
						value="A"
						id={id}
						defaultChecked={!!checked}
						disabled={!!disabled}
						variant={variant}
					/>
					<VisuallyHidden render={<Label htmlFor={id} />}>
						Toggle me
					</VisuallyHidden>
				</div>
			))}
		</div>
	);
}
