/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import { Icon } from "@itwin/itwinui-react/bricks";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Icon" };

export default definePage(
	function Page({ size = "regular", alt }) {
		return (
			<Icon
				alt={alt}
				size={size as "regular" | "large"}
				href={placeholderIcon}
			/>
		);
	},
	{ renderProp: RenderPropTest, _fallback: RuntimeFallbackTest },
);

function RenderPropTest() {
	return (
		<Icon
			render={
				<svg viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50" fill="currentColor" />
				</svg>
			}
		/>
	);
}

function RuntimeFallbackTest() {
	const datauri = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2ZM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Z" clip-rule="evenodd"/></symbol></svg>`;
	return <Icon href={datauri} />;
}
