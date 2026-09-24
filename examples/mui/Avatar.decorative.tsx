/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import { svgUser } from "@stratakit/icons/user";
import { Icon } from "@stratakit/mui";

import styles from "./Avatar.decorative.module.css";

export default () => {
	return (
		<Link className={styles.link} href="#profile">
			<Avatar>
				<Icon href={svgUser} />
			</Avatar>
			Kit Stratan
		</Link>
	);
};
