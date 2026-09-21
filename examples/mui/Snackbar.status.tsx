/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";

type AlertSeverity = React.ComponentProps<typeof Alert>["severity"];
const statusValues = ["info", "success", "warning", "error"] as AlertSeverity[];

export default () => {
	const [activeStatus, setActiveStatus] = React.useState<
		AlertSeverity | undefined
	>(undefined);

	function clearStatus(status: AlertSeverity) {
		if (activeStatus === status) {
			setActiveStatus(undefined);
		}
	}

	return (
		<>
			<Stack spacing={2} direction="row">
				{statusValues.map((status) => (
					<Button
						key={status}
						onClick={() => setActiveStatus(status)}
						sx={{ textTransform: "capitalize" }}
					>
						{status}
					</Button>
				))}
			</Stack>

			{statusValues.map((status) => (
				<Snackbar
					key={status}
					open={activeStatus === status}
					anchorOrigin={{ vertical: "top", horizontal: "center" }}
					autoHideDuration={2500}
					onClose={() => clearStatus(status)}
				>
					<Alert severity={activeStatus}>
						This is a {activeStatus} snackbar.
					</Alert>
				</Snackbar>
			))}
		</>
	);
};
