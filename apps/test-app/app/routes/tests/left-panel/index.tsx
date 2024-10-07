/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Button } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";
import styles from "./index.module.css";

export const handle = { title: "LeftPanel" };

export default function Page() {
	return (
		<div className={styles.app}>
			<div className={styles.platformBar}>Platform bar</div>
			<div className={styles.leftPanel} style={{ minWidth: 256 }}>
				Left Panel
			</div>
			<div className={styles.content}>
				<div className={styles.contentSkeleton} />
			</div>
		</div>
	);
}
