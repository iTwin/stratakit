/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { ProgressLinear } from "@stratakit/react";

import { definePage } from "~/~utils.tsx";

export const handle = { title: "ProgressLinear" };

export default definePage(function Page() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 8,
			}}
		>
			<ProgressLinear />
			<ProgressLinear value={50} />
			<ProgressLinear value={50} indeterminate={false} />

			<br />

			{/* value should be ignored since indeterminate=true */}
			<ProgressLinear value={50} indeterminate={true} />

			<br />

			{/* Not implemented / no-op props */}
			<ProgressLinear
				status="positive"
				isAnimated={false}
				labels={["Loading...", "50%"]}
				labelGroupProps={{
					style: {
						backgroundColor: "red",
					},
				}}
			/>
		</div>
	);
});
