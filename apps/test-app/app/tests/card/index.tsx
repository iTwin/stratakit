/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Text } from "@stratakit/bricks";
import { unstable_Card as Card } from "@stratakit/structures";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Card" };

export default definePage(
	function Page() {
		return (
			<Card.Root>
				<Card.Title>Kiwi</Card.Title>
				<Card.Body>
					<Text variant="body-sm">
						Kiwifruit (often shortened to kiwi) has a thin, fuzzy, fibrous,
						light brown skin that is tart but edible, and light green or golden
						flesh that contains rows of tiny black edible seeds. The fruit has a
						soft texture with a sweet and unique flavour.
					</Text>
				</Card.Body>
			</Card.Root>
		);
	},
	{
		visual: VisualTest,
	},
);

function VisualTest() {
	return (
		<Card.Root>
			<Card.Title>Title</Card.Title>
			<Card.Body>
				<Text variant="body-sm">Body</Text>
			</Card.Body>
		</Card.Root>
	);
}
