/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
	Field,
	Label,
	Switch,
	VisuallyHidden,
} from "@itwin/itwinui-react/bricks";
import * as React from "react";
import { definePage } from "~/~utils.tsx";

import type { VariantProps } from "~/~utils.tsx";

export const handle = { title: "Switch" };

export default definePage(
	function Page({ checked, disabled }) {
		return (
			<Field.Root>
				<Field.Control
					render={<Switch defaultChecked={!!checked} disabled={!!disabled} />}
				/>
				<Field.Label>Toggle me</Field.Label>
			</Field.Root>
		);
	},
	{ visual: VisualTest },
);

function VisualTest({ checked, disabled }: VariantProps) {
	const id = React.useId();

	return (
		<>
			<Switch defaultChecked={!!checked} disabled={!!disabled} id={id} />
			<VisuallyHidden render={<Label htmlFor={id} />}>Toggle me</VisuallyHidden>
		</>
	);
}
