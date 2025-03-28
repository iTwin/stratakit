/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import type * as React from "react";
import { Anchor, Button } from "@itwin/itwinui-react/bricks";

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

function VisualTest({ button = false }) {
	const tones = ["neutral", "accent", "critical"] as const;

	return (
		<div style={{ display: "grid", gap: 4, justifyContent: "start" }}>
			{tones.map((tone) => {
				let content: React.ReactNode = "Example";
				if (button) {
					if (tone === "critical") return null;
					content = <Button tone={tone}>Example</Button>;
				}
				return (
					<Anchor key={tone} tone={tone} href="https://example.com">
						{content}
					</Anchor>
				);
			})}
		</div>
	);
}
