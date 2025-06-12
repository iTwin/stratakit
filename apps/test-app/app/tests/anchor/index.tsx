/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Anchor } from "@stratakit/bricks";
import * as AnchorComposition from "@stratakit/bricks/Anchor";
import placeholderHref from "@stratakit/icons/placeholder.svg";
import windowPopoutIconHref from "@stratakit/icons/window-popout.svg";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Anchor" };

export default definePage(
	function Page({ disabled, render: renderParam }) {
		const render = renderParam ? <button /> : undefined;
		return (
			<>
				<div style={{ display: "flex", gap: 4 }}>
					<Anchor href="#main" disabled={!!disabled} render={render}>
						Hello (convenience API)
					</Anchor>

					<AnchorComposition.Root
						href="#main"
						disabled={!!disabled}
						render={render}
					>
						Hello (compositional API)
					</AnchorComposition.Root>
				</div>

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
						<Anchor
							key={tone}
							tone={tone}
							href="https://example.com"
							referrerPolicy="no-referrer"
							target="_blank"
						>
							<AnchorComposition.Icon
								alt="External link"
								href={windowPopoutIconHref}
							/>
							External
							<AnchorComposition.Icon
								alt="External link"
								href={windowPopoutIconHref}
							/>
						</Anchor>

						{/* TODO: Testing */}
						{/* TODO: Is Anchor.Root even needed since it even works with Anchor? i.e. We can just pass Anchor.Icon within the children of Anchor itself. Thus, no need for Anchor.Root? */}
						<AnchorComposition.Root
							key={tone}
							tone={tone}
							href="https://example.com"
							referrerPolicy="no-referrer"
							target="_blank"
						>
							<AnchorComposition.Icon
								alt="External link"
								href={windowPopoutIconHref}
							/>
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
							referrerPolicy="no-referrer"
							target="_blank"
						>
							<AnchorComposition.Icon
								alt="External link"
								href={placeholderHref}
							/>
							External
							<AnchorComposition.Icon
								alt="External link"
								href={placeholderHref}
							/>
						</AnchorComposition.Root>
					</div>
				);
			})}
		</div>
	);
}
