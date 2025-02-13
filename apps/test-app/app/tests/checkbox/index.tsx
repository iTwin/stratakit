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

export default definePage(
	function Page({ checked, indeterminate, disabled }) {
		return (
			<Field.Root>
				<Checkbox
					defaultChecked={indeterminate ? "mixed" : !!checked}
					disabled={!!disabled}
				/>
				<Label>Toggle me</Label>
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
