/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Badge } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Anchor" };

export default definePage(function Page() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 8,
				alignItems: "flex-start",
			}}
		>
			{/* Basic */}
			<Badge>Badge</Badge>

			{/* Numerical value */}
			<Badge>10</Badge>

			{/* Statuses */}
			<div style={{ display: "flex", gap: 4 }}>
				<Badge backgroundColor="primary">Primary</Badge>
				<Badge backgroundColor="informational">Informational</Badge>
				<Badge backgroundColor="positive">Success</Badge>
				<Badge backgroundColor="negative">Error</Badge>
				<Badge backgroundColor="warning">Warning</Badge>
			</div>

			{/* Soft backgrounds (not implemented) */}
			<div style={{ display: "flex", gap: 4 }}>
				<Badge backgroundColor="skyblue">Skyblue</Badge>
				<Badge backgroundColor="celery">Celery</Badge>
				<Badge backgroundColor="froly">Froly</Badge>
				<Badge backgroundColor="steelblue">Steelblue</Badge>
				<Badge backgroundColor="sunglow">Sunglow</Badge>
				<Badge backgroundColor="seabuckthorn">Seabuckthorn</Badge>
				<Badge backgroundColor="montecarlo">Montecarlo</Badge>
				<Badge backgroundColor="poloblue">Poloblue</Badge>
				<Badge backgroundColor="bouquet">Bouquet</Badge>
				<Badge backgroundColor="ash">Ash</Badge>
				<Badge backgroundColor="oak">Oak</Badge>
			</div>
		</div>
	);
});
