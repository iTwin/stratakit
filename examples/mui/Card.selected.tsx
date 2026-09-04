/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { Icon } from "@stratakit/foundations";

import checkmarkSvg from "@stratakit/icons/checkmark.svg";
import styles from "./Card.selected.module.css";

export default () => {
	const [selected, setSelected] = React.useState(true);
	const checkboxId = React.useId();
	const describedById = React.useId();
	return (
		<Card className={styles.card} data-active={selected}>
			<input
				type="checkbox"
				checked={selected}
				style={visuallyHidden}
				id={checkboxId}
				aria-describedby={describedById}
				onChange={(event) => setSelected(event.target.checked)}
			/>
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

			<CardHeader
				title={
					<Stack
						direction="row"
						spacing={1}
						render={<span />}
						className={styles.title}
					>
						{selected && (
							<Icon href={`${checkmarkSvg}#icon-large`} size="large" />
						)}
						<CardActionArea
							render={<label htmlFor={checkboxId} />}
							nativeButton={false}
						>
							Stadium
						</CardActionArea>
					</Stack>
				}
			/>
			<CardContent>
				<Typography>
					Stadium is{" "}
					<span id={describedById}>
						a place for outdoor sports, concerts, or other events and
						activities.
					</span>
				</Typography>
			</CardContent>
		</Card>
	);
};
