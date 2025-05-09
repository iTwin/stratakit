/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { ToggleSwitch } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "ToggleSwitch" };

export default definePage(function Page() {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<ToggleSwitch />
			<ToggleSwitch checked />
			<ToggleSwitch defaultChecked />
			<ToggleSwitch disabled />
			<ToggleSwitch defaultChecked disabled />

			<br />

			<ToggleSwitch label="Option" size="small" />
			<ToggleSwitch label="Option" labelPosition="left" />
			<ToggleSwitch label={<div>Option</div>} />
			<ToggleSwitch label={<div>Option</div>} labelPosition="left" />
		</div>
	);
});
