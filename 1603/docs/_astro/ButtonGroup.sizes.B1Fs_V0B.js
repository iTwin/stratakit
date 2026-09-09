var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";

export default () => {
	return (
		<Stack spacing={2} sx={{ alignItems: "center" }}>
			<ButtonGroup aria-label="File actions" size="small">
				<Button>Edit</Button>
				<Button>Move</Button>
				<Button>Delete</Button>
			</ButtonGroup>

			<ButtonGroup aria-label="File actions">
				<Button>Edit</Button>
				<Button>Move</Button>
				<Button>Delete</Button>
			</ButtonGroup>

			<ButtonGroup aria-label="File actions" size="large">
				<Button>Edit</Button>
				<Button>Move</Button>
				<Button>Delete</Button>
			</ButtonGroup>
		</Stack>
	);
};
`;export{e as default};