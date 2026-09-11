/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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

	const anchorOrigin = {
		vertical: "top" as const,
		horizontal: "center" as const,
	};

	return (
		<>
			<Button onClick={() => setStatus("processing")}>Start process</Button>
			<Snackbar open={status === "processing"} anchorOrigin={anchorOrigin}>
				<SnackbarContent
					message={
						<Stack
							direction="row"
							spacing={1}
							sx={{
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<CircularProgress size={16} />
							<Typography>Your process is in progress...</Typography>
						</Stack>
					}
				/>
			</Snackbar>
			<Snackbar
				open={status === "complete"}
				message="Process complete"
				anchorOrigin={anchorOrigin}
			>
				<Alert severity="success" onClose={() => setStatus("idle")}>
					Process complete
				</Alert>
			</Snackbar>
		</>
	);
};
