var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Icon } from "@stratakit/mui";

import svgChat from "@stratakit/icons/chat.svg";
import svgHeart from "@stratakit/icons/heart.svg";
import svgLocation from "@stratakit/icons/location.svg";
import styles from "./Tabs.icon.module.css";

export default () => {
	const [value, setValue] = React.useState(0);

	const baseId = React.useId();

	return (
		<Box className={styles.container}>
			<Tabs value={value} onChange={(_, value) => setValue(value)}>
				<Tab
					label="Recent"
					icon={<Icon href={svgChat} />}
					id={\`\${baseId}-recent\`}
				/>
				<Tab
					label="Favorites"
					icon={<Icon href={svgHeart} />}
					id={\`\${baseId}-favorites\`}
				/>
				<Tab
					label="Nearby"
					icon={<Icon href={svgLocation} />}
					id={\`\${baseId}-nearby\`}
				/>
			</Tabs>
			{value === 0 && (
				<div role="tabpanel" aria-labelledby={\`\${baseId}-recent\`}>
					Recent
				</div>
			)}
			{value === 1 && (
				<div role="tabpanel" aria-labelledby={\`\${baseId}-favorites\`}>
					Favorites
				</div>
			)}
			{value === 2 && (
				<div role="tabpanel" aria-labelledby={\`\${baseId}-nearby\`}>
					Nearby
				</div>
			)}
		</Box>
	);
};
`;export{e as default};