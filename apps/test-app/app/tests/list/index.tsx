/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import * as ListItem from "@itwin/itwinui-react-internal/src/bricks/ListItem";
import { Icon } from "@itwin/itwinui-react/bricks";
import type { LinksFunction } from "react-router";
import testStyles from "./index.css?url";
import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";

export const handle = { title: "List" };

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: testStyles },
];

export default definePage(
	function Page({ "active-state": isActive = false }) {
		return (
			// biome-ignore lint/a11y/useSemanticElements: `div` is used as underlying element for `ListItem`
			<div
				role="list"
				style={{ display: "grid", gap: 4 }}
				className={isActive ? "force-state-active" : ""}
			>
				<ListItem.Root>Apple</ListItem.Root>
				<ListItem.Root>Cherry</ListItem.Root>
				<ListItem.Root>Kiwi</ListItem.Root>
				<ListItem.Root>
					<ListItem.Content>Mango</ListItem.Content>
					<Icon href={placeholderIcon} />
				</ListItem.Root>
				<ListItem.Root>
					<Icon href={placeholderIcon} />
					<ListItem.Content>Papaya</ListItem.Content>
				</ListItem.Root>
				<ListItem.Root>
					<Icon href={placeholderIcon} />
					<ListItem.Content>Tomato</ListItem.Content>
					<Icon href={placeholderIcon} />
				</ListItem.Root>
			</div>
		);
	},
	{
		description: DescriptionTest,
	},
);

function DescriptionTest() {
	return (
		// biome-ignore lint/a11y/useSemanticElements: `div` is used as underlying element for `ListItem`
		<div role="list" style={{ display: "grid", gap: 4 }}>
			<ListItem.Root>
				<ListItem.Content
					icon={<ListItem.Icon href={placeholderIcon} />}
					description={<ListItem.Description>Green fruit</ListItem.Description>}
				>
					<ListItem.Label>Kiwi</ListItem.Label>
				</ListItem.Content>
			</ListItem.Root>
			<ListItem.Root>
				<ListItem.Content
					description={<ListItem.Description>Green fruit</ListItem.Description>}
				>
					<ListItem.Label>Kiwi</ListItem.Label>
				</ListItem.Content>
			</ListItem.Root>
			<ListItem.Root>
				<ListItem.Content icon={<ListItem.Icon href={placeholderIcon} />}>
					<ListItem.Label>Kiwi</ListItem.Label>
				</ListItem.Content>
			</ListItem.Root>
			<ListItem.Root>
				<ListItem.Content>
					<ListItem.Label>Kiwi</ListItem.Label>
				</ListItem.Content>
			</ListItem.Root>
		</div>
	);
}
