/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import * as Skeleton from "@itwin/itwinui-react-internal/src/bricks/Skeleton.tsx";
import { Divider } from "@itwin/itwinui-react-internal/src/bricks/Divider.tsx";

export const handle = { title: "Skeleton" };

const textSizes = [
	"xsmall",
	"small",
	"medium",
	"large",
	"xlarge",
	"xxlarge",
] as const;
const objectSizes = ["xsmall", "small", "medium", "large", "xlarge"] as const;
const objectShapes = ["square", "pill", "circle"] as const;

export default definePage(
	function Page({ variant, size, shape, alt }) {
		return (
			<Skeleton.Root alt={alt}>
				<Skeleton.Item
					variant={variant as "object" | undefined}
					shape={shape as (typeof objectShapes)[0]}
					size={size as (typeof objectSizes)[0]}
				/>
			</Skeleton.Root>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	return (
		<div style={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
			<Skeleton.Root>
				{textSizes.map((textSize) => (
					<Skeleton.Item
						key={textSize}
						variant="text"
						size={textSize}
						style={{ marginBottom: 8 }}
					/>
				))}
			</Skeleton.Root>

			<Divider style={{ margin: "16px 0" }} />

			<Skeleton.Root
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, min-content)",
					columnGap: 16,
				}}
			>
				{objectSizes.map((objectSize) =>
					objectShapes.map((objectShape) => (
						<Skeleton.Item
							key={`${objectSize}-${objectShape}`}
							variant="object"
							size={objectSize}
							shape={objectShape}
							style={{ marginBottom: 8 }}
						/>
					)),
				)}
			</Skeleton.Root>
		</div>
	);
}
