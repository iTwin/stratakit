/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export default () => {
	const [value, setValue] = React.useState(0);

	const primaryId = React.useId();
	const secondaryId = React.useId();

	return (
		<>
			<Box>
				<Tabs
					textColor="primary"
					value={value}
					onChange={(_, value) => setValue(value)}
				>
					<Tab label="Primary one" id={`${primaryId}-primary0`} />
					<Tab label="Primary two" id={`${primaryId}-primary1`} />
					<Tab label="Primary three" id={`${primaryId}-primary2`} />
				</Tabs>
				{value === 0 && (
					<div role="tabpanel" aria-labelledby={`${primaryId}-primary0`}>
						Primary one
					</div>
				)}
				{value === 1 && (
					<div role="tabpanel" aria-labelledby={`${primaryId}-primary1`}>
						Primary two
					</div>
				)}
				{value === 2 && (
					<div role="tabpanel" aria-labelledby={`${primaryId}-primary2`}>
						Primary three
					</div>
				)}
			</Box>

			<Box>
				<Tabs
					textColor="secondary"
					value={value}
					onChange={(_, value) => setValue(value)}
				>
					<Tab label="Secondary one" id={`${secondaryId}-secondary0`} />
					<Tab label="Secondary two" id={`${secondaryId}-secondary1`} />
					<Tab label="Secondary three" id={`${secondaryId}-secondary2`} />
				</Tabs>
				{value === 0 && (
					<div role="tabpanel" aria-labelledby={`${secondaryId}-secondary0`}>
						Secondary one
					</div>
				)}
				{value === 1 && (
					<div role="tabpanel" aria-labelledby={`${secondaryId}-secondary1`}>
						Secondary two
					</div>
				)}
				{value === 2 && (
					<div role="tabpanel" aria-labelledby={`${secondaryId}-secondary2`}>
						Secondary three
					</div>
				)}
			</Box>
		</>
	);
};
