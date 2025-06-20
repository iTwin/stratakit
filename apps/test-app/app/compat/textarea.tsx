/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Textarea } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Textarea" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			<Textarea placeholder="Textarea example"></Textarea>
			<Textarea placeholder="Disabled" disabled></Textarea>

			{/* Not implemented props */}
			<Textarea placeholder="Positive status" status="positive"></Textarea>
			<Textarea placeholder="Warning status" status="warning"></Textarea>
			<Textarea placeholder="Negative status" status="negative"></Textarea>
		</div>
	);
});
