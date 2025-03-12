/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { ProgressBar, VisuallyHidden } from "@itwin/itwinui-react/bricks";
import * as React from "react";

export const handle = { title: "ProgressBar" };

const sizes = ["small", "medium", "large"] as const;
const tones = ["neutral", "accent"] as const;

export default definePage(
	function Page({ size = "medium", tone = "neutral" }) {
		const labelledBy = React.useId();

		return (
			<>
				<ProgressBar
					size={size as (typeof sizes)[number]}
					tone={tone as (typeof tones)[number]}
					aria-labelledby={labelledBy}
				/>
				<VisuallyHidden id={labelledBy}>Loading…</VisuallyHidden>
			</>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	const idPrefix = React.useId();

	return (
		<div style={{ display: "grid", gap: 10 }}>
			{tones.map((tone) => (
				<div key={tone} style={{ display: "grid", gap: 10 }}>
					{sizes.map((size) => {
						const labelledBy = `${idPrefix}-${size}-${tone}`;

						return (
							<>
								<ProgressBar
									key={size}
									size={size}
									tone={tone}
									aria-labelledby={labelledBy}
								/>
								<VisuallyHidden id={labelledBy} key={labelledBy}>
									Loading…
								</VisuallyHidden>
							</>
						);
					})}
				</div>
			))}
		</div>
	);
}
