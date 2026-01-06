/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useId, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

export default () => {
	const [value, setValue] = useState(0);

	const baseId = useId();

	return (
		<Box>
			<Tabs
				value={value}
				onChange={(_, value) => setValue(value)}
				aria-label="basic tabs example"
			>
				<Tab
					label="Item One"
					id={`${baseId}-tab0`}
					aria-controls={`${baseId}-panel0`}
				/>
				<Tab
					label="Item Two"
					id={`${baseId}-tab1`}
					aria-controls={`${baseId}-panel1`}
				/>
				<Tab
					label="Item Three"
					id={`${baseId}-tab2`}
					aria-controls={`${baseId}-panel2`}
				/>
			</Tabs>
			{value === 0 && (
				<div
					role="tabpanel"
					id={`${baseId}-panel0`}
					aria-labelledby={`${baseId}-tab0`}
				>
					Item One
				</div>
			)}
			{value === 1 && (
				<div
					role="tabpanel"
					id={`${baseId}-panel1`}
					aria-labelledby={`${baseId}-tab1`}
				>
					Item Two
				</div>
			)}
			{value === 2 && (
				<div
					role="tabpanel"
					id={`${baseId}-panel2`}
					aria-labelledby={`${baseId}-tab2`}
				>
					Item Three
				</div>
			)}
		</Box>
	);
};
