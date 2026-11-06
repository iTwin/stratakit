/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { svgBrandAndroid } from "@stratakit/icons/brand-android";
import { svgBrandApple } from "@stratakit/icons/brand-apple";
import { svgBrandBentleySystems } from "@stratakit/icons/brand-bentley-systems";
import { svgBuilding } from "@stratakit/icons/building";
import { svgITwin } from "@stratakit/icons/itwin";
import { Icon } from "@stratakit/mui";

import styles from "./RadioTiles.default.module.css";

export default () => {
	return (
		<FormControl render={<fieldset />} role="radiogroup">
			<FormLabel render={<legend />}>Design system</FormLabel>
			<RadioGroup
				name="design-system-tiles"
				role={undefined}
				className={styles.group}
				defaultValue="stratakit"
			>
				<RadioTile
					value="iTwinUI"
					label="iTwinUI"
					description="Legacy design system"
					icon={<Icon href={svgITwin} />}
				/>
				<RadioTile
					value="stratakit"
					label="StrataKit"
					icon={<Icon href={svgBrandBentleySystems} />}
				/>
				<RadioTile
					value="material"
					label="Material"
					description="Google's design system"
					icon={<Icon href={svgBrandAndroid} />}
				/>
				<RadioTile
					value="hig"
					label="Human Interface Guidelines"
					description="Design system for Mac and iOS"
					icon={<Icon href={svgBrandApple} />}
				/>
				<RadioTile
					value="flori"
					label="Flori"
					description="SAP's design system"
					disabled
					icon={<Icon href={svgBuilding} />}
				/>
			</RadioGroup>
		</FormControl>
	);
};

interface RadioTileProps
	extends Omit<
		React.ComponentProps<typeof Radio>,
		"id" | "className" | "slotProps" | "slots"
	> {
	label: string;
	description?: string;
	icon?: React.ReactNode;
}

function RadioTile(props: RadioTileProps) {
	const { label, description, icon, ...rest } = props;
	const id = React.useId();
	const descriptionId = React.useId();

	return (
		<Paper className={styles.tile} variant="outlined">
			{icon}
			<Typography
				variant="body-md"
				render={<label htmlFor={id} className={styles.label} />}
			>
				{label}
			</Typography>
			{description && (
				<Typography
					variant="body-sm"
					className={styles.description}
					id={descriptionId}
				>
					{description}
				</Typography>
			)}
			<Radio
				{...rest}
				id={id}
				className={styles.radio}
				slotProps={{ input: { "aria-describedby": descriptionId } }}
			/>
		</Paper>
	);
}
