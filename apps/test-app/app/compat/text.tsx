/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Text } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Text" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<Text variant="headline">This is a headline</Text>
			<Text variant="title">This is a title</Text>
			<Text variant="subheading">This is a subheading</Text>
			<Text variant="leading">This is a leading</Text>
			<Text>This is a body</Text>
			<Text variant="small">This is a small text</Text>
		</div>
	);
});
