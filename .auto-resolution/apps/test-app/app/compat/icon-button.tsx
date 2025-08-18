/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { IconButton } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export const handle = { title: "IconButton" };

export default definePage(function Page() {
	const icon = (
		<svg>
			<use href={`${placeholderIcon}#icon`} />
		</svg>
	);

	return (
		<div style={{ display: "grid", gap: 4, justifyItems: "start" }}>
			{(["default", "high-visibility", "cta", "borderless"] as const).map(
				(styleType) => {
					return (
						<div key={styleType} style={{ display: "flex", gap: 4 }}>
							<IconButton label="Click me" styleType={styleType}>
								{icon}
							</IconButton>
							<IconButton label="Click me" styleType={styleType} isActive>
								{icon}
							</IconButton>
							<IconButton label="Click me" styleType={styleType} disabled>
								{icon}
							</IconButton>
						</div>
					);
				},
			)}

			<IconButton label="Click me" as="a" href="#">
				{icon}
			</IconButton>

			<IconButton label="Click me" htmlDisabled>
				{icon}
			</IconButton>

			<IconButton
				label="Click me"
				iconProps={{ style: { outline: "1px solid DeepPink" } }}
			>
				{icon}
			</IconButton>

			<hr style={{ justifySelf: "stretch" }} />

			{/* NOT IMPLEMENTED */}
			<IconButton
				label="Click me"
				size="small"
				labelProps={{ style: { outline: "1px solid DeepPink" } }}
			>
				{icon}
			</IconButton>
			<IconButton label="Click me" size="large">
				{icon}
			</IconButton>
		</div>
	);
});
