/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Anchor } from "@stratakit/bricks";
import * as AnchorComposition from "@stratakit/bricks/Anchor";
import windowPopoutIconHref from "@stratakit/icons/window-popout.svg";
import placeholderIconHref from "@stratakit/icons/placeholder.svg";
import { definePage } from "~/~utils.tsx";

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
	{ visual: VisualTest, composition: CompositionTest },
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

						<AnchorComposition.Root
							key={tone}
							tone={tone}
							href="https://example.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							External
							<AnchorComposition.Icon
								alt="External link"
								href={windowPopoutIconHref}
							/>
						</AnchorComposition.Root>

						<AnchorComposition.Root
							key={tone}
							tone={tone}
							href="https://example.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<AnchorComposition.Icon href={placeholderIconHref} />
							Decorative icons
							<AnchorComposition.Icon href={placeholderIconHref} />
						</AnchorComposition.Root>
					</div>
				);
			})}
		</div>
	);
}

function CompositionTest() {
	return (
		<AnchorComposition.Root href="https://example.com">
			Hello
		</AnchorComposition.Root>
	);
}
