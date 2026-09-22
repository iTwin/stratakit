/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { Icon } from "@stratakit/mui";

import svgUpload from "@stratakit/icons/upload.svg";
import styles from "./FileUpload.default.module.css";

export default () => {
	return (
		<Button
			variant="contained"
			startIcon={<Icon href={svgUpload} />}
			render={<label role={undefined} tabIndex={undefined} />}
			nativeButton={false}
		>
			Upload
			<input
				type="file"
				multiple
				style={visuallyHidden}
				className={styles.input}
			/>
		</Button>
	);
};
