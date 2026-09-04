/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@stratakit/mui";

import svgDelete from "@stratakit/icons/delete.svg";
import svgEdit from "@stratakit/icons/edit.svg";
import svgMove from "@stratakit/icons/move.svg";

export default () => {
	return (
		<ButtonGroup variant="contained" aria-label="File actions">
			<IconButton label="Edit">
				<Icon href={svgEdit} />
			</IconButton>
			<IconButton label="Move">
				<Icon href={svgMove} />
			</IconButton>
			<IconButton label="Delete">
				<Icon href={svgDelete} />
			</IconButton>
		</ButtonGroup>
	);
};
