/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { ProgressIndicator } from "@itwin/itwinui-react/bricks";

export const handle = { title: "ProgressIndicator" };

export default definePage(
	function Page() {
		return <ProgressIndicator size={"medium"} tone={"neutral"} />;
	},
	{ visual: VisualTest },
);

function VisualTest() {
	const tones = ["neutral", "accent"] as const;

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{tones.map((tone) => (
				<div
					key={tone}
					style={{ display: "flex", gap: 4, alignItems: "center" }}
				>
					<ProgressIndicator size={"small"} tone={tone} />
					<ProgressIndicator size={"medium"} tone={tone} />
					<ProgressIndicator size={"large"} tone={tone} />
					<ProgressIndicator size={"xlarge"} tone={tone} />
				</div>
			))}
		</div>
	);
}
