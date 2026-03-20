/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Divider from "@mui/material/Divider";

import styles from "./Divider.presentational.module.css";

export default () => {
	return (
		<div className={styles.wrapper}>
			<ul>
				<li>
					<a href="/dashboard">Dashboard</a>
				</li>
				<li>
					<a href="/create">Create</a>
				</li>
			</ul>
			<Divider render={<div role={undefined} />} role="presentation" />
			<ul>
				<li>
					<a href="/account">Account</a>
				</li>
				<li>
					<a href="/notifications">Notifications</a>
				</li>
			</ul>
		</div>
	);
};
