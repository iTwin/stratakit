/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Icon } from "@stratakit/bricks";
import * as ListItem from "@stratakit/bricks-internal/src/~utils.ListItem.tsx";
import { definePage } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export const handle = { title: "List" };

export default definePage(function Page() {
	return (
		<div role="list" style={{ display: "grid", gap: 4 }}>
			<ListItem.Root>Apple</ListItem.Root>
			<ListItem.Root>Cherry</ListItem.Root>
			<ListItem.Root>
				<ListItem.Content>Kiwi</ListItem.Content>
				<ListItem.Content>A green fruit</ListItem.Content>
			</ListItem.Root>
			<ListItem.Root>
				<ListItem.Content>Mango</ListItem.Content>
				<ListItem.Content>A yellow fruit</ListItem.Content>
				<ListItem.Decoration render={<Icon href={placeholderIcon} />} />
			</ListItem.Root>
			<ListItem.Root>
				<ListItem.Decoration render={<Icon href={placeholderIcon} />} />
				<ListItem.Content>Papaya</ListItem.Content>
			</ListItem.Root>
			<ListItem.Root>
				<ListItem.Decoration render={<Icon href={placeholderIcon} />} />
				<ListItem.Content>Tomato</ListItem.Content>
				<ListItem.Content>A red fruit</ListItem.Content>
				<ListItem.Decoration render={<Icon href={placeholderIcon} />} />
			</ListItem.Root>
		</div>
	);
});
