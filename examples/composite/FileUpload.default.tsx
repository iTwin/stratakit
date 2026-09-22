/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { Icon } from "@stratakit/mui";

import svgUpload from "@stratakit/icons/upload.svg";

export default () => {
	return (
		<Button
			variant="contained"
			startIcon={<Icon href={svgUpload} />}
			render={<label />}
			nativeButton={false}
			tabIndex={-1}
		>
			Upload
			<input type="file" multiple style={visuallyHidden} />
		</Button>
	);
};
