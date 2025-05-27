/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Radio } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Radio" };

export default definePage(function Page() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 4,
				alignItems: "flex-start",
			}}
		>
			{/* No props */}
			<Radio />

			{/* With label */}
			<Radio label="Choose me!" />

			{/* Other implemented props */}
			<Radio
				label="Cannot choose me!"
				labelProps={{ className: "label-class" }}
				wrapperProps={{ className: "wrapper-class" }}
			/>
			<Radio label="Choose me!" defaultChecked disabled />

			{/* Not implemented props */}
			<Radio status="positive" label="Positive!" />
		</div>
	);
});
