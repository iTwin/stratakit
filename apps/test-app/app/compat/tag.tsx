/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Tag } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Text" };

export default definePage(function Page() {
	return (
		<div style={{ display: "flex", gap: 4 }}>
			<Tag>Simple tag</Tag>
			<Tag onClick={(e) => console.log(e)}>Tag with onClick</Tag>
			<Tag onRemove={(e) => console.log(e)}>Tag with onRemove</Tag>
			<Tag>
				<span>React.Node tag</span>
			</Tag>
		</div>
	);
});
