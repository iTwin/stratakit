/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import * as Skeleton from "@itwin/itwinui-react-internal/src/bricks/Skeleton.tsx";
import { VisuallyHidden } from "@itwin/itwinui-react/bricks";

export const handle = { title: "Skeleton" };

const sizes = ["xsmall", "small", "medium", "large", "xlarge"] as const;

export default definePage(
	function Page({ variant, size, alt }) {
		return (
			<Skeleton.Group>
				<Skeleton.Item
					variant={variant as "object" | undefined}
					size={size as (typeof sizes)[0]}
				/>
				<VisuallyHidden>{alt ?? "Loading…"}</VisuallyHidden>
			</Skeleton.Group>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	return (
		<div style={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
			<Skeleton.Group>
				{sizes.map((textSize) => (
					<Skeleton.Item
						key={textSize}
						variant="text"
						size={textSize}
						style={{ marginBottom: 8 }}
					/>
				))}
				<VisuallyHidden>Loading…</VisuallyHidden>
			</Skeleton.Group>

			<Skeleton.Group style={{ gap: 16 }}>
				{sizes.map((objectSize) => (
					<Skeleton.Item
						key={objectSize}
						variant="object"
						size={objectSize}
						style={{ marginBottom: 8 }}
					/>
				))}
				<VisuallyHidden>Loading…</VisuallyHidden>
			</Skeleton.Group>
		</div>
	);
}
