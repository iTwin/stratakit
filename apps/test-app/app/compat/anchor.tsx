/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Anchor } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Anchor" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 4, justifyItems: "flex-start" }}>
			<Anchor href="https://example.com">Example</Anchor>
			<Anchor as="button">Example (as button)</Anchor>
			<Anchor href="https://example.com" target="_blank" isExternal>
				External
			</Anchor>
		</div>
	);
});
