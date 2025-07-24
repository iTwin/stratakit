/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Divider } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Divider" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			<div style={{ display: "grid", gap: 4 }}>
				<div>Content</div>
				<Divider />
				<div>Content</div>
				<Divider />
				<div>Content</div>
			</div>

			<div style={{ display: "flex", gap: 16 }}>
				<div>Content</div>
				<Divider orientation="vertical" />
				<div>Content</div>
				<Divider orientation="vertical" />
				<div>Content</div>
			</div>
		</div>
	);
});
