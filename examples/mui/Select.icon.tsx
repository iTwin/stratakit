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
import { Icon } from "@stratakit/mui";

import circleIcon from "@stratakit/icons/circle.svg";
import rectangleIcon from "@stratakit/icons/rectangle.svg";
import starIcon from "@stratakit/icons/star.svg";
import styles from "./Select.icon.module.css";

export default () => {
	const labelId = React.useId();
	const label = "Choose a shape:";
	return (
		<FormControl className={styles.formControl}>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select
				labelId={labelId}
				label={label}
				defaultValue={2}
				slotProps={{
					input: {
						className: styles.input,
					},
				}}
			>
				<MenuItem value={1}>
					<ListItemIcon>
						<Icon href={rectangleIcon} />
					</ListItemIcon>
					<ListItemText>Rectangle</ListItemText>
				</MenuItem>
				<MenuItem value={2}>
					<ListItemIcon>
						<Icon href={circleIcon} />
					</ListItemIcon>
					<ListItemText>Circle</ListItemText>
				</MenuItem>
				<MenuItem value={3}>
					<ListItemIcon>
						<Icon href={starIcon} />
					</ListItemIcon>
					<ListItemText>Star</ListItemText>
				</MenuItem>
			</Select>
		</FormControl>
	);
};
