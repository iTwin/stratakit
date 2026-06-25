/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default () => {
	return (
		<ButtonGroup aria-label="File actions">
			<Button>Edit</Button>
			<Button>Move</Button>
			<Button>Delete</Button>
		</ButtonGroup>
	);
};
