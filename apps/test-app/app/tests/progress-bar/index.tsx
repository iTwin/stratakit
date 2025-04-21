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

export default definePage(
	function Page({
		size = "medium",
		tone = "neutral",
		value,
		valueMin,
		valueMax,
	}: {
		size?: string;
		tone?: string;
		value?: number;
		valueMin?: number;
		valueMax?: number;
	}) {
		return (
			<Default
				size={size as (typeof sizes)[number]}
				tone={tone as (typeof tones)[number]}
				value={value}
				valueMin={valueMin}
				valueMax={valueMax}
			/>
		);
	},
	{
		determinate: Determinate,
		visualIndeterminate: VisualIndeterminateTest,
		visualDeterminate: VisualDeterminateTest,
	},
);

function Default({
	size,
	tone,
	value,
	valueMin = 0,
	valueMax = 100,
}: {
	size: (typeof sizes)[number];
	tone: (typeof tones)[number];
	value?: number;
	valueMin?: number;
	valueMax?: number;
}) {
	const labelledBy = React.useId();

	return (
		<>
			<ProgressBar
				size={size}
				tone={tone}
				value={value}
				valueMin={valueMin}
				valueMax={valueMax}
				aria-labelledby={labelledBy}
			/>
			<VisuallyHidden id={labelledBy}>Loading…</VisuallyHidden>
		</>
	);
}

function Determinate({ size = "medium", tone = "neutral", value = 50 }) {
	return (
		<Default
			size={size as (typeof sizes)[number]}
			tone={tone as (typeof tones)[number]}
			value={value}
		/>
	);
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
