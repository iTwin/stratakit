/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
	Box,
	Button,
	Checkbox,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Link,
	Menu,
	MenuItem,
	Stack,
	Switch,
	Tab,
	Tabs,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { Icon } from "@stratakit/foundations";
import { Root } from "@stratakit/mui";
import { useColorScheme } from "./~utils.tsx";

import type { MetaFunction } from "react-router";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

export const meta: MetaFunction = () => {
	return [{ title: "StrataKit theme" }];
};

export default function Page() {
	const colorScheme = useColorScheme();
	return (
		<Root colorScheme={colorScheme}>
			<Container maxWidth="lg" sx={{ p: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
					StrataKit theme for Material UI
				</Typography>

				<Stack spacing={2}>
					<Stack spacing={1} direction="row">
						<Link color="inherit" href="#">
							Default
						</Link>
						<Link href="#">Accent</Link>
					</Stack>

					<Stack spacing={1} direction="row" alignItems="center">
						<Button
							variant="contained"
							startIcon={<Icon href={svgPlaceholder} />}
						>
							Solid
						</Button>
						<Button variant="outlined" endIcon={<Icon href={svgPlaceholder} />}>
							Outline
						</Button>
						<Button>Ghost</Button>

						<Tooltip title="Default">
							<IconButton>
								<Icon href={svgPlaceholder} />
							</IconButton>
						</Tooltip>
					</Stack>

					<Stack spacing={1} direction="row">
						<Checkbox />
						<Checkbox defaultChecked />
						<Checkbox indeterminate />
						<Switch defaultChecked />
					</Stack>

					<div>
						<TextField label="Input" variant="outlined" />
						<TextField label="Textarea" variant="outlined" multiline />
					</div>

					<Stack spacing={1} direction="row">
						<MenuExample />
					</Stack>

					<Stack spacing={1} direction="row">
						<DialogExample />
					</Stack>

					<Stack spacing={1} direction="row">
						<TabsExample />
					</Stack>
				</Stack>
			</Container>
		</Root>
	);
}

function MenuExample() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClose = () => {
		setAnchorEl(null);
	};

	const buttonId = React.useId();
	const menuId = React.useId();

	return (
		<div>
			<Button
				variant="outlined"
				id={buttonId}
				aria-controls={open ? menuId : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={(event) => setAnchorEl(event.currentTarget)}
			>
				Open menu
			</Button>
			<Menu
				id={menuId}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					list: {
						"aria-labelledby": buttonId,
					},
				}}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handleClose}>Logout</MenuItem>
			</Menu>
		</div>
	);
}

function DialogExample() {
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Button variant="outlined" onClick={() => setOpen(true)}>
				Open dialog
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Important decision</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{`Are you sure you want to use MUI? This decision cannot be undone.`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>No</Button>
					<Button variant="contained" onClick={handleClose}>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

function TabsExample() {
	const [value, setValue] = React.useState(0);

	const baseId = React.useId();

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={(_, value) => setValue(value)}
					aria-label="basic tabs example"
				>
					<Tab
						label="Item One"
						id={`${baseId}-tab0`}
						aria-controls={`${baseId}-panel0`}
					/>
					<Tab
						label="Item Two"
						id={`${baseId}-tab1`}
						aria-controls={`${baseId}-panel1`}
					/>
					<Tab
						label="Item Three"
						id={`${baseId}-tab2`}
						aria-controls={`${baseId}-panel2`}
					/>
				</Tabs>
			</Box>
			{value === 0 && (
				<div
					role="tabpanel"
					id={`${baseId}-panel0`}
					aria-labelledby={`${baseId}-tab0`}
				>
					Item One
				</div>
			)}
			{value === 1 && (
				<div
					role="tabpanel"
					id={`${baseId}-panel1`}
					aria-labelledby={`${baseId}-tab1`}
				>
					Item Two
				</div>
			)}
			{value === 2 && (
				<div
					role="tabpanel"
					id={`${baseId}-panel2`}
					aria-labelledby={`${baseId}-tab2`}
				>
					Item Three
				</div>
			)}
		</Box>
	);
}
