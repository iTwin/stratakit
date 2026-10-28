/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import styles from "./Header.default.module.css";

export default () => {
	return (
		<header className={styles.header}>
			<Typography variant="body-md">Acme app</Typography>

			<Divider
				orientation="vertical"
				role="presentation"
				className={styles.divider}
			/>

			<Breadcrumbs aria-label="breadcrumb">
				<Link href="#">Project</Link>
				<Link href="#">Model</Link>
				<Link aria-current="true" color="textSecondary">
					Version
				</Link>
			</Breadcrumbs>
		</header>
	);
};
