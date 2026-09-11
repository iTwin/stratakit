/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { Icon } from "@stratakit/foundations";

import androidSvg from "@stratakit/icons/brand-android.svg";
import appleSvg from "@stratakit/icons/brand-apple.svg";
import bentleySvg from "@stratakit/icons/brand-bentley-systems.svg";
import buildingSvg from "@stratakit/icons/building.svg";
import iTwinSvg from "@stratakit/icons/itwin.svg";
import styles from "./RadioGroup.tiles.module.css";

function RadioTile({
	label,
	description,
	value,
	icon,
	disabled,
}: {
	label: string;
	description?: string;
	value: string;
	icon?: React.ReactNode;
	disabled?: boolean;
}) {
	const id = React.useId();
	const descriptionId = React.useId();

	return (
		<div className={styles.tile}>
			{icon}
			<Typography variant="body-md" render={<label htmlFor={id} />}>
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
				id={id}
				value={value}
				disabled={disabled}
				slotProps={{ input: { "aria-describedby": descriptionId } }}
			/>
		</div>
	);
}

export default () => {
	return (
		<FormControl render={<fieldset />} role="radiogroup">
			<FormLabel render={<legend />}>Design system</FormLabel>
			<RadioGroup name="design-system-tiles" role={undefined}>
				<RadioTile
					value="iTwinUI"
					label="iTwinUI"
					description="Legacy design system"
					icon={<Icon href={iTwinSvg} />}
				/>
				<RadioTile
					value="stratakit"
					label="StrataKit"
					icon={<Icon href={bentleySvg} />}
				/>
				<RadioTile
					value="material"
					label="Material"
					description="Google's design system"
					icon={<Icon href={androidSvg} />}
				/>
				<RadioTile
					value="hig"
					label="Human Interface Guidelines"
					description="Design system for Mac and iOS"
					icon={<Icon href={appleSvg} />}
				/>
				<RadioTile
					value="flori"
					label="Flori"
					description="SAP's design system"
					icon={<Icon href={buildingSvg} />}
				/>
			</RadioGroup>
		</FormControl>
	);
};
