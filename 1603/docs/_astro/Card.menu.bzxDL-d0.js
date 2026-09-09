var e=`/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Icon } from "@stratakit/mui";

import svgMore from "@stratakit/icons/more-vertical.svg";
import styles from "./Card.menu.module.css";

export default () => {
	return (
		<Card className={styles.card}>
			<CardMedia
				className={styles.media}
				render={
					<img
						height="140"
						src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9"
						alt=""
					/>
				}
			/>
			<CardHeader
				title="Stadium"
				subheader="January 16, 2026"
				action={<ActionsMenu />}
			/>
			<CardContent>
				<Typography>
					Stadium is a place for outdoor sports, concerts, or other events and
					activities.
				</Typography>
			</CardContent>
			<CardActions>
				<Button render={<a href="#" />} nativeButton={false}>
					View
				</Button>
			</CardActions>
		</Card>
	);
};

function ActionsMenu() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClose = () => setAnchorEl(null);

	return (
		<>
			<IconButton
				label="More actions"
				aria-haspopup="true"
				aria-expanded={open ? "true" : "false"}
				onClick={(event) => setAnchorEl(event.currentTarget)}
			>
				<Icon href={svgMore} />
			</IconButton>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem onClick={handleClose}>Favorite</MenuItem>
				<MenuItem onClick={handleClose}>Delete</MenuItem>
			</Menu>
		</>
	);
}
`;export{e as default};