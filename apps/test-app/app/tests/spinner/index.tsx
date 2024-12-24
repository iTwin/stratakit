/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Spinner } from "@itwin/itwinui-react/bricks";
import styles from "./index.module.css";

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
					{sizes.map((size) => (
						<Spinner key={size} size={size} tone={tone} />
					))}
				</div>
			))}
		</div>
	);
}
