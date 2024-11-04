/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as ListItem from "@itwin/kiwi-react-internal/src/bricks/ListItem";
import { Icon } from "@itwin/kiwi-react-internal/src/bricks/Icon";
import { useSearchParams } from "@remix-run/react";

export const handle = { title: "List" };

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;

export default function Page() {
	const [searchParams] = useSearchParams();

	return (
		// biome-ignore lint/a11y/useSemanticElements: `div` is used as underlying element for `ListItem`
		<div role="list">
			{searchParams.has("with-icons") ? (
				<>
					<ListItem.Root>
						<ListItem.Content>Kiwi</ListItem.Content>
						<Icon href={placeholderIcon} />
					</ListItem.Root>
					<ListItem.Root>
						<Icon href={placeholderIcon} />
						<ListItem.Content>Tomato</ListItem.Content>
					</ListItem.Root>
				</>
			) : (
				<>
					<ListItem.Root>Apple</ListItem.Root>
					<ListItem.Root>Cherry</ListItem.Root>
					<ListItem.Root>Kiwi</ListItem.Root>
				</>
			)}
		</div>
	);
}
