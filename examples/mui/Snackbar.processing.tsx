/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { svgStatusSuccess } from "@stratakit/icons/status-success";
import { Icon } from "@stratakit/mui";

export default () => {
	const [status, setStatus] = React.useState<
		"idle" | "processing" | "complete"
	>("idle");

	React.useEffect(() => {
		if (status !== "processing") {
			return;
		}
		const id = window.setTimeout(() => {
			setStatus("complete");
		}, 2500);

		return () => {
			window.clearTimeout(id);
		};
	}, [status]);

	return (
		<>
			<Button onClick={() => setStatus("processing")}>Start process</Button>
			<Snackbar open={status === "processing"}>
				<SnackbarContent
					message={
						<Stack
							direction="row"
							spacing={2}
							sx={{
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<CircularProgress size={16} color="secondary" />
							<Typography>Your process is in progress...</Typography>
						</Stack>
					}
				/>
			</Snackbar>
			<Snackbar open={status === "complete"}>
				<SnackbarContent
					message={
						<Stack
							direction="row"
							spacing={2}
							sx={{
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Icon href={svgStatusSuccess} />
							<Typography>Process complete</Typography>
						</Stack>
					}
				/>
			</Snackbar>
		</>
	);
};
