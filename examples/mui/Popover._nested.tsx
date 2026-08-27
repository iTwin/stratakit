/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import styles from "./Popover._nested.module.css";

export default () => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null,
	);
	const [coordinateAnchorEl, setCoordinateAnchorEl] =
		React.useState<HTMLButtonElement | null>(null);
	const [open, setOpen] = React.useState(false);
	const [coordinateOpen, setCoordinateOpen] = React.useState(false);

	const headingId = React.useId();

	const close = () => {
		setCoordinateOpen(false);
		setOpen(false);
	};

	return (
		<>
			<Button
				aria-haspopup="dialog"
				aria-expanded={open}
				onClick={() => setOpen(true)}
				ref={setAnchorEl}
			>
				Map layers
			</Button>
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={close}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				slotProps={{
					paper: {
						className: styles.popover,
						"aria-labelledby": headingId,
					},
				}}
			>
				<Typography
					variant="headline-sm"
					render={<h2 />}
					id={headingId}
					gutterBottom={true}
				>
					Map layers
				</Typography>
				<Typography color="textSecondary" gutterBottom={true}>
					Toggle overlays for the current view or adjust how the base map is
					projected.
				</Typography>
				<Button
					variant="outlined"
					aria-haspopup="dialog"
					aria-expanded={coordinateOpen}
					onClick={() => setCoordinateOpen(true)}
					ref={setCoordinateAnchorEl}
				>
					Coordinate system
				</Button>
				<CoordinateSystemPopover
					open={coordinateOpen}
					anchorEl={coordinateAnchorEl}
					onClose={() => setCoordinateOpen(false)}
				/>
			</Popover>
		</>
	);
};

interface CoordinateSystemPopoverProps {
	open: boolean;
	anchorEl: HTMLElement | null;
	onClose: () => void;
}

function CoordinateSystemPopover(props: CoordinateSystemPopoverProps) {
	const headingId = React.useId();

	const { open, anchorEl, onClose } = props;

	return (
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={onClose}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			slotProps={{
				paper: {
					className: styles.popover,
					"aria-labelledby": headingId,
				},
			}}
		>
			<Typography
				variant="headline-sm"
				render={<h3 />}
				id={headingId}
				gutterBottom={true}
			>
				Coordinate system
			</Typography>
			<Typography gutterBottom={true}>WGS84 (EPSG:4326)</Typography>
			<Typography color="textSecondary" gutterBottom={false}>
				Current projection uses latitude/longitude coordinates with the
				EPSG:4326 WGS84 datum for mapping visualization.
			</Typography>
		</Popover>
	);
}
