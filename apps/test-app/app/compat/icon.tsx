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
	const placeholderIconHref = new URL(
		"@stratakit/icons/placeholder.svg",
		import.meta.url,
	).href;

	return (
		<div style={{ display: "grid", gap: 16 }}>
			<Icon>
				<svg>
					<use href={`${placeholderIcon}#icon`} />
				</svg>
			</Icon>
			<Icon>{placeholderIconHref}</Icon>
			<Icon style={{ outline: "1px solid DeepPink" }}>
				<svg>
					<use href={`${placeholderIcon}#icon`} />
				</svg>
			</Icon>

			{/* Partially implemented props */}
			<div>
				<Icon size="small" style={{ display: "inline" }}>
					<svg>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				</Icon>
				<Icon size="medium" style={{ display: "inline" }}>
					<svg>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				</Icon>
				<Icon size="large" style={{ display: "inline" }}>
					<svg>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				</Icon>
			</div>

			{/* Not implemented props */}
			<div>
				<Icon fill="informational" style={{ display: "inline" }}>
					<svg>
						<use href={`${infoIcon}#icon`} />
					</svg>
				</Icon>
				<Icon fill="positive" style={{ display: "inline" }}>
					<svg>
						<use href={`${successStatusIcon}#icon`} />
					</svg>
				</Icon>
				<Icon fill="warning" style={{ display: "inline" }}>
					<svg>
						<use href={`${warningStatusIcon}#icon`} />
					</svg>
				</Icon>
				<Icon fill="negative" style={{ display: "inline" }}>
					<svg>
						<use href={`${errorStatusIcon}#icon`} />
					</svg>
				</Icon>
			</div>

			<Icon padded>
				<svg>
					<use href={`${placeholderIcon}#icon`} />
				</svg>
			</Icon>
		</div>
	);
});
