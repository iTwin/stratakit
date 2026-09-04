/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Divider } from "@stratakit/bricks";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Divider" };

export default definePage(
	function Page({ orientation, presentational }) {
		return (
			<Divider
				orientation={orientation as "horizontal" | "vertical" | undefined}
				presentational={presentational ? true : undefined}
				data-testid="divider"
			/>
		);
	},
	{
		visual: VisualTest,
		bleed: BleedTest,
	},
);

function VisualTest() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
			}}
		>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(2, 50%)",
					gap: "1rem",
					blockSize: "10rem",
				}}
			>
				<Divider orientation="horizontal" />
				<Divider orientation="vertical" />
			</div>
			<BleedTest />
		</div>
	);
}

function BleedTest() {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(2, 50%)",
				gap: "1rem",
				blockSize: "10rem",
			}}
		>
			<div
				style={{
					padding: 12,
					border: "1px solid var(--stratakit-color-border-neutral-inverse)",
					overflow: "auto",
				}}
			>
				<div style={{ padding: 12 }}>
					<Divider orientation="horizontal" bleed />
				</div>
			</div>
			<div
				style={{
					padding: 12,
					border: "1px solid var(--stratakit-color-border-neutral-inverse)",
					overflow: "auto",
				}}
			>
				<div style={{ padding: 12 }}>
					<Divider orientation="vertical" bleed />
				</div>
			</div>
		</div>
	);
}
