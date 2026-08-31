/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button, Tooltip, VisuallyHidden } from "@stratakit/bricks";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Tooltip" };

export default definePage(function Page({ "multi-line": multiLine, type }) {
	const testContent = multiLine
		? "This is the tooltip. Long words such as antidisestablishmentarianism and pneumonoultramicroscopicsilicovolcanoconiosis should wrap across multiple lines."
		: "This is the tooltip";

	return (
		<div style={{ minHeight: 150 }}>
			<Tooltip
				content={testContent}
				type={type as "description" | "label" | "none" | undefined}
			>
				<Button>Hover/focus me</Button>
			</Tooltip>

			<VisuallyHidden tabIndex={0}>Tab stop for focus</VisuallyHidden>
		</div>
	);
});
