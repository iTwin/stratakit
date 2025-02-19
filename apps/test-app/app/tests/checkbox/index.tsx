/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage, type VariantProps } from "~/~utils.tsx";
import {
	Checkbox,
	Field,
	Label,
	VisuallyHidden,
} from "@itwin/itwinui-react/bricks";
import * as React from "react";

export const handle = { title: "Checkbox" };

const variants = ["solid", "outline"] as const;

export default definePage(
	function Page({ checked, indeterminate, disabled, variant = "solid" }) {
		return (
			<Field>
				<Checkbox
					defaultChecked={indeterminate ? "mixed" : !!checked}
					disabled={!!disabled}
					variant={variant as (typeof variants)[number]}
				/>
				<Label>Toggle me</Label>
			</Field>
		);
	},
	{ visual: VisualTest },
);

function VisualTest({ checked, indeterminate, disabled }: VariantProps) {
	const id = React.useId();

	return (
		<div style={{ display: "flex", gap: 4, flexDirection: "column" }}>
			{variants.map((variant) => (
				<div key={variant}>
					<Checkbox
						id={id}
						defaultChecked={indeterminate ? "mixed" : !!checked}
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
