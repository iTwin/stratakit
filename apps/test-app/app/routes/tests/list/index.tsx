/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ListItem } from "@itwin/kiwi-react-internal/src/bricks/ListItem";
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
					<ListItem>
						<span>Kiwi</span>
						<Icon href={placeholderIcon} />
					</ListItem>
					<ListItem>
						<Icon href={placeholderIcon} />
						<span>Tomato</span>
					</ListItem>
				</>
			) : (
				<>
					<ListItem>Apple</ListItem>
					<ListItem>Cherry</ListItem>
					<ListItem>Kiwi</ListItem>
				</>
			)}
		</div>
	);
}
