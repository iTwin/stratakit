/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Label } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Label" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<Label>Label</Label>
			<Label htmlFor="control">Label (associated with a control)</Label>
			<input id="control" />
		</div>
	);
});
