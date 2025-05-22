/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { ProgressRadial } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Tooltip" };

export default definePage(function Page() {
	return (
		<div style={{ padding: "1rem" }}>
			<div style={{ display: "flex", gap: 4, alignItems: "center" }}>
				{(["x-small", "small", "", undefined, "large"] as const).map((size) => (
					<ProgressRadial key={size} size={size} />
				))}
			</div>

			<br />

			{/* No-op props */}
			<ProgressRadial indeterminate={false} />

			<br style={{ margin: "20px 0" }} />

			{/* Not implemented props */}
			<div style={{ display: "flex", gap: 4, alignItems: "center" }}>
				<ProgressRadial value={50} />
				<ProgressRadial>50</ProgressRadial>
				<ProgressRadial indeterminate />
				<ProgressRadial status={"positive"} value={50} />
			</div>
		</div>
	);
});
