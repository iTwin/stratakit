/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import styles from "./Popover.default.module.css";

export default () => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null,
	);
	const [open, setOpen] = React.useState(false);
	const headingId = React.useId();

	return (
		<>
			<Button
				aria-haspopup="dialog"
				aria-expanded={open}
				onClick={() => setOpen(true)}
				ref={setAnchorEl}
			>
				About Coordinate System
			</Button>
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={() => setOpen(false)}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				slotProps={{
					paper: {
						className: styles.popover,
						"aria-labelledby": headingId,
					},
				}}
			>
				<Stack spacing={1}>
					<Typography variant="headline-sm" render={<h2 />} id={headingId}>
						Coordinate System
					</Typography>
					<Typography variant="body-sm">WGS84 (EPSG:4326)</Typography>
					<Typography variant="caption-md" color="textSecondary">
						Current projection uses latitude/longitude coordinates with
						EPSG:4326 WGS84 datum for mapping visualization.
					</Typography>
				</Stack>
			</Popover>
		</>
	);
};
