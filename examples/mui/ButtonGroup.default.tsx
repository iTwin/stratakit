/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button, ButtonGroup } from "@mui/material";

export default () => {
	return (
		<ButtonGroup aria-label="Text formatting">
			<Button>Bold</Button>
			<Button>Italic</Button>
			<Button>Underline</Button>
		</ButtonGroup>
	);
};
