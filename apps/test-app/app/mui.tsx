/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Container, Divider, Link, Stack, Typography } from "@mui/material";
import { Root } from "@stratakit/mui";
import AccordionActions from "examples/mui/Accordion.actions.tsx";
import AccordionDefault from "examples/mui/Accordion.default.tsx";
import AlertDefault from "examples/mui/Alert.default.tsx";
import AlertTitle from "examples/mui/Alert.title.tsx";
import AppBarDefault from "examples/mui/AppBar.default.tsx";
import AutocompleteDefault from "examples/mui/Autocomplete.default.tsx";
import AvatarDefault from "examples/mui/Avatar.default.tsx";
import AvatarGroupDefault from "examples/mui/AvatarGroup.default.tsx";
import BackdropDefault from "examples/mui/Backdrop.default.tsx";
import BadgeDefault from "examples/mui/Badge.default.tsx";
import BottomNavigationDefault from "examples/mui/BottomNavigation.default.tsx";
import BreadcrumbsDefault from "examples/mui/Breadcrumbs.default.tsx";
import ButtonPermutations_ from "examples/mui/Button._permutations.js";
import ButtonColors from "examples/mui/Button.colors.tsx";
import ButtonDefault from "examples/mui/Button.default.tsx";
import ButtonIcons from "examples/mui/Button.icons.tsx";
import ButtonVariants from "examples/mui/Button.variants.tsx";
import ButtonGroupDefault from "examples/mui/ButtonGroup.default.tsx";
import CardActions from "examples/mui/Card.actions.tsx";
import CardDefault from "examples/mui/Card.default.tsx";
import CardHeader from "examples/mui/Card.header.tsx";
import CheckboxChecked from "examples/mui/Checkbox.checked.tsx";
import CheckboxDefault from "examples/mui/Checkbox.default.tsx";
import CheckboxIndeterminate from "examples/mui/Checkbox.indeterminate.tsx";
import ChipDeletable_ from "examples/mui/Chip._deletable.tsx";
import ChipDefault from "examples/mui/Chip.default.tsx";
import ChipOutlined from "examples/mui/Chip.outlined.tsx";
import CircularProgressDefault from "examples/mui/CircularProgress.default.tsx";
import DialogDefault from "examples/mui/Dialog.default.tsx";
import DividerDefault from "examples/mui/Divider.default.tsx";
import DrawerDefault from "examples/mui/Drawer.default.tsx";
import FabDefault from "examples/mui/Fab.default.tsx";
import FormControlGroup from "examples/mui/FormControl.group.tsx";
import IconButtonColors_ from "examples/mui/IconButton._colors.tsx";
import IconButtonDefault from "examples/mui/IconButton.default.tsx";
import LinearProgressDefault from "examples/mui/LinearProgress.default.tsx";
import LinkColors_ from "examples/mui/Link._colors.tsx";
import LinkDefault from "examples/mui/Link.default.tsx";
import ListAvatar from "examples/mui/List.avatar.tsx";
import ListDefault from "examples/mui/List.default.tsx";
import ListSubheader from "examples/mui/List.subheader.tsx";
import MenuDefault from "examples/mui/Menu.default.tsx";
import MenuListDefault from "examples/mui/MenuList.default.tsx";
import MobileStepperDefault from "examples/mui/MobileStepper.default.tsx";
import NativeSelectDefault from "examples/mui/NativeSelect.default.tsx";
import PaginationDefault from "examples/mui/Pagination.default.tsx";
import PaperDefault from "examples/mui/Paper.default.tsx";
import PopoverDefault from "examples/mui/Popover.default.tsx";
import RadioGroupDefault from "examples/mui/RadioGroup.default.tsx";
import RatingDefault from "examples/mui/Rating.default.tsx";
import SelectDefault from "examples/mui/Select.default.tsx";
import SkeletonDefault from "examples/mui/Skeleton.default.tsx";
import SliderDefault from "examples/mui/Slider.default.tsx";
import SnackbarDefault from "examples/mui/Snackbar.default.tsx";
import SpeedDialDefault from "examples/mui/SpeedDial.default.tsx";
import StepperDefault from "examples/mui/Stepper.default.tsx";
import StepperOptional from "examples/mui/Stepper.optional.tsx";
import SwitchChecked from "examples/mui/Switch.checked.tsx";
import SwitchDefault from "examples/mui/Switch.default.tsx";
import TableDefault from "examples/mui/Table.default.tsx";
import TabsDefault from "examples/mui/Tabs.default.tsx";
import TextFieldDefault from "examples/mui/TextField.default.tsx";
import TextFieldMultiline from "examples/mui/TextField.multiline.tsx";
import ToggleButtonDefault from "examples/mui/ToggleButton.default.tsx";
import TooltipDefault from "examples/mui/Tooltip.default.tsx";
import TypographyDefault from "examples/mui/Typography.default.tsx";
import { isProduction, useColorScheme } from "./~utils.tsx";

import type * as React from "react";
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
			<Container
				maxWidth="lg"
				sx={{ p: 4, minBlockSize: "100dvb" }}
				component="main"
			>
				<Typography variant="h4" component="h1">
					StrataKit MUI theme
				</Typography>

				<Divider sx={{ mt: 2, mb: 2 }} />

				<Stack spacing={2} alignItems="start">
					<ComponentExamples name="Accordion">
						<Stack spacing={1} alignSelf="stretch">
							<AccordionDefault />
							<AccordionActions />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Alert">
						<Stack spacing={1} alignSelf="stretch">
							<AlertDefault />
							<AlertTitle />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="AppBar">
						<Stack spacing={1} alignSelf="stretch">
							<AppBarDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Autocomplete">
						<AutocompleteDefault />
					</ComponentExamples>

					<ComponentExamples name="Avatar">
						<AvatarDefault />
					</ComponentExamples>

					<ComponentExamples name="AvatarGroup">
						<AvatarGroupDefault />
					</ComponentExamples>

					<ComponentExamples name="Backdrop">
						<BackdropDefault />
					</ComponentExamples>

					<ComponentExamples name="Badge">
						<BadgeDefault />
					</ComponentExamples>

					<ComponentExamples name="BottomNavigation">
						<Stack spacing={1} alignSelf="stretch">
							<BottomNavigationDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Breadcrumbs">
						<BreadcrumbsDefault />
					</ComponentExamples>

					<ComponentExamples name="Button">
						<ButtonDefault />

						<Stack spacing={1} direction="row">
							<ButtonVariants />
						</Stack>

						<Stack spacing={1} direction="row">
							<ButtonColors />
						</Stack>

						<Stack spacing={1} direction="row">
							<ButtonIcons />
						</Stack>

						{!isProduction && (
							<Stack spacing={1}>
								<ButtonPermutations_ />
							</Stack>
						)}
					</ComponentExamples>

					<ComponentExamples name="ButtonGroup">
						<ButtonGroupDefault />
					</ComponentExamples>

					<ComponentExamples name="Card">
						<CardDefault />
						<CardActions />
						<CardHeader />
					</ComponentExamples>

					<ComponentExamples name="Checkbox">
						<CheckboxDefault />
						<CheckboxChecked />
						<CheckboxIndeterminate />
					</ComponentExamples>

					<ComponentExamples name="Chip">
						<Stack spacing={1} direction="row">
							<ChipDefault />
							<ChipOutlined />
							{!isProduction && <ChipDeletable_ />}
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="CircularProgress">
						<CircularProgressDefault />
					</ComponentExamples>

					<ComponentExamples name="Dialog">
						<DialogDefault />
					</ComponentExamples>

					<ComponentExamples name="Divider">
						<Stack spacing={1} alignSelf="stretch">
							<DividerDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Drawer">
						<DrawerDefault />
					</ComponentExamples>

					<ComponentExamples name="Fab">
						<FabDefault />
					</ComponentExamples>

					<ComponentExamples name="FormControl">
						<FormControlGroup />
					</ComponentExamples>

					<ComponentExamples name="IconButton">
						<IconButtonDefault />

						{!isProduction && (
							<Stack spacing={1} direction="row">
								<IconButtonColors_ />
							</Stack>
						)}
					</ComponentExamples>

					<ComponentExamples name="LinearProgress">
						<Stack spacing={1} alignSelf="stretch">
							<LinearProgressDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Link">
						<LinkDefault />

						<Stack spacing={1} direction="row">
							{!isProduction && <LinkColors_ />}
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="List">
						<Stack spacing={1} alignSelf="stretch">
							<ListDefault />
							<ListAvatar />
							<ListSubheader />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Menu">
						<MenuDefault />
					</ComponentExamples>

					<ComponentExamples name="MenuList">
						<MenuListDefault />
					</ComponentExamples>

					<ComponentExamples name="MobileStepper">
						<Stack spacing={1} alignSelf="stretch">
							<MobileStepperDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="NativeSelect">
						<NativeSelectDefault />
					</ComponentExamples>

					<ComponentExamples name="Pagination">
						<PaginationDefault />
					</ComponentExamples>

					<ComponentExamples name="Paper">
						<PaperDefault />
					</ComponentExamples>

					<ComponentExamples name="Popover">
						<PopoverDefault />
					</ComponentExamples>

					<ComponentExamples name="RadioGroup">
						<RadioGroupDefault />
					</ComponentExamples>

					<ComponentExamples name="Rating">
						<RatingDefault />
					</ComponentExamples>

					<ComponentExamples name="Select">
						<SelectDefault />
					</ComponentExamples>

					<ComponentExamples name="Skeleton">
						<Stack spacing={1} alignSelf="stretch">
							<SkeletonDefault />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Slider">
						<SliderDefault />
					</ComponentExamples>

					<ComponentExamples name="Snackbar">
						<SnackbarDefault />
					</ComponentExamples>

					<ComponentExamples name="SpeedDial">
						<SpeedDialDefault />
					</ComponentExamples>

					<ComponentExamples name="Stepper">
						<Stack spacing={2} alignSelf="stretch">
							<StepperDefault />

							<StepperOptional />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="Switch">
						<SwitchDefault />
						<SwitchChecked />
					</ComponentExamples>

					<ComponentExamples name="Table">
						<TableDefault />
					</ComponentExamples>

					<ComponentExamples name="Tabs">
						<TabsDefault />
					</ComponentExamples>

					<ComponentExamples name="TextField">
						<Stack spacing={1} direction="row">
							<TextFieldDefault />
							<TextFieldMultiline />
						</Stack>
					</ComponentExamples>

					<ComponentExamples name="ToggleButton">
						<ToggleButtonDefault />
					</ComponentExamples>

					<ComponentExamples name="Tooltip">
						<TooltipDefault />
					</ComponentExamples>

					<ComponentExamples name="Typography">
						<TypographyDefault />
					</ComponentExamples>
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

			<Divider sx={{ mt: 2, mb: 2, alignSelf: "stretch" }} />
		</>
	);
}
