/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Tag } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Tag" };

export default definePage(function Page() {
	return (
		<div style={{ display: "flex", gap: 4 }}>
			<Tag>Simple tag</Tag>
			<Tag variant="basic">Basic tag</Tag>
			<Tag onClick={(e) => console.log("onClick", e)}>With onClick</Tag>
			<Tag onRemove={(e) => console.log("onRemove", e)}>With onRemove</Tag>
			<Tag
				onClick={(e) => console.log("onClick", e)}
				labelProps={{
					className: "my-label",
				}}
				onRemove={(e) => console.log("onRemove", e)}
				removeButtonProps={{ className: "my-dismiss" }}
			>
				With onClick and onRemove
			</Tag>
		</div>
	);
});
