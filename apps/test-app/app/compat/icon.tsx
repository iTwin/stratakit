/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

import infoIcon from "@stratakit/icons/info.svg";
import placeholderIcon from "@stratakit/icons/placeholder.svg";
import errorStatusIcon from "@stratakit/icons/status-error.svg";
import successStatusIcon from "@stratakit/icons/status-success.svg";
import warningStatusIcon from "@stratakit/icons/status-warning.svg";

export const handle = { title: "Icon" };

export default definePage(function Page() {
	const [size, setSize] = React.useState(() => 14 / 16);

	return (
		<div style={{ display: "grid", gap: 16 }}>
			<Icon>
				<svg>
					<use href={`${placeholderIcon}#icon`} />
				</svg>
			</Icon>
			<Icon style={{ outline: "1px solid DeepPink" }}>
				<svg>
					<use href={`${placeholderIcon}#icon`} />
				</svg>
			</Icon>

			{/* Partially implemented props */}
			<div>
				{(["small", "medium", "large"] as const).map((iconSize) => (
					<Icon size={iconSize} style={{ display: "inline" }}>
						<svg>
							<use href={`${placeholderIcon}#icon`} />
						</svg>
					</Icon>
				))}
			</div>

			{/* Not implemented props */}
			<div>
				{Object.entries({
					informational: infoIcon,
					positive: successStatusIcon,
					warning: warningStatusIcon,
					negative: errorStatusIcon,
				}).map(([fill, icon]) => (
					<Icon fill={fill} style={{ display: "inline" }}>
						<svg>
							<use href={`${icon}#icon`} />
						</svg>
					</Icon>
				))}
			</div>

			<Icon padded>
				<svg>
					<use href={`${placeholderIcon}#icon`} />
				</svg>
			</Icon>

			<div style={{ display: "flex", gap: 16, alignItems: "start" }}>
				<p
					style={{
						width: "min(400px, 90%)",
						fontSize: `${size}rem`,
					}}
				>
					<Icon size="auto" style={{ display: "inline" }}>
						<svg>
							<use href={`${placeholderIcon}#icon`} />
						</svg>
					</Icon>
					This icon will scale with text. Try adjusting the slider.
				</p>

				<input
					type="range"
					style={{ writingMode: "vertical-lr", direction: "rtl" }}
					min="0.5"
					max="2.5"
					step="0.05"
					value={size}
					onChange={(e) => setSize(e.target.valueAsNumber)}
				></input>
			</div>
		</div>
	);
});
