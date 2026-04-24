/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default () => {
	return (
		<Stack spacing={1} direction="row" useFlexGap sx={{ flexWrap: "wrap" }}>
			<Chip label="Default chip" disabled />
			<Chip label="Outlined Chip" variant="outlined" disabled />
			<Chip
				label="Clickable Chip"
				onClick={() => {
					console.log("Clicked");
				}}
				disabled
			/>
			<Chip
				label="Deletable Chip"
				onDelete={() => {
					console.log("Deleted");
				}}
				disabled
			/>
		</Stack>
	);
};
