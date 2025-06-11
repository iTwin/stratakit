/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { StatusMessage } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "StatusMessage" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			<StatusMessage>Message</StatusMessage>
			<StatusMessage as="span">Message (as span)</StatusMessage>
			<StatusMessage
				as="span"
				contentProps={{ style: { outline: "1px solid DeepPink" } }}
			>
				Message with contentProps
			</StatusMessage>

			{/* Not implemented props */}
			<StatusMessage status="positive">Message with status</StatusMessage>
			<StatusMessage status="positive" startIcon={null}>
				Message with status and without status icon
			</StatusMessage>
		</div>
	);
});
