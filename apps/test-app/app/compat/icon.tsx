/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Icon } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

import infoIcon from "@stratakit/icons/info.svg";
import placeholderIcon from "@stratakit/icons/placeholder.svg";
import errorStatusIcon from "@stratakit/icons/status-error.svg";
import successStatusIcon from "@stratakit/icons/status-success.svg";
import warningStatusIcon from "@stratakit/icons/status-warning.svg";

export const handle = { title: "Icon" };

export default definePage(function Page() {
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
			<div style={{ display: "flex" }}>
				{(["small", "medium", "large"] as const).map((iconSize) => (
					<Icon size={iconSize}>
						<svg>
							<use href={`${placeholderIcon}#icon`} />
						</svg>
					</Icon>
				))}
			</div>

			{/* Not implemented props */}
			<div style={{ display: "flex" }}>
				{Object.entries({
					informational: infoIcon,
					positive: successStatusIcon,
					warning: warningStatusIcon,
					negative: errorStatusIcon,
				}).map(([fill, icon]) => (
					<Icon fill={fill}>
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

			<p
				style={{
					fontSize: "1.5rem",
					display: "flex",
				}}
			>
				<Icon size="auto">
					<svg>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				</Icon>
				Autoscale
			</p>
		</div>
	);
});
