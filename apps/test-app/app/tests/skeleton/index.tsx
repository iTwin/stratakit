/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
	Avatar,
	Button,
	Field,
	Select,
	Skeleton,
	Text,
	VisuallyHidden,
} from "@stratakit/bricks";
import * as React from "react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Skeleton" };

const sizes = ["xsmall", "small", "medium", "large", "xlarge"] as const;

export default definePage(
	function Page({ variant, size, alt }) {
		return (
			<div>
				<Skeleton
					variant={variant as "object" | undefined}
					size={size as (typeof sizes)[0]}
				/>
				<VisuallyHidden>{alt ?? "Loading…"}</VisuallyHidden>
			</div>
		);
	},
	{ visual: VisualTest },
);

function VisualTest({ controls }: { controls?: boolean }) {
	const [isStarted, setIsStarted] = React.useState(false);
	const [count, setCount] = React.useState(1);

	return (
		<div style={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
			{controls != null ? (
				<div style={{ display: "flex", gap: 8 }}>
					<Button onClick={() => setIsStarted((prev) => !prev)}>Toggle</Button>

					<Field.Root layout="inline">
						<Field.Label>Count</Field.Label>
						<Field.Control
							render={(controlProps) => (
								<Select.Root>
									<Select.HtmlSelect
										{...controlProps}
										onChange={(e) => setCount(Number(e.target.value))}
									>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
									</Select.HtmlSelect>
								</Select.Root>
							)}
						/>
					</Field.Root>
				</div>
			) : null}

			<div style={{ gap: 8, display: "flex", flexDirection: "column" }}>
				{sizes.map((textSize) => (
					<div
						key={textSize}
						style={{
							marginBlockStart: 8,
							gap: 8,
							display: "flex",
						}}
					>
						{new Array(count).fill(0).map(() =>
							isStarted ? (
								<Skeleton key={textSize} variant="text" size={textSize} />
							) : (
								<Text
									key={textSize}
									style={{ lineHeight: 1 }}
									variant={skeletonSizeTextVariantMap[textSize]}
								>
									Lorem ipsum
								</Text>
							),
						)}
					</div>
				))}
				<VisuallyHidden>Loading…</VisuallyHidden>
			</div>

			<div
				style={{
					marginBlockStart: 8,
					gap: 8,
					display: "flex",
					flexDirection: "column",
				}}
			>
				{sizes.map((objectSize) => (
					<div
						key={objectSize}
						style={{
							marginBlockStart: 8,
							gap: 8,
							display: "flex",
						}}
					>
						{new Array(count)
							.fill(0)
							.map(() =>
								isStarted ? (
									<Skeleton
										key={objectSize}
										variant="object"
										size={objectSize}
									/>
								) : (
									<CustomAvatar key={objectSize} size={objectSize} />
								),
							)}
					</div>
				))}
				<VisuallyHidden>Loading…</VisuallyHidden>
			</div>
		</div>
	);
}

const CustomAvatar = ({ size }: { size: (typeof sizes)[number] }) => {
	if (size !== "xsmall") {
		return <Avatar initials="JD" size={size} />;
	}
	return (
		<Avatar
			initials="JD"
			size="small"
			style={{
				inlineSize: 12,
				blockSize: 12,
			}}
		/>
	);
};

const skeletonSizeTextVariantMap = {
	xsmall: "body-sm",
	small: "body-md",
	medium: "body-lg",
	large: "headline-sm",
	xlarge: "headline-md",
} as const;
