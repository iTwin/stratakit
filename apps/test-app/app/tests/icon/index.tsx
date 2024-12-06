/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Icon } from "@itwin/kiwi-react/bricks";
import placeholderIcon from "@itwin/kiwi-icons/placeholder.svg";

export const handle = { title: "Icon" };

export default definePage(
	function Page({ size = "regular" }) {
		return <Icon size={size as "regular" | "large"} href={placeholderIcon} />;
	},
	{ renderProp: RenderPropTest },
);

function RenderPropTest() {
	return (
		<Icon
			render={
				// biome-ignore lint/a11y/noSvgWithoutTitle: Bad lint rule
				<svg viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50" fill="currentColor" />
				</svg>
			}
		/>
	);
}
