/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useSearchParams } from "@remix-run/react";
import { Icon, IconButton, Tree } from "@itwin/kiwi-react/bricks";

export const handle = { title: "Tree" };

const placeholderIcon = new URL(
	"@itwin/kiwi-icons/placeholder.svg",
	import.meta.url,
).href;
const expanderIcon = new URL(
	"@itwin/kiwi-icons/chevron-right.svg",
	import.meta.url,
).href;
const unlockIcon = new URL(
	"@itwin/kiwi-icons/lock-unlocked.svg",
	import.meta.url,
).href;
const showIcon = new URL(
	"@itwin/kiwi-icons/visibility-show.svg",
	import.meta.url,
).href;

export default function Page() {
	const [searchParams] = useSearchParams();
	const active = searchParams.has("active");
	const visual = searchParams.has("visual");

	if (visual) {
		return <VisualTest />;
	}
	return (
		<Tree.Root>
			<Tree.Item content="Item 1" active={active}>
				<Tree.Item content="Item 1.1" active={active} />
				<Tree.Item content="Item 1.2" active={active} />
				<Tree.Item content="Item 1.3" active={active} />
			</Tree.Item>
			<Tree.Item content="Item 2" active={active}>
				<Tree.Item content="Item 2.1" active={active} />
			</Tree.Item>
			<Tree.Item content="Item 3" active={active} />
		</Tree.Root>
	);
}

function VisualTest() {
	return (
		<Tree.Root>
			<Tree.Item
				content={
					<>
						<IconButton icon={expanderIcon} label="Expand" variant="ghost" />
						<Icon href={placeholderIcon} />
						Item 1
						<IconButton icon={unlockIcon} label="Unlock" variant="ghost" />
						<IconButton icon={showIcon} label="Show" variant="ghost" />
					</>
				}
			/>
		</Tree.Root>
	);
}
