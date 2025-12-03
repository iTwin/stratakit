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
	Link,
	Menu,
	MenuItem,
	Switch,
	styled,
	Tab,
	Tabs,
	TextField,
	ThemeProvider,
	Typography,
} from "@mui/material";
import { createTheme } from "@stratakit/mui";

import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
	return [{ title: "StrataKit theme" }];
};

const FlexBox = styled(Box)({
	display: "flex",
	gap: 8,
	marginBlockEnd: 8,
});

export default function Page() {
	return (
		<ThemeProvider theme={createTheme()}>
			<Box sx={{ display: "flex", height: "100vh" }}>
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<Container maxWidth="lg">
						<Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
							StrataKit theme for Material UI
						</Typography>

						<FlexBox>
							<Link color="inherit" href="#">
								Default
							</Link>
							<Link href="#">Accent</Link>
						</FlexBox>

						<FlexBox>
							<Button variant="contained">Solid</Button>
							<Button variant="outlined">Outline</Button>
							<Button>Ghost</Button>
						</FlexBox>

						<FlexBox>
							<Checkbox />
							<Checkbox defaultChecked />
							<Checkbox indeterminate />
							<Switch defaultChecked />
						</FlexBox>

						<FlexBox>
							<TextField label="Input" variant="outlined" />
							<TextField label="Textarea" variant="outlined" multiline />
						</FlexBox>

						<FlexBox>
							<MenuExample />
						</FlexBox>

						<FlexBox>
							<DialogExample />
						</FlexBox>

						<FlexBox>
							<TabsExample />
						</FlexBox>
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
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
