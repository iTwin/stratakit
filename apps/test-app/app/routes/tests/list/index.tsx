/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as ListItem from "@itwin/kiwi-react-internal/src/bricks/ListItem";
import { Icon } from "@itwin/kiwi-react-internal/src/bricks/Icon";
import { useSearchParams, type LinksFunction } from "react-router";
import testStyles from "./index.css?url";

export const handle = { title: "List" };

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: testStyles },
];

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;

export default function Page() {
	const [searchParams] = useSearchParams();
	const isActive = searchParams.has("active-state");

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
}
