/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Anchor } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Anchor" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<Anchor href="https://example.com">Example</Anchor>
			<Anchor href="https://example.com" isExternal target="_blank">
				External
			</Anchor>
			<Anchor as="button">Example (as button)</Anchor>
		</div>
	);
});
