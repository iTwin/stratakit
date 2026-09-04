var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import styles from "./Tabs.sizes.module.css";

export default () => {
	const [value, setValue] = React.useState(0);

	const baseId = React.useId();

	return (
		<Box className={styles.container}>
			<Tabs size="small" value={value} onChange={(_, value) => setValue(value)}>
				<Tab label="Item One" id={\`\${baseId}-tab0\`} />
				<Tab label="Item Two" id={\`\${baseId}-tab1\`} />
				<Tab label="Item Three" id={\`\${baseId}-tab2\`} />
			</Tabs>
			{value === 0 && (
				<div
					role="tabpanel"
					aria-labelledby={\`\${baseId}-tab0\`}
					className={styles.tabPanel}
				>
					Item One
				</div>
			)}
			{value === 1 && (
				<div
					role="tabpanel"
					aria-labelledby={\`\${baseId}-tab1\`}
					className={styles.tabPanel}
				>
					Item Two
				</div>
			)}
			{value === 2 && (
				<div
					role="tabpanel"
					aria-labelledby={\`\${baseId}-tab2\`}
					className={styles.tabPanel}
				>
					Item Three
				</div>
			)}
		</Box>
	);
};
`;export{e as default};