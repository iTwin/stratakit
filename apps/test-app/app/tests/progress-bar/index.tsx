/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button, ProgressBar, VisuallyHidden } from "@stratakit/bricks";
import * as React from "react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "ProgressBar" };

const sizes = ["small", "medium", "large"] as const;
const tones = ["neutral", "accent"] as const;

export default definePage(
	function Page({ size = "medium", tone = "neutral", ...rest }) {
		const labelledBy = React.useId();

		return (
			<>
				<ProgressBar
					size={size as (typeof sizes)[number]}
					tone={tone as (typeof tones)[number]}
					{...rest}
					aria-labelledby={labelledBy}
				/>
				<VisuallyHidden id={labelledBy}>Loading…</VisuallyHidden>
			</>
		);
	},
	{
		visual: VisualTest,
		determinate: DeterminateTest,
		animated: AnimatedTest,
	},
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

			{tones.map((tone) => (
				<React.Fragment key={tone}>
					{sizes.map((size) => {
						return (
							<React.Fragment key={size}>
								<br style={{ margin: "10px 0" }} />
								{[0, 50, 100].map((value) => {
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
							</React.Fragment>
						);
					})}
				</React.Fragment>
			))}
		</div>
	);
}

function DeterminateTest({
	size = "medium",
	tone = "neutral",
	value = 50,
	...rest
}) {
	const labelledBy = React.useId();

	return (
		<>
			<ProgressBar
				size={size as (typeof sizes)[number]}
				tone={tone as (typeof tones)[number]}
				value={value}
				{...rest}
				aria-labelledby={labelledBy}
			/>
			<VisuallyHidden id={labelledBy}>Loading…</VisuallyHidden>
		</>
	);
}

function AnimatedTest() {
	const [value, setValue] = React.useState(0);
	// const intervalRef = React.useRef<ReturnType<typeof setInterval>>(null);
	const [progressInterval, setProgressInterval] = React.useState<ReturnType<
		typeof setInterval
	> | null>(null);

	const labelledBy = React.useId();

	React.useEffect(() => {
		return () => {
			if (progressInterval) {
				clearInterval(progressInterval);
			}
		};
	}, [progressInterval]);

	const onStartClick = React.useCallback(() => {
		const newInterval = setInterval(() => {
			setValue((prev) => {
				if (prev === 100) {
					return 0;
				}

				const randomProgress = Math.random() * 25;
				const newValue = Math.min(prev + randomProgress, 100);

				return newValue;
			});
		}, 1000);

		setProgressInterval(newInterval);
	}, []);

	const onStopClick = React.useCallback(() => {
		if (progressInterval) {
			clearInterval(progressInterval);
			setProgressInterval(null);
		}
	}, [progressInterval]);

	const onResetClick = React.useCallback(() => {
		onStopClick();
		setValue(0);
	}, [onStopClick]);

	return (
		<>
			<div style={{ display: "grid", gap: 10 }}>
				<div style={{ display: "flex", gap: 4 }}>
					<Button onClick={onStartClick} disabled={!!progressInterval}>
						Start
					</Button>
					<Button onClick={onStopClick} disabled={!progressInterval}>
						Stop
					</Button>
					<Button
						onClick={onResetClick}
						disabled={!progressInterval && value === 0}
					>
						Reset
					</Button>
				</div>
				<ProgressBar value={value} aria-labelledby={labelledBy} />
				<VisuallyHidden id={labelledBy}>Loading…</VisuallyHidden>
			</div>
		</>
	);
}
