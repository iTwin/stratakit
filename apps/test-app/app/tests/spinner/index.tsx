/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Spinner } from "@stratakit/bricks";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Spinner" };

const sizes = ["small", "medium", "large", "xlarge"] as const;
const tones = ["neutral", "accent"] as const;

export default definePage(
	function Page({ size = "medium", tone = "neutral" }) {
		return (
			<Spinner
				size={size as (typeof sizes)[number]}
				tone={tone as (typeof tones)[number]}
				data-testid="spinner"
			/>
		);
	},
	{
		determine: DeterminateTest,
		visualIndeterminate: VisualIndeterminateTest,
		visualDeterminate: VisualDeterminateTest,
	},
);

function DeterminateTest({ size = "medium", tone = "neutral", value = 50 }) {
	return (
		<Spinner
			key={value}
			size={size as (typeof sizes)[number]}
			tone={tone as (typeof tones)[number]}
			value={value}
		/>
	);
}

function VisualIndeterminateTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			{tones.map((tone) => (
				<div
					key={tone}
					style={{ display: "flex", gap: 4, alignItems: "center" }}
				>
					{sizes.map((size) => (
						<Spinner key={size} size={size} tone={tone} />
					))}
				</div>
			))}
		</div>
	);
}

function VisualDeterminateTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			{tones.map((tone) =>
				sizes.map((size) => (
					<div
						key={size}
						style={{ display: "flex", gap: 4, alignItems: "center" }}
					>
						{[0, 25, 50, 75, 100].map((value) => (
							<Spinner key={value} value={value} size={size} tone={tone} />
						))}
					</div>
				)),
			)}
		</div>
	);
}
