/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import styles from "./Card.default.module.css";

export default () => {
	return (
		<Card className={styles.card} variant="outlined">
			<CardMedia
				className={styles.media}
				render={
					<img
						height="140"
						alt=""
						src="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9"
					/>
				}
			/>
			<CardContent>
				<Typography gutterBottom variant="h6" render={<h2 />}>
					<CardActionArea render={<a href="#" />}>Stadium</CardActionArea>
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Stadium is a place for outdoor sports, concerts, or other events and
					activities.
				</Typography>
			</CardContent>
		</Card>
	);
};
