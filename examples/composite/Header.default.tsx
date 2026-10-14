/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { svgMoreVertical } from "@stratakit/icons/more-vertical";
import { svgSearch } from "@stratakit/icons/search";
import { Icon } from "@stratakit/mui";

import styles from "./Header.default.module.css";

export default () => {
	return (
		<header className={styles.header}>
			<Typography variant="body-md" render={<h1 />}>
				StrataKit
			</Typography>

			<Breadcrumbs aria-label="breadcrumb">
				<Button variant="text">Project</Button>
				<Button variant="text">Model</Button>
				<Typography aria-current="page" color="primary">
					Version
				</Typography>
			</Breadcrumbs>

			<ul className={styles.list}>
				<li>
					<IconButton label="Search">
						<Icon href={svgSearch} />
					</IconButton>
				</li>
				<li>
					<IconButton label="More options">
						<Icon href={svgMoreVertical} />
					</IconButton>
				</li>
			</ul>
		</header>
	);
};
