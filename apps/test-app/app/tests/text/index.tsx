/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Text } from "@itwin/itwinui-react/bricks";
import { definePage } from "~/~utils.tsx";

const variants = [
	"display-lg",
	"display-md",
	"display-sm",
	"headline-lg",
	"headline-md",
	"headline-sm",
	"body-lg",
	"body-md",
	"body-sm",
	"caption-lg",
	"caption-md",
	"caption-sm",
	"mono-sm",
] as const;

export default definePage(
	function Page({ variant = "body-md", content = "Hello, World!" }) {
		return (
			<Text variant={variant as (typeof variants)[number]}>{content}</Text>
		);
	},
	{ visual: VisualTest },
);

function VisualTest({ content = "Hello, World!" }) {
	return (
		<div style={{ display: "grid", gap: "1rem" }}>
			{variants.map((variant) => (
				<Text key={variant} variant={variant}>
					{content}
				</Text>
			))}
		</div>
	);
}
