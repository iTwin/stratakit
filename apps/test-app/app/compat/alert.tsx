/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Alert } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Alert" };

export default definePage(function Page() {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			{(
				[undefined, "positive", "warning", "negative", "informational"] as const
			).map((type) => (
				<Alert
					key={type}
					type={type}
					clickableText="Learn more"
					clickableTextProps={{ onClick: () => console.log("Clicked!") }}
					onClose={() => {}}
				>
					{type} Alert
				</Alert>
			))}

			{/* Not implemented props */}
			<Alert isSticky>Alert</Alert>
		</div>
	);
});
