/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
	Box,
	Container,
	Divider,
	Link,
	Pagination,
	Stack,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import { Root } from "@stratakit/mui";
import AccordionDefault from "examples/mui/Accordion.default.tsx";
import AlertDefault from "examples/mui/Alert.default.tsx";
import AppBarDefault from "examples/mui/AppBar.default.tsx";
import AutocompleteDefault from "examples/mui/Autocomplete.default.tsx";
import AvatarDefault from "examples/mui/Avatar.default.tsx";
import BackdropDefault from "examples/mui/Backdrop.default.tsx";
import BadgeDefault from "examples/mui/Badge.default.tsx";
import BottomNavigationDefault from "examples/mui/BottomNavigation.default.tsx";
import BreadcrumbsDefault from "examples/mui/Breadcrumbs.default.tsx";
import ButtonColors from "examples/mui/Button.colors.tsx";
import ButtonDefault from "examples/mui/Button.default.tsx";
import ButtonIcons from "examples/mui/Button.icons.tsx";
import ButtonPermutations from "examples/mui/Button.permutations.tsx";
import ButtonVariants from "examples/mui/Button.variants.tsx";
import ButtonGroupDefault from "examples/mui/ButtonGroup.default.tsx";
import CardDefault from "examples/mui/Card.default.tsx";
import CheckboxChecked from "examples/mui/Checkbox.checked.tsx";
import CheckboxDefault from "examples/mui/Checkbox.default.tsx";
import CheckboxIndeterminate from "examples/mui/Checkbox.indeterminate.tsx";
import ChipDefault from "examples/mui/Chip.default.tsx";
import ChipDeletable from "examples/mui/Chip.deletable.tsx";
import ChipOutlined from "examples/mui/Chip.outlined.tsx";
import DialogDefault from "examples/mui/Dialog.default.tsx";
import DividerDefault from "examples/mui/Divider.default.tsx";
import DrawerDefault from "examples/mui/Drawer.default.tsx";
import FloatingActionButtonDefault from "examples/mui/FloatingActionButton.default.tsx";
import IconButtonColors from "examples/mui/IconButton.colors.tsx";
import IconButtonDefault from "examples/mui/IconButton.default.tsx";
import LinkColors from "examples/mui/Link.colors.tsx";
import LinkDefault from "examples/mui/Link.default.tsx";
import ListDefault from "examples/mui/List.default.tsx";
import MenuDefault from "examples/mui/Menu.default.tsx";
import PaperDefault from "examples/mui/Paper.default.tsx";
import ProgressDefault from "examples/mui/Progress.default.tsx";
import RadioGroupDefault from "examples/mui/RadioGroup.default.tsx";
import RatingDefault from "examples/mui/Rating.default.tsx";
import SelectDefault from "examples/mui/Select.default.tsx";
import SkeletonDefault from "examples/mui/Skeleton.default.tsx";
import SliderDefault from "examples/mui/Slider.default.tsx";
import SnackbarDefault from "examples/mui/Snackbar.default.tsx";
import SwitchChecked from "examples/mui/Switch.checked.tsx";
import SwitchDefault from "examples/mui/Switch.default.tsx";
import TableDefault from "examples/mui/Table.default.tsx";
import TextFieldDefault from "examples/mui/TextField.default.tsx";
import TextFieldMultiline from "examples/mui/TextField.multiline.tsx";
import TextFieldVariants from "examples/mui/TextField.variants.tsx";
import ToggleButtonDefault from "examples/mui/ToggleButton.default.tsx";
import TooltipDefault from "examples/mui/Tooltip.default.tsx";
import TypographyDefault from "examples/mui/Typography.default.tsx";
import { useColorScheme } from "./~utils.tsx";

import type { MetaFunction } from "react-router";

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
					<ComponentExamples name="Autocomplete">
						<Stack spacing={1} direction="row">
							<AutocompleteDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Button">
						<Stack spacing={1} direction="row">
							<ButtonDefault />
						</Stack>

						<Stack spacing={1} direction="row">
							<ButtonVariants />
						</Stack>

						<Stack spacing={1} direction="row">
							<ButtonColors />
						</Stack>

						<Stack spacing={1} direction="row">
							<ButtonIcons />
						</Stack>

						<Stack spacing={1} direction="row">
							<ButtonPermutations />
						</Stack>

						<Stack spacing={1} direction="row">
							<IconButtonDefault />
						</Stack>

						<Stack spacing={1} direction="row">
							<IconButtonColors />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Button Group">
						<Stack spacing={1}>
							<ButtonGroupDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Checkbox">
						<Stack spacing={1}>
							<CheckboxDefault />
							<CheckboxChecked />
							<CheckboxIndeterminate />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Floating Action Button">
						<Stack>
							<FloatingActionButtonDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Radio Group">
						<Stack>
							<RadioGroupDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Rating">
						<Stack spacing={1} direction="row">
							<RatingDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Select">
						<Stack spacing={1} direction="row">
							<SelectDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Slider">
						<Stack spacing={1} direction="row">
							<SliderDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Switch">
						<Stack spacing={1}>
							<SwitchDefault />
							<SwitchChecked />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Text Field">
						<Stack spacing={1} direction="row">
							<TextFieldDefault />
							<TextFieldMultiline />
						</Stack>

						<Stack spacing={1} direction="row">
							<TextFieldVariants />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Toggle Button">
						<Stack spacing={1} direction="row">
							<ToggleButtonDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Avatar">
						<Stack spacing={1} direction="row">
							<AvatarDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Badge">
						<Stack spacing={1} direction="row">
							<BadgeDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Chip">
						<Stack spacing={1} direction="row">
							<ChipDefault />
							<ChipOutlined />
							<ChipDeletable />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Divider">
						<Stack spacing={1}>
							<DividerDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="List">
						<Stack spacing={1}>
							<ListDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Table">
						<Stack spacing={1}>
							<TableDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Tooltip">
						<Stack spacing={1} direction="row">
							<TooltipDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Typography">
						<Stack spacing={1} direction="row">
							<TypographyDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Alert">
						<Stack spacing={1}>
							<AlertDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Backdrop">
						<Stack spacing={1} direction="row">
							<BackdropDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Dialog">
						<Stack spacing={1} direction="row">
							<DialogDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Progress">
						<Stack spacing={1}>
							<ProgressDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Skeleton">
						<Stack spacing={1}>
							<SkeletonDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Snackbar">
						<Stack spacing={1} direction="row">
							<SnackbarDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Accordion">
						<Stack spacing={1}>
							<AccordionDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="App Bar">
						<Stack spacing={1}>
							<AppBarDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Card">
						<Stack spacing={1}>
							<CardDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Paper">
						<Stack spacing={1} direction="row">
							<PaperDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Bottom Navigation">
						<Stack spacing={1}>
							<BottomNavigationDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Breadcrumbs">
						<Stack spacing={1} direction="row">
							<BreadcrumbsDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Drawer">
						<Stack spacing={1} direction="row">
							<DrawerDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Link">
						<Stack spacing={1} direction="row">
							<LinkDefault />
						</Stack>

						<Stack spacing={1} direction="row">
							<LinkColors />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Menu">
						<Stack spacing={1} direction="row">
							<MenuDefault />
						</Stack>
					</ComponentExamples>

					<Stack spacing={1} direction="row">
						<TabsExample />
					</Stack>

					<Stack spacing={1}>
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

interface ComponentExamplesProps {
	name: string;
	children?: React.ReactNode;
}

function ComponentExamples(props: ComponentExamplesProps) {
	const { name } = props;
	const id = name.toLowerCase().replace(" ", "-");
	return (
		<>
			<Typography variant="h5" component="h2" id={id}>
				<Link href={`#${id}`}>{name}</Link>
			</Typography>

			{props.children}

			<Divider sx={{ mt: 2, mb: 2 }} />
		</>
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
