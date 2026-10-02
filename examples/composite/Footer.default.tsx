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
			<Typography variant="caption-lg" render={<ul />} className={styles.list}>
				<li>
					<Link color="textSecondary" href="#">
						Terms of service
					</Link>
				</li>
				<li>
					<Link color="textSecondary" href="#">
						Privacy
					</Link>
				</li>
				<li>
					<Link color="textSecondary" href="#">
						Terms of use
					</Link>
				</li>
				<li>
					<Link color="textSecondary" href="#">
						Cookies
					</Link>
				</li>
				<li>
					<Link color="textSecondary" href="#">
						Legal notices
					</Link>
				</li>
			</Typography>
		</footer>
	);
};
