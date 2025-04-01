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
	{ visual: VisualTest, button: ButtonTest },
);

const tones = ["neutral", "accent", "critical"] as const;

function VisualTest() {
	return (
		<div style={{ display: "grid", gap: 4, justifyContent: "start" }}>
			{tones.map((tone) => {
				return (
					<Anchor key={tone} tone={tone} href="https://example.com">
						"Example"
					</Anchor>
				);
			})}
		</div>
	);
}

function ButtonTest() {
	const handleOnClick = () => {
		window.location.href = "https://example.com";
	};

	return (
		<div style={{ display: "grid", gap: 4, justifyContent: "start" }}>
			{tones.map((tone) => {
				return (
					<Anchor
						render={<button onClick={() => handleOnClick()} />}
						key={tone}
						tone={tone}
					>
						"Example"
					</Anchor>
				);
			})}
		</div>
	);
}
