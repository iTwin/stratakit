/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import { svgStatusRejected } from "@stratakit/icons/status-rejected";
import { svgStatusRunning } from "@stratakit/icons/status-running";
import { svgStatusSuccess } from "@stratakit/icons/status-success";
import { svgStatusWarning } from "@stratakit/icons/status-warning";
import { Icon } from "@stratakit/mui";

export default () => {
	return (
		<Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }}>
			<Badge
				badgeContent={
					<>
						<Icon href={svgStatusRunning} />
						Running
					</>
				}
				color="info"
				variant="inline"
			/>
			<Badge
				badgeContent={
					<>
						<Icon href={svgStatusSuccess} />
						Approved
					</>
				}
				color="success"
				variant="inline"
			/>
			<Badge
				badgeContent={
					<>
						<Icon href={svgStatusWarning} />
						Unstable
					</>
				}
				color="warning"
				variant="inline"
			/>
			<Badge
				badgeContent={
					<>
						<Icon href={svgStatusRejected} />
						Rejected
					</>
				}
				color="error"
				variant="inline"
			/>
		</Stack>
	);
};
