/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage, type VariantProps } from "~/~utils.tsx";
import {
	Switch,
	Label,
	VisuallyHidden,
	Field,
} from "@itwin/itwinui-react/bricks";
import * as React from "react";

export const demoVariants = {
	Default: "",
	Visual: "?visual",
	Checked: "?checked",
	Disabled: "?disabled",
	VisualChecked: "?visual&checked",
	VisualDisabled: "?visual&disabled",
	VisualDisabledChecked: "?visual&disabled&checked",
};

export const handle = { title: "Switch" };

export default definePage(
	function Page({ checked, disabled }) {
		return (
			<Field>
				<Switch defaultChecked={!!checked} disabled={!!disabled} />
				<Label>Toggle me</Label>
			</Field>
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
