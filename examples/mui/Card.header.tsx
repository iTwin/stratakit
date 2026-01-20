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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Icon } from "@stratakit/mui";

import svgMore from "@stratakit/icons/more-vertical.svg";
import styles from "./Card.header.module.css";

export default () => {
	return (
		<Card className={styles.card} variant="outlined" role="group">
			<CardHeader
				title="Stadium"
				subheader="January 16, 2026"
				action={
					<Tooltip title="More actions" describeChild={false}>
						<IconButton>
							<Icon href={svgMore} />
						</IconButton>
					</Tooltip>
				}
			/>
			<CardMedia
				className={styles.media}
				component="img"
				height="140"
				image="https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9"
				alt=""
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					Stadium is a place for outdoor sports, concerts, or other events and
					activities.
				</Typography>
			</CardContent>
			<CardActions>
				<Button>View</Button>
				<Button>Edit</Button>
			</CardActions>
		</Card>
	);
};
