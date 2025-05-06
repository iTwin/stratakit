/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Anchor } from "@itwin/itwinui-react/bricks";

export const handle = { title: "Anchor" };

export default definePage(
	function Page({ disabled, render: renderParam }) {
		const render = renderParam ? <button /> : undefined;
		return (
			<>
				<Anchor href="#main" disabled={!!disabled} render={render}>
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
		<div style={{ display: "grid", gap: 4, justifyContent: "start" }}>
			{tones.map((tone) => {
				return (
					<div key={tone} style={{ display: "flex", gap: 4 }}>
						<Anchor key={tone} tone={tone} href="https://example.com">
							Example
						</Anchor>
						<Anchor
							render={<button onClick={() => {}} />}
							key={tone}
							tone={tone}
						>
							Example
						</Anchor>
					</div>
				);
			})}
		</div>
	);
}
