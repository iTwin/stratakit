/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Badge } from "@itwin/itwinui-react/bricks";

export const handle = { title: "Badge" };

const sizes = ["small", "medium"] as const;
const tones = [
	"neutral",
	"info",
	"positive",
	"attention",
	"severe",
	"critical",
	"special",
	"highlight",
] as const;
const variants = ["solid", "muted", "outline"] as const;

export default definePage(
	function Page({ size = "medium", tone = "neutral", variant = "solid" }) {
		return (
			<Badge
				label="Badge"
				size={size as (typeof sizes)[number]}
				tone={tone as (typeof tones)[number]}
				variant={variant as (typeof variants)[number]}
				data-testid="badge"
			/>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	return (
		<div style={{ display: "grid", gap: 16 }}>
			{variants.map((variant) => (
				<div key={variant} style={{ display: "grid", gap: 4 }}>
					{sizes.map((size) => (
						<div
							key={size}
							style={{ display: "flex", gap: 4, alignItems: "center" }}
						>
							{tones.map((tone) => (
								<Badge
									label={tone}
									key={tone}
									size={size}
									tone={tone}
									variant={variant}
									style={{ textTransform: "capitalize" }}
								/>
							))}
						</div>
					))}
				</div>
			))}
		</div>
	);
}
