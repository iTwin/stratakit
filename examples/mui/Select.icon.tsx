/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { svgCircle } from "@stratakit/icons/circle";
import { svgRectangle } from "@stratakit/icons/rectangle";
import { svgStar } from "@stratakit/icons/star";
import { Icon } from "@stratakit/mui";

export default () => {
	const labelId = React.useId();
	const label = "Favorite shape";
	return (
		<FormControl>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select labelId={labelId} label={label} defaultValue={2}>
				<MenuItem value={1}>
					<ListItemIcon>
						<Icon href={svgRectangle} />
					</ListItemIcon>
					<ListItemText>Rectangle</ListItemText>
				</MenuItem>
				<MenuItem value={2}>
					<ListItemIcon>
						<Icon href={svgCircle} />
					</ListItemIcon>
					<ListItemText>Circle</ListItemText>
				</MenuItem>
				<MenuItem value={3}>
					<ListItemIcon>
						<Icon href={svgStar} />
					</ListItemIcon>
					<ListItemText>Star</ListItemText>
				</MenuItem>
			</Select>
		</FormControl>
	);
};
