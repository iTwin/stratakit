/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import styles from "./Card.loading.module.css";

export default () => {
	return (
		<Card className={styles.card}>
			<CardMedia className={styles.media}>
				<CircularProgress color="secondary" />
			</CardMedia>
			<CardHeader title={<Skeleton variant="rounded" width="50%" />} />
			<CardContent render={<Stack spacing={1} />}>
				<Skeleton variant="rounded" />
				<Skeleton variant="rounded" width="70%" />
			</CardContent>
		</Card>
	);
};
