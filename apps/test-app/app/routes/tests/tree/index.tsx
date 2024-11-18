/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Tree } from "@itwin/kiwi-react/bricks";

export const handle = { title: "Tree" };

export default function Page() {
	return (
		<Tree.Root>
			<Tree.Item content="Item 1">
				<Tree.Item content="Item 1.1" />
				<Tree.Item content="Item 1.2" />
				<Tree.Item content="Item 1.3" />
			</Tree.Item>
			<Tree.Item content="Item 2">
				<Tree.Item content="Item 2.1" />
			</Tree.Item>
			<Tree.Item content="Item 3" />
		</Tree.Root>
	);
}
