/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import styles from "./Card.actions.module.css";

export default () => {
	return (
		<Card className={styles.card} variant="outlined">
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
			<CardHeader title="Stadium" />
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					Stadium is a place for outdoor sports, concerts, or other events and
					activities.
				</Typography>
			</CardContent>
			<CardActions>
				<Button render={<a href="#" />} nativeButton={false}>
					View
				</Button>
				<Button render={<a href="#" />} nativeButton={false}>
					Edit
				</Button>
			</CardActions>
		</Card>
	);
};
