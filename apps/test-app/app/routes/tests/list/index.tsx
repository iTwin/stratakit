/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ListItem } from "@itwin/kiwi-react-internal/src/bricks/ListItem";

export const handle = { title: "List" };

export default function Page() {
	return (
		<ul>
			<ListItem render={<li />}>Apple</ListItem>
			<ListItem render={<li />}>Cherry</ListItem>
			<ListItem render={<li />}>Kiwi</ListItem>
		</ul>
	);
}
