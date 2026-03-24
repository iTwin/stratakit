/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Skeleton from "@mui/material/Skeleton";
import visuallyHidden from "@mui/utils/visuallyHidden";

export default () => {
	return (
		<>
			<Skeleton />
			<div style={visuallyHidden}>Loading...</div>
		</>
	);
};
