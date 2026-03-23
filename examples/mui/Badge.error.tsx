/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Badge from "@mui/material/Badge";
import { Icon } from "@stratakit/mui";

import svgWarning from "@stratakit/icons/status-warning.svg";
import styles from "./Badge.error.module.css";

export default () => {
	return (
		<Badge
			badgeContent={
				<>
					<Icon href={svgWarning} />
					Unstable
				</>
			}
			color="error"
			inline
			slotProps={{
				badge: {
					className: styles.badge,
				},
			}}
		/>
	);
};
