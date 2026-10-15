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
	const { status, start, reset } = useExternalProcess();

	return (
		<>
			<Button onClick={start}>Start process</Button>
			<Snackbar
				open={status === "processing" || status === "complete"}
				onClose={reset}
			>
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
							{status === "processing" ? (
								<InProgressMessage />
							) : (
								<CompleteMessage />
							)}
						</Stack>
					}
				/>
			</Snackbar>
		</>
	);
};

class Process extends EventTarget {
	#timeout: number | null = null;
	#status: Status = "idle";

	get status() {
		return this.#status;
	}

	#setStatus(newStatus: Status) {
		if (newStatus === this.#status) {
			return;
		}
		this.#status = newStatus;
		this.dispatchEvent(new Event("change"));
	}

	start() {
		this.#setStatus("processing");
		this.#timeout = window.setTimeout(() => {
			this.#setStatus("complete");
		}, 2_500);
	}

	stop() {
		if (this.#timeout) {
			window.clearTimeout(this.#timeout);
			this.#timeout = null;
		}
		this.#setStatus("idle");
	}
}

type Status = "idle" | "processing" | "complete";
function useExternalProcess() {
	const processRef = React.useRef(new Process());

	const subscribe = React.useCallback((notify: () => void) => {
		processRef.current.addEventListener("change", notify);
		return () => {
			processRef.current.removeEventListener("change", notify);
			processRef.current.stop();
		};
	}, []);

	const status = React.useSyncExternalStore(
		subscribe,
		() => processRef.current.status,
		() => processRef.current.status,
	);

	return {
		status,
		start: () => processRef.current.start(),
		reset: () => processRef.current.stop(),
	};
}

function CompleteMessage() {
	return (
		<>
			<Icon href={svgStatusSuccess} />
			<Typography>Process complete</Typography>
		</>
	);
}

function InProgressMessage() {
	return (
		<>
			<CircularProgress size={16} color="secondary" />
			<Typography>Your process is in progress...</Typography>
		</>
	);
}
