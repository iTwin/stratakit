/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { ProgressBar, VisuallyHidden } from "@stratakit/bricks";
import * as React from "react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "ProgressBar" };

const sizes = ["small", "medium", "large"] as const;
const tones = ["neutral", "accent"] as const;

type ProgressBarProps = Partial<
	Pick<
		React.ComponentProps<typeof ProgressBar>,
		"size" | "tone" | "value" | "valueMin" | "valueMax"
	>
>;

export default definePage(
	function Page({
		size = "medium",
		tone = "neutral",
		...rest
	}: ProgressBarProps) {
		return <Default size={size} tone={tone} {...rest} />;
	},
	{
		determinate: Determinate,
		visualIndeterminate: VisualIndeterminateTest,
		visualDeterminate: VisualDeterminateTest,
	},
);

function Default(props: ProgressBarProps) {
	const labelledBy = React.useId();

	return (
		<>
			<ProgressBar {...props} aria-labelledby={labelledBy} />
			<VisuallyHidden id={labelledBy}>Loading…</VisuallyHidden>
		</>
	);
}

function Determinate({
	size = "medium",
	tone = "neutral",
	value = 50,
	...rest
}: ProgressBarProps) {
	return <Default size={size} tone={tone} value={value} {...rest} />;
}

function VisualIndeterminateTest() {
	const idPrefix = React.useId();

	return (
		<div style={{ display: "grid", gap: 10 }}>
			{tones.map((tone) =>
				sizes.map((size) => {
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
				}),
			)}
		</div>
	);
}

function VisualDeterminateTest() {
	const idPrefix = React.useId();

	return (
		<div style={{ display: "grid", gap: 10 }}>
			{tones.map((tone) => (
				<React.Fragment key={tone}>
					{sizes.map((size) => {
						return (
							<React.Fragment key={size}>
								{[0, 25, 50, 75, 100].map((value) => {
									const labelledBy = `${idPrefix}-${size}-${tone}-${value}`;
									return (
										<>
											<ProgressBar
												key={size}
												size={size}
												tone={tone}
												aria-labelledby={labelledBy}
												value={value}
											/>
											<VisuallyHidden id={labelledBy} key={labelledBy}>
												Loading…
											</VisuallyHidden>
										</>
									);
								})}
								<br />
							</React.Fragment>
						);
					})}
				</React.Fragment>
			))}
		</div>
	);
}
