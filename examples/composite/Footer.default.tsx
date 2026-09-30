/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import styles from "./Footer.default.module.css";

export default () => {
	return (
		<footer className={styles.footer}>
			<Typography variant="caption-lg" color="textSecondary">
				© {new Date().getFullYear()} Bentley Systems, Incorporated
			</Typography>
			<Typography
				variant="caption-lg"
				color="textSecondary"
				render={<ul />}
				className={styles.list}
			>
				<li>
					<Link href="#">Terms of service</Link>
				</li>
				<li>
					<Link href="#">Privacy</Link>
				</li>
				<li>
					<Link href="#">Terms of use</Link>
				</li>
				<li>
					<Link href="#">Cookies</Link>
				</li>
				<li>
					<Link href="#">Legal notices</Link>
				</li>
			</Typography>
		</footer>
	);
};
