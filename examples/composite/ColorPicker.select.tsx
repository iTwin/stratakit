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

import styles from "./ColorPicker.select.module.css";

const colors: readonly { color?: string; name: string }[] = [
	{ name: "No color" },
	{ color: "#FF0000", name: "Red" },
	{ color: "#FFA500", name: "Orange" },
	{ color: "#FFFF00", name: "Yellow" },
	{ color: "#008000", name: "Green" },
	{ color: "#0000FF", name: "Blue" },
	{ color: "#4B0082", name: "Indigo" },
	{ color: "#EE82EE", name: "Violet" },
];

export default () => {
	const labelId = React.useId();
	const label = "Color";
	return (
		<FormControl>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select
				labelId={labelId}
				label={label}
				displayEmpty
				defaultValue={colors[4].color}
				classes={{ disabled: styles.disabledColorPicker }}
			>
				{colors.map(({ color, name }) => (
					<MenuItem key={name} value={color ?? ""}>
						{color && (
							<ListItemIcon>
								<span
									aria-hidden="true"
									className={styles.swatch}
									style={{ "--swatch-color": color } as React.CSSProperties}
								/>
							</ListItemIcon>
						)}
						<ListItemText>{name}</ListItemText>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
