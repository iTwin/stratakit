var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export default () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClose = () => setAnchorEl(null);

	const mainLabelId = React.useId();

	const [sortOrder, setSortOrder] = React.useState("Newest first");

	return (
		<>
			<Button
				aria-haspopup="true"
				aria-expanded={open ? "true" : "false"}
				onClick={(event) => setAnchorEl(event.currentTarget)}
			>
				<Typography color="textSecondary" id={mainLabelId}>
					Sort by:
				</Typography>
				&nbsp;{sortOrder}
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					list: {
						"aria-labelledby": mainLabelId,
					},
				}}
			>
				<MenuItem
					role="menuitemradio"
					aria-checked={sortOrder === "Newest first" ? "true" : "false"}
					selected={sortOrder === "Newest first"}
					onClick={() => setSortOrder("Newest first")}
				>
					Newest first
				</MenuItem>
				<MenuItem
					role="menuitemradio"
					aria-checked={sortOrder === "Oldest first" ? "true" : "false"}
					selected={sortOrder === "Oldest first"}
					onClick={() => setSortOrder("Oldest first")}
				>
					Oldest first
				</MenuItem>
				<MenuItem
					role="menuitemradio"
					aria-checked={sortOrder === "Most comments" ? "true" : "false"}
					selected={sortOrder === "Most comments"}
					onClick={() => setSortOrder("Most comments")}
				>
					Most comments
				</MenuItem>
			</Menu>
		</>
	);
};
`;export{e as default};