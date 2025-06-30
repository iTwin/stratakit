/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { StatusMessage } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export const handle = { title: "StatusMessage" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			<StatusMessage>Message</StatusMessage>
			<StatusMessage as="span">Message (as span)</StatusMessage>

			{/* Partially implemented props (color mismatch and missing status icon) */}
			<StatusMessage status="positive">Positive status</StatusMessage>
			<StatusMessage status="warning">Warning status</StatusMessage>
			<StatusMessage status="negative">Negative status</StatusMessage>

			{/* Not implemented props */}
			<StatusMessage
				contentProps={{ style: { outline: "1px solid DeepPink" } }}
			>
				Message with contentProps
			</StatusMessage>
			<StatusMessage
				startIcon={
					<svg>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				}
			>
				Message with icon
			</StatusMessage>
			<StatusMessage
				startIcon={
					<svg>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				}
				iconProps={{ style: { outline: "1px solid DeepPink" } }}
			>
				Message with iconProps
			</StatusMessage>
			<StatusMessage status="positive" startIcon={null}>
				Positive status without icon
			</StatusMessage>
		</div>
	);
});
