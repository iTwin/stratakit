/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ListItem } from "@itwin/kiwi-react-internal/src/bricks/ListItem";

export const handle = { title: "List" };

export default function Page() {
	const fruits = ["Apple", "Cherry", "Kiwi"];
	return (
		<ul>
			{fruits.map((fruit) => (
				// biome-ignore lint/a11y/useValidAriaRole: explicit role attribute is not needed, when using `li` element
				<ListItem role={undefined} render={<li />} key={fruit}>
					{fruit}
				</ListItem>
			))}
		</ul>
	);
}
