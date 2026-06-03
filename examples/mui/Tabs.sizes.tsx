/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import styles from "./Tabs.sizes.module.css";

export default () => {
	const [smallValue, setSmallValue] = React.useState(0);
	const [mediumValue, setMediumValue] = React.useState(0);

	const baseId = React.useId();

	return (
		<Stack spacing={1} sx={{ alignSelf: "stretch" }}>
			<Box className={styles.container}>
				<Tabs
					size="small"
					value={smallValue}
					onChange={(_, value) => setSmallValue(value)}
				>
					<Tab label="Small one" id={`${baseId}-small-tab0`} />
					<Tab label="Small two" id={`${baseId}-small-tab1`} />
					<Tab label="Small three" id={`${baseId}-small-tab2`} />
				</Tabs>
				{smallValue === 0 && (
					<div role="tabpanel" aria-labelledby={`${baseId}-small-tab0`}>
						Small one
					</div>
				)}
				{smallValue === 1 && (
					<div role="tabpanel" aria-labelledby={`${baseId}-small-tab1`}>
						Small two
					</div>
				)}
				{smallValue === 2 && (
					<div role="tabpanel" aria-labelledby={`${baseId}-small-tab2`}>
						Small three
					</div>
				)}
			</Box>

			<Box className={styles.container}>
				<Tabs
					size="medium"
					value={mediumValue}
					onChange={(_, value) => setMediumValue(value)}
				>
					<Tab label="Medium one" id={`${baseId}-medium-tab0`} />
					<Tab label="Medium two" id={`${baseId}-medium-tab1`} />
					<Tab label="Medium three" id={`${baseId}-medium-tab2`} />
				</Tabs>
				{mediumValue === 0 && (
					<div role="tabpanel" aria-labelledby={`${baseId}-medium-tab0`}>
						Medium one
					</div>
				)}
				{mediumValue === 1 && (
					<div role="tabpanel" aria-labelledby={`${baseId}-medium-tab1`}>
						Medium two
					</div>
				)}
				{mediumValue === 2 && (
					<div role="tabpanel" aria-labelledby={`${baseId}-medium-tab2`}>
						Medium three
					</div>
				)}
			</Box>
		</Stack>
	);
};
