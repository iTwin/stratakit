var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default () => {
	return (
		<Stack
			spacing={2}
			direction="row"
			sx={{ alignItems: "center", flexWrap: "wrap" }}
		>
			<Button size="small">Small</Button>
			<Button size="medium">Medium</Button>
			<Button size="large">Large</Button>
		</Stack>
	);
};
`;export{e as default};