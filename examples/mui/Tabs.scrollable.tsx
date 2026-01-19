/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import styles from "./Tabs.scrollable.module.css";

export default () => {
	const [value, setValue] = React.useState(0);

	const baseId = React.useId();

	const tabs = Array.from({ length: 10 });
	return (
		<Box className={styles.container}>
			<Tabs
				variant="scrollable"
				value={value}
				onChange={(_, value) => setValue(value)}
			>
				{tabs.map((_, index) => (
					<Tab
						label={`Item ${index}`}
						id={`${baseId}-tab${index}`}
						aria-controls={`${baseId}-panel${index}`}
					/>
				))}
			</Tabs>
			<div
				role="tabpanel"
				id={`${baseId}-panel${value}`}
				aria-labelledby={`${baseId}-tab${value}`}
			>
				Item {value}
			</div>
		</Box>
	);
};
