/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { Icon } from "@stratakit/mui";

import imageIcon from "@stratakit/icons/image.svg";

export default () => {
	return (
		<Card variant="outlined" style={{ maxWidth: 345 }}>
			<CardActionArea
				component="a"
				href="https://github.com/iTwin/design-system/"
			>
				<CardMedia>
					<Icon
						href={`${imageIcon}#icon-large`}
						size="large"
						style={{ width: "100%", height: "unset" }}
					/>
				</CardMedia>
				<CardContent>
					<Typography gutterBottom variant="h3" component="div">
						StrataKit
					</Typography>
					<Typography variant="body2" sx={{ color: "text.secondary" }}>
						StrataKit is a set of libraries for the new Strata Design System.
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
