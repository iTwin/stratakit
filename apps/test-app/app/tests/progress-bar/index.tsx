/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { ProgressBar } from "@itwin/itwinui-react/bricks";

export const handle = { title: "ProgressBar" };

const sizes = ["small", "medium", "large"] as const;
const tones = ["neutral", "accent"] as const;

export default definePage(
	function Page({ size = "medium", tone = "neutral" }) {
		return (
			<ProgressBar
				size={size as (typeof sizes)[number]}
				tone={tone as (typeof tones)[number]}
				data-testid="progress-bar"
			/>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			{tones.map((tone) => (
				<div
					key={tone}
					style={{ display: "flex", gap: 4, alignItems: "center" }}
				>
					{sizes.map((size) => (
						<ProgressBar key={size} size={size} tone={tone} />
					))}
				</div>
			))}
		</div>
	);
}
