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
				<Alert key={type ?? "undefined"} type={type}>
					{type} Alert
				</Alert>
			))}

			{/* Deprecated but supported props */}
			<Alert
				clickableText="Learn more"
				clickableTextProps={{ className: "clickable-text" }}
				onClose={() => {
					console.log("onClose clicked");
				}}
			>
				Alert with deprecated props
			</Alert>

			{/* Not implemented props */}
			<Alert isSticky>Alert with not implemented props</Alert>
		</div>
	);
});
