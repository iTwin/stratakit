/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { svgUpload } from "@stratakit/icons/upload";
import { Icon } from "@stratakit/mui";

export default () => {
	const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

	return (
		<Stack
			spacing={2}
			direction="row"
			sx={{ alignItems: "center", flexWrap: "wrap" }}
		>
			<Button
				variant="contained"
				startIcon={<Icon href={svgUpload} />}
				render={<label role={undefined} tabIndex={undefined} />}
				nativeButton={false}
			>
				Select files
				<input
					type="file"
					multiple
					style={visuallyHidden}
					onChange={(event) =>
						setSelectedFiles(Array.from(event.currentTarget.files ?? []))
					}
				/>
			</Button>
			{selectedFiles.length > 0 && (
				<Typography role="status">
					<span style={visuallyHidden}>{selectedFiles.length} selected: </span>
					{selectedFiles.map((file) => file.name).join(", ")}
				</Typography>
			)}
		</Stack>
	);
};
