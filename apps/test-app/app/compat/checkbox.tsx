/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Checkbox } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Checkbox" };

export default definePage(function Page() {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
			{/* No props */}
			<Checkbox />

			{/* With label */}
			<Checkbox label="Choose me!" />

			{/* Other implemented props */}
			<Checkbox
				label="Cannot choose me!"
				labelProps={{ className: "label-class" }}
				wrapperProps={{ className: "wrapper-class" }}
			/>
			<Checkbox label="Choose me!" defaultChecked disabled />

			{/* Not implemented props */}
			<Checkbox
				indeterminate
				status="positive"
				variant="eyeball"
				label="Positive!"
			/>
		</div>
	);
});
