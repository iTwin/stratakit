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

const LOREM_IPSUM =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export default definePage(
	function Page({ variant = "body-md", content = LOREM_IPSUM }) {
		return (
			<Text
				variant={variant as (typeof variants)[number]}
				style={{ maxInlineSize: "24em" }}
			>
				{content}
			</Text>
		);
	},
	{ visual: VisualTest },
);

function VisualTest({ content = LOREM_IPSUM }) {
	return (
		<div style={{ display: "grid", gap: "1rem" }}>
			{variants.map((variant) => (
				<Text key={variant} variant={variant} style={{ maxInlineSize: "24em" }}>
					{content}
				</Text>
			))}
		</div>
	);
}
