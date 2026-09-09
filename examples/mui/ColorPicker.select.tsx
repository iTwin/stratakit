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
	{ color: "#ffffff", name: "White" },
	{ color: "#5a6973", name: "Gray" },
	{ color: "#00121d", name: "Kuretake black manga" },
	{ color: "#002a44", name: "Rhapsody in blue" },
	{ color: "#00426b", name: "Dark imperial blue" },
	{ color: "#005a92", name: "Jetski race" },
	{ color: "#0073ba", name: "French blue" },
	{ color: "#008be1", name: "Blue cola" },
	{ color: "#30b0ff", name: "Fantasy console sky" },
	{ color: "#58bfff", name: "Hello summer" },
	{ color: "#7fceff", name: "Chromis damsel blue" },
	{ color: "#a6ddff", name: "Droplet" },
	{ color: "#cdecff", name: "Lucid dreams" },
	{ color: "#e5f5fd", name: "Kodama white" },
	{ color: "#010200", name: "Registration black" },
	{ color: "#122306", name: "Yuzu soy" },
	{ color: "#23450b", name: "Forest green" },
	{ color: "#346711", name: "Tatzelwurm green" },
	{ color: "#458816", name: "Chlorophyll" },
	{ color: "#56aa1c", name: "Plastic pines" },
	{ color: "#5fbb1f", name: "Field green" },
	{ color: "#67cc22", name: "Green high" },
	{ color: "#91e458", name: "Lilliputian lime" },
	{ color: "#b2ec8b", name: "Green day" },
	{ color: "#d4f4bd", name: "Tea green" },
	{ color: "#eef6e8", name: "Verde pastel" },
	{ color: "#9ba5af", name: "Seryi gray" },
	{ color: "#cf0000", name: "Red epiphyllum" },
	{ color: "#ff6300", name: "Safety orange" },
	{ color: "#ffc335", name: "Rise-n-shine" },
] as const;

export default () => {
	const labelId = React.useId();
	const label = "Color";
	return (
		<FormControl>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select
				labelId={labelId}
				label={label}
				defaultValue={colors[5].color}
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
