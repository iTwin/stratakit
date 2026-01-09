/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Icon } from "@stratakit/mui";

import imageIcon from "@stratakit/icons/image.svg";
import styles from "./Card.default.module.css";

export default () => {
	return (
		<Card className={styles.card} variant="outlined">
			<CardActionArea
				component="a"
				href="https://github.com/iTwin/design-system/"
			>
				<CardMedia>
					<Icon
						className={styles.icon}
						href={`${imageIcon}#icon-large`}
						size="large"
					/>
				</CardMedia>
				<CardContent>
					<Typography gutterBottom variant="h3" component="div">
						StrataKit
					</Typography>
					<Typography variant="body2" color="text.secondary">
						StrataKit is a set of libraries for the new Strata Design System.
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
