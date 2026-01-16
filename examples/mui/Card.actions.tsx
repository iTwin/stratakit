/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import styles from "./Card.actions.module.css";

export default () => {
	return (
		<Card className={styles.card} variant="outlined">
			<CardActionArea component="a" href="#">
				<CardMedia
					className={styles.media}
					component="img"
					height="140"
					image="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9"
					alt=""
				/>
				<CardContent>
					<Typography gutterBottom variant="h6" component="div">
						Stadium
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Stadium is a place for outdoor sports, concerts, or other events and
						activities.
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button>View</Button>
				<Button>Edit</Button>
			</CardActions>
		</Card>
	);
};
