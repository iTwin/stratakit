/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
	Checkbox,
	Field,
	Label,
	VisuallyHidden,
} from "@itwin/itwinui-react/bricks";
import * as React from "react";
import { definePage } from "~/~utils.tsx";

import type { VariantProps } from "~/~utils.tsx";

export const handle = { title: "Checkbox" };

export default definePage(
	function Page({ checked, indeterminate, disabled }) {
		return (
			<Field.Root>
				<Field.Control
					render={
						<Checkbox
							defaultChecked={indeterminate ? "mixed" : !!checked}
							disabled={!!disabled}
						/>
					}
				/>
				<Field.Label>Toggle me</Field.Label>
			</Field.Root>
		);
	},
	{ visual: VisualTest },
);

function VisualTest({ checked, indeterminate, disabled }: VariantProps) {
	const id = React.useId();

	return (
		<>
			<Checkbox
				id={id}
				defaultChecked={indeterminate ? "mixed" : !!checked}
				disabled={!!disabled}
			/>
			<VisuallyHidden render={<Label htmlFor={id} />}>Toggle me</VisuallyHidden>
		</>
	);
}
