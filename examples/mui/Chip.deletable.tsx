/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Chip from "@mui/material/Chip";

export default () => {
	return (
		<Chip
			label="Deletable Chip"
			onDelete={() => {
				console.log("Deleted");
			}}
		/>
	);
};
