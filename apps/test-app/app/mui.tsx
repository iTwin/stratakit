/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Alert,
	Autocomplete,
	Box,
	Breadcrumbs,
	Button,
	Checkbox,
	Chip,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	FormControl,
	IconButton,
	InputLabel,
	Link,
	Menu,
	MenuItem,
	Pagination,
	Paper,
	Select,
	Stack,
	Switch,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Tabs,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { Icon, Root } from "@stratakit/mui";
import ButtonDefault from "examples/mui/Button.default.tsx";
import { useColorScheme } from "./~utils.tsx";

import type { MetaFunction } from "react-router";

import svgPlaceholder from "@stratakit/icons/placeholder.svg";

// ----------------------------------------------------------------------------

export const meta: MetaFunction = () => {
	return [{ title: "StrataKit MUI theme" }];
};

// ----------------------------------------------------------------------------

export default function Page() {
	const colorScheme = useColorScheme();
	return (
		<Root colorScheme={colorScheme}>
			<Container maxWidth="lg" sx={{ p: 4, minBlockSize: "100dvb" }}>
				<Typography variant="h4" component="h1">
					StrataKit MUI theme
				</Typography>

				<Divider sx={{ mt: 2, mb: 2 }} />

				<Stack spacing={2}>
					<Stack spacing={1} direction="row">
						<Link href="#">Default</Link>
						<Link href="#" sx={{ color: "primary.dark" }}>
							Accent
						</Link>
					</Stack>

					<Stack spacing={1} direction="row" alignItems="center">
						<ButtonDefault />
						<Button variant="outlined" endIcon={<Icon href={svgPlaceholder} />}>
							Outlined
						</Button>
						<Button variant="outlined" color="primary">
							Outlined
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

					<Stack spacing={1} direction="row">
						<TextField label="Input" variant="outlined" />
						<TextField label="Textarea" variant="outlined" multiline />
					</Stack>

					<Stack spacing={1} direction="row">
						<AutocompleteExample />
						<SelectExample />
					</Stack>

					<Stack spacing={1} direction="row">
						<Chip label="Default Chip" />
						<Chip label="Outlined Chip" variant="outlined" />
						<Chip
							label="Deletable Chip"
							variant="outlined"
							onDelete={() => {}}
						/>
					</Stack>

					<Stack spacing={1} direction="row">
						<BreadcrumbsExample />
					</Stack>

					<AccordionExample />

					<Stack spacing={1} direction="row">
						<MenuExample />
					</Stack>

					<Stack spacing={1} direction="row">
						<DialogExample />
					</Stack>

					<Stack spacing={1} direction="row">
						<TabsExample />
					</Stack>

					<Stack spacing={1}>
						<Alert severity="success">
							Here is a gentle confirmation that your action was successful.
						</Alert>
					</Stack>

					<Stack spacing={1}>
						<TableExample />
						<Pagination
							count={10}
							showFirstButton
							showLastButton
							sx={{ alignSelf: "center" }}
						/>
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
				variant="contained"
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
			<Button variant="contained" onClick={() => setOpen(true)}>
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

function SelectExample() {
	return (
		<FormControl>
			<InputLabel id="demo-simple-select-label">Age</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				label="Age"
				defaultValue={10}
			>
				<MenuItem value={10}>Ten</MenuItem>
				<MenuItem value={20}>Twenty</MenuItem>
				<MenuItem value={30}>Thirty</MenuItem>
			</Select>
		</FormControl>
	);
}

function AutocompleteExample() {
	const options = ["Option 1", "Option 2"];

	return (
		<Autocomplete
			id="controllable-states-demo"
			options={options}
			sx={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="Autocomplete" />}
		/>
	);
}

function BreadcrumbsExample() {
	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Link href="/">Home</Link>
			<Link href="#">Packages</Link>
			<Typography sx={{ color: "text.primary" }}>@stratakit/mui</Typography>
		</Breadcrumbs>
	);
}

function AccordionExample() {
	return (
		<Accordion>
			<AccordionSummary aria-controls="panel1-content" id="panel1-header">
				<Typography component="span">Accordion</Typography>
			</AccordionSummary>
			<AccordionDetails>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
				malesuada lacus ex, sit amet blandit leo lobortis eget.
			</AccordionDetails>
		</Accordion>
	);
}

function TableExample() {
	const rows = [
		{ name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
		{ name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
		{
			name: "Frozen yoghurt",
			calories: 159,
			fat: 6.0,
			carbs: 24,
			protein: 4.0,
		},
		{ name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
		{
			name: "Ice cream sandwich",
			calories: 237,
			fat: 9.0,
			carbs: 37,
			protein: 4.3,
		},
	];

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell sortDirection="asc">
							<TableSortLabel active direction="asc">
								Dessert (100g serving)
							</TableSortLabel>
						</TableCell>
						<TableCell align="right">Calories</TableCell>
						<TableCell align="right">Fat&nbsp;(g)</TableCell>
						<TableCell align="right">Carbs&nbsp;(g)</TableCell>
						<TableCell align="right">Protein&nbsp;(g)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.name}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell align="right">{row.calories}</TableCell>
							<TableCell align="right">{row.fat}</TableCell>
							<TableCell align="right">{row.carbs}</TableCell>
							<TableCell align="right">{row.protein}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
