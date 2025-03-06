/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Spinner } from "@itwin/itwinui-react/bricks";

export const handle = { title: "Spinner" };

const sizes = ["small", "medium", "large", "xlarge"] as const;
const tones = ["neutral", "accent"] as const;
const variants = ["indeterminate", "determinate"] as const;

export default definePage(
	function Page({
		size = "medium",
		tone = "neutral",
		variant = "indeterminate",
	}) {
		return (
			<Spinner
				size={size as (typeof sizes)[number]}
				tone={tone as (typeof tones)[number]}
				variant={tone as (typeof variants)[number]}
				data-testid="spinner"
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
						<Spinner key={size} size={size} tone={tone} />
					))}
				</div>
			))}

			{tones.map((tone) => (
				<div
					key={tone}
					style={{ display: "flex", gap: 4, alignItems: "center" }}
				>
					{sizes.map((size) => (
						<Spinner
							key={size}
							size={size}
							tone={tone}
							variant="determinate"
							style={{ "--🥝spinner-percentage": 50 }}
						/>
					))}
				</div>
			))}
		</div>
	);
}
