/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Kbd, KbdKeys } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Anchor" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 4, justifyItems: "start" }}>
			<Kbd>A</Kbd>
			<Kbd>{KbdKeys.Enter}</Kbd>
			<p>
				Press <Kbd>{KbdKeys.Command}</Kbd> + <Kbd>K</Kbd> to search.
			</p>
		</div>
	);
});
