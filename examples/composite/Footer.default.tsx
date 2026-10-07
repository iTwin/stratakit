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
			<ul className={styles.list}>
				<li>
					<Link href="https://www.bentley.com/en/legal/privacy-policy/">
						Privacy statement
					</Link>
				</li>
				<li>
					<Link href="https://www.bentley.com/en/legal/web-properties-terms-of-use/">
						Terms of use
					</Link>
				</li>
				<li>
					<Link href="https://www.bentley.com/en/legal/cookie-policy/">
						Cookies
					</Link>
				</li>
			</ul>
		</footer>
	);
};
