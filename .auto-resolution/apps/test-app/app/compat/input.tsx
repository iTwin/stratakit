/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Input } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Input" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<Input />
		</div>
	);
});
