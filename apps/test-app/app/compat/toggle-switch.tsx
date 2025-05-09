/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { ToggleSwitch } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Switch" };

export default definePage(function Page() {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<ToggleSwitch />
			<ToggleSwitch defaultChecked />
			<ToggleSwitch disabled />
			<ToggleSwitch defaultChecked disabled />

			<br />

			<ToggleSwitch label="HELLO" />
			<ToggleSwitch label="HELLO" labelPosition="left" />
			<ToggleSwitch label={<div>HELLO</div>} />
			<ToggleSwitch label={<div>HELLO</div>} labelPosition="left" />
		</div>
	);
});
