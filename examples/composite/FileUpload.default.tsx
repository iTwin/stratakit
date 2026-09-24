/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { svgUpload } from "@stratakit/icons/upload";
import { Icon } from "@stratakit/mui";

export default () => {
	return (
		<Button
			variant="contained"
			startIcon={<Icon href={svgUpload} />}
			render={<label role={undefined} tabIndex={undefined} />}
			nativeButton={false}
		>
			Upload
			<input type="file" multiple style={visuallyHidden} />
		</Button>
	);
};
