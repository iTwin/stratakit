/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Anchor } from "@itwin/kiwi-react/bricks";

export const handle = { title: "Anchor" };

export default definePage(
	function Page({ disabled }) {
		return (
			<>
				<Anchor href="#main" disabled={!!disabled}>
					Hello
				</Anchor>

				<article id="main" tabIndex={-1}>
					Main content
				</article>
			</>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	const tones = ["neutral", "accent", "critical"] as const;

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{tones.map((tone) => (
				<Anchor key={tone} tone={tone} href="https://bentley.com">
					Example
				</Anchor>
			))}
		</div>
	);
}
