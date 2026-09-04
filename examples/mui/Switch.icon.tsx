/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Icon } from "@stratakit/foundations";

import checkSvg from "@stratakit/icons/checkmark.svg";
import styles from "./Switch.icon.module.css";

export default () => {
	const control = (
		<span className={styles.container}>
			<Switch defaultChecked />
			<Icon href={checkSvg} className={styles.icon} />
		</span>
	);

	return <FormControlLabel control={control} label="With icon" />;
};
