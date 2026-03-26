/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

import styles from "./Divider.presentational.module.css";

export default () => {
	return (
		<>
			<ul className={styles.list}>
				<li>
					<Link href="/dashboard">Dashboard</Link>
				</li>
				<li>
					<Link href="/create">Create</Link>
				</li>
			</ul>
			<Divider
				className={styles.divider}
				render={<div />}
				role="presentation"
			/>
			<ul className={styles.list}>
				<li>
					<Link href="/account">Account</Link>
				</li>
				<li>
					<Link href="/notifications">Notifications</Link>
				</li>
			</ul>
		</>
	);
};
