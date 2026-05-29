/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default () => {
	const [open, setOpen] = React.useState(false);
	const [discardOpen, setDiscardOpen] = React.useState(false);

	const handleClose = () => {
		setDiscardOpen(true);
	};

	return (
		<>
			<Button onClick={() => setOpen(true)}>Settings</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Settings</DialogTitle>
				<DialogContent>
					<ColorSchemeSelect />
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setDiscardOpen(true);
						}}
					>
						Discard
					</Button>
					<DiscardDialog
						open={discardOpen}
						onClose={() => setDiscardOpen(false)}
						onDiscard={() => {
							setDiscardOpen(false);
							setOpen(false);
						}}
					/>
					<Button
						onClick={() => {
							setOpen(false);
						}}
						color="primary"
					>
						Apply
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

interface DiscardDialogProps {
	open: boolean;
	onClose: () => void;
	onDiscard: () => void;
}

function DiscardDialog(props: DiscardDialogProps) {
	const { open, onClose, onDiscard } = props;
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle render={<h3 />}>Discard changes</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to discard your changes?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={onDiscard} color="primary">
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
}

function ColorSchemeSelect() {
	const labelId = React.useId();
	const label = "Color scheme";

	return (
		<FormControl>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select labelId={labelId} label={label} defaultValue="light">
				<MenuItem value="auto">Auto</MenuItem>
				<MenuItem value="light">Light</MenuItem>
				<MenuItem value="dark">Dark</MenuItem>
			</Select>
		</FormControl>
	);
}
