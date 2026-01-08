/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default () => {
	return (
		<ButtonGroup aria-label="Text formatting">
			<Button>Bold</Button>
			<Button>Italic</Button>
			<Button>Underline</Button>
		</ButtonGroup>
	);
};
