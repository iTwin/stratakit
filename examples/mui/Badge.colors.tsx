/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import { Icon } from "@stratakit/mui";

import svgRejected from "@stratakit/icons/status-rejected.svg";
import svgRunning from "@stratakit/icons/status-running.svg";
import svgSuccess from "@stratakit/icons/status-success.svg";
import svgWarning from "@stratakit/icons/status-warning.svg";

export default () => {
	return (
		<Stack spacing={2} direction="row" useFlexGap sx={{ flexWrap: "wrap" }}>
			<Badge
				badgeContent={
					<>
						<Icon href={svgRunning} />
						Running
					</>
				}
				color="info"
				inline
			/>
			<Badge
				badgeContent={
					<>
						<Icon href={svgSuccess} />
						Approved
					</>
				}
				color="success"
				inline
			/>
			<Badge
				badgeContent={
					<>
						<Icon href={svgWarning} />
						Unstable
					</>
				}
				color="warning"
				inline
			/>
			<Badge
				badgeContent={
					<>
						<Icon href={svgRejected} />
						Rejected
					</>
				}
				color="error"
				inline
			/>
		</Stack>
	);
};
