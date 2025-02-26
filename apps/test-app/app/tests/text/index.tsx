/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Text } from "@itwin/itwinui-react/bricks";
import { definePage } from "~/~utils.tsx";

export const demoVariants = {
	Default: "",
	Visual: "?visual",
	DisplayLg: "?variant=display-lg",
	DisplayMd: "?variant=display-md",
	DisplaySm: "?variant=display-sm",
	HeadlineLg: "?variant=headline-lg",
	HeadlineMd: "?variant=headline-md",
	HeadlineSm: "?variant=headline-sm",
	BodyLg: "?variant=body-lg",
	BodyMd: "?variant=body-md",
	BodySm: "?variant=body-sm",
	CaptionLg: "?variant=caption-lg",
	CaptionMd: "?variant=caption-md",
	CaptionSm: "?variant=caption-sm",
	MonoSm: "?variant=mono-sm",
};

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
