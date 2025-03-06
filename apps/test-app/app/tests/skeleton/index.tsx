/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Skeleton } from "@itwin/itwinui-react-internal/src/bricks/Skeleton.tsx";
import { VisuallyHidden } from "@itwin/itwinui-react/bricks";

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

function VisualTest() {
	return (
		<div style={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
			<div>
				{sizes.map((textSize) => (
					<Skeleton
						key={textSize}
						variant="text"
						size={textSize}
						style={{ marginBottom: 8 }}
					/>
				))}
				<VisuallyHidden>Loading…</VisuallyHidden>
			</div>

			<div style={{ gap: 16 }}>
				{sizes.map((objectSize) => (
					<Skeleton
						key={objectSize}
						variant="object"
						size={objectSize}
						style={{ marginBottom: 8 }}
					/>
				))}
				<VisuallyHidden>Loading…</VisuallyHidden>
			</div>
		</div>
	);
}
