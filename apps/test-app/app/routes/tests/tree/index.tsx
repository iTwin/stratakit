/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useSearchParams } from "@remix-run/react";
import { Tree } from "@itwin/kiwi-react/bricks";

export const handle = { title: "Tree" };

export default function Page() {
	const [searchParams] = useSearchParams();
	const active = searchParams.has("active");
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
