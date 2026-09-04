var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

export default () => {
	const labelId = React.useId();

	return (
		<>
			<LinearProgress
				variant="buffer"
				value={33}
				valueBuffer={66}
				aria-labelledby={labelId}
			/>
			<Typography id={labelId}>Buffering results…</Typography>
		</>
	);
};
`;export{e as default};