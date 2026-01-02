/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";

export default () => {
	return (
		<Card variant="outlined">
			<CardContent>
				<Typography gutterBottom color="secondary" fontSize={14}>
					Word of the Day
				</Typography>
				<Typography variant="h5" component="div">
					be • nev • o • lent
				</Typography>
				<Typography color="secondary" marginBottom={1.5}>
					adjective
				</Typography>
				<Typography variant="body2">
					well meaning and kindly.
					<br />
					"a benevolent smile"
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
};
