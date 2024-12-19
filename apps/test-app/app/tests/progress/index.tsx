/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Progress } from "@itwin/itwinui-react/bricks";
import styles from "./index.module.css";

export const handle = { title: "Progress" };

const sizes = ["small", "medium", "large", "xlarge"] as const;
const tones = ["neutral", "accent"] as const;

export default definePage(
	function Page({ size = "medium", tone = "neutral" }) {
		return (
			<Progress
				variant="radial"
				size={size as (typeof sizes)[number]}
				tone={tone as (typeof tones)[number]}
			/>
		);
	},
	{ visual: VisualTest },
);

function VisualTest({ paused = false }) {
	return (
		<div
			style={{ display: "grid", gap: 4 }}
			className={paused ? styles.animationPaused : ""}
		>
			{tones.map((tone) => (
				<div
					key={tone}
					style={{ display: "flex", gap: 4, alignItems: "center" }}
				>
					<Progress variant="radial" size="small" tone={tone} />
					<Progress variant="radial" size="medium" tone={tone} />
					<Progress variant="radial" size="large" tone={tone} />
					<Progress variant="radial" size="xlarge" tone={tone} />
				</div>
			))}
		</div>
	);
}
