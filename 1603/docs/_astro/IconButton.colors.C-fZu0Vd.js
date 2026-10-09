var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { svgPlaceholder } from "@stratakit/icons/placeholder";
import { Icon } from "@stratakit/mui";

export default () => {
	return (
		<Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }}>
			<IconButton color="primary" label="Primary">
				<Icon href={svgPlaceholder} />
			</IconButton>
			<IconButton color="secondary" label="Secondary">
				<Icon href={svgPlaceholder} />
			</IconButton>
			<IconButton color="error" label="Error">
				<Icon href={svgPlaceholder} />
			</IconButton>
		</Stack>
	);
};
`;export{e as default};