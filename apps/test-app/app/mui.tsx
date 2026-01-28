/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { type MetaFunction, useLocation } from "react-router";
import { IconButton } from "@mui/material";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { Icon, Root } from "@stratakit/mui";
import * as NavigationList from "@stratakit/structures/unstable_NavigationList";
import AccordionActions from "examples/mui/Accordion.actions.tsx";
import AccordionDefault from "examples/mui/Accordion.default.tsx";
import AlertDefault from "examples/mui/Alert.default.tsx";
import AlertTitle from "examples/mui/Alert.title.tsx";
import AppBarDefault from "examples/mui/AppBar.default.tsx";
import AutocompleteDefault from "examples/mui/Autocomplete.default.tsx";
import AutocompleteMultiple from "examples/mui/Autocomplete.multiple.tsx";
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
import MenuListDefault_ from "examples/mui/MenuList._default.tsx";
import MobileStepperDefault from "examples/mui/MobileStepper.default.tsx";
import NativeSelectDefault from "examples/mui/NativeSelect.default.tsx";
import PaginationDefault from "examples/mui/Pagination.default.tsx";
import PaperDefault from "examples/mui/Paper.default.tsx";
import PopoverDefault from "examples/mui/Popover.default.tsx";
import RadioGroupDefault from "examples/mui/RadioGroup.default.tsx";
import RatingDefault from "examples/mui/Rating.default.tsx";
import SelectDefault from "examples/mui/Select.default.tsx";
import SelectIcon from "examples/mui/Select.icon.tsx";
import SelectMultiple from "examples/mui/Select.multiple.tsx";
import SkeletonDefault from "examples/mui/Skeleton.default.tsx";
import SliderDefault from "examples/mui/Slider.default.tsx";
import SnackbarDefault from "examples/mui/Snackbar.default.tsx";
import SpeedDialDefault from "examples/mui/SpeedDial.default.tsx";
import StepperClickable from "examples/mui/Stepper.clickable.tsx";
import StepperDefault from "examples/mui/Stepper.default.tsx";
import StepperOptional from "examples/mui/Stepper.optional.tsx";
import SwipeableDrawerDefault from "examples/mui/SwipeableDrawer.default.tsx";
import SwitchChecked from "examples/mui/Switch.checked.tsx";
import SwitchDefault from "examples/mui/Switch.default.tsx";
import TableDefault from "examples/mui/Table.default.tsx";
import TableFooter from "examples/mui/Table.footer.tsx";
import TabsDefault from "examples/mui/Tabs.default.tsx";
import TabsScrollable from "examples/mui/Tabs.scrollable.tsx";
import TextFieldDefault from "examples/mui/TextField.default.tsx";
import TextFieldIcon from "examples/mui/TextField.icon.tsx";
import TextFieldMultiline from "examples/mui/TextField.multiline.tsx";
import ToggleButtonDefault from "examples/mui/ToggleButton.default.tsx";
import TooltipDefault from "examples/mui/Tooltip.default.tsx";
import TypographyDefault from "examples/mui/Typography.default.tsx";
import { SkipLinkContext } from "./~navigation.tsx";
import { isProduction, useColorScheme, useIsWideScreen } from "./~utils.tsx";

import svgLink from "@stratakit/icons/link.svg";
import styles from "./mui.module.css";

// ----------------------------------------------------------------------------

export const meta: MetaFunction = () => {
	return [{ title: "StrataKit MUI theme" }];
};

// ----------------------------------------------------------------------------

/**
 * Map of all MUI component examples displayed on this page.
 * Used to generate both the content and the navigation sidebar.
 */
const components: Record<string, React.ReactNode> = {
	Accordion: (
		<Stack spacing={1} alignSelf="stretch">
			<AccordionDefault />
			<AccordionActions />
		</Stack>
	),
	Alert: (
		<Stack spacing={1} alignSelf="stretch">
			<AlertDefault />
			<AlertTitle />
		</Stack>
	),
	AppBar: (
		<Stack spacing={1} alignSelf="stretch">
			<AppBarDefault />
		</Stack>
	),
	Autocomplete: (
		<>
			<AutocompleteDefault />
			<AutocompleteMultiple />
		</>
	),
	Avatar: <AvatarDefault />,
	AvatarGroup: <AvatarGroupDefault />,
	Backdrop: <BackdropDefault />,
	Badge: <BadgeDefault />,
	BottomNavigation: (
		<Stack spacing={1} alignSelf="stretch">
			<BottomNavigationDefault />
		</Stack>
	),
	Breadcrumbs: <BreadcrumbsDefault />,
	Button: (
		<>
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
		</>
	),
	ButtonGroup: <ButtonGroupDefault />,
	Card: (
		<>
			<CardDefault />
			<CardActions />
			<CardHeader />
		</>
	),
	Checkbox: (
		<>
			<CheckboxDefault />
			<CheckboxChecked />
			<CheckboxIndeterminate />
		</>
	),
	Chip: (
		<Stack spacing={1} direction="row">
			<ChipDefault />
			<ChipOutlined />
			{!isProduction && <ChipDeletable_ />}
		</Stack>
	),
	CircularProgress: <CircularProgressDefault />,
	Dialog: <DialogDefault />,
	Divider: (
		<Stack spacing={1} alignSelf="stretch">
			<DividerDefault />
		</Stack>
	),
	Drawer: <DrawerDefault />,
	Fab: <FabDefault />,
	FormControl: <FormControlGroup />,
	IconButton: (
		<>
			<IconButtonDefault />
			{!isProduction && (
				<Stack spacing={1} direction="row">
					<IconButtonColors_ />
				</Stack>
			)}
		</>
	),
	LinearProgress: (
		<Stack spacing={1} alignSelf="stretch">
			<LinearProgressDefault />
		</Stack>
	),
	Link: (
		<>
			<LinkDefault />
			{!isProduction && (
				<Stack spacing={1} direction="row">
					<LinkColors_ />
				</Stack>
			)}
		</>
	),
	List: (
		<Stack spacing={1} alignSelf="stretch">
			<ListDefault />
			<ListAvatar />
			<ListSubheader />
		</Stack>
	),
	Menu: <MenuDefault />,
	...(isProduction ? {} : { MenuList: <MenuListDefault_ /> }),
	MobileStepper: (
		<Stack spacing={1} alignSelf="stretch">
			<MobileStepperDefault />
		</Stack>
	),
	NativeSelect: <NativeSelectDefault />,
	Pagination: <PaginationDefault />,
	Paper: <PaperDefault />,
	Popover: <PopoverDefault />,
	RadioGroup: <RadioGroupDefault />,
	Rating: <RatingDefault />,
	Select: (
		<>
			<SelectDefault />
			<SelectIcon />
			<SelectMultiple />
		</>
	),
	Skeleton: (
		<Stack spacing={1} alignSelf="stretch">
			<SkeletonDefault />
		</Stack>
	),
	Slider: <SliderDefault />,
	Snackbar: <SnackbarDefault />,
	SpeedDial: <SpeedDialDefault />,
	Stepper: (
		<Stack spacing={4} alignSelf="stretch">
			<StepperDefault />
			<StepperOptional />
			<StepperClickable />
		</Stack>
	),
	SwipeableDrawer: <SwipeableDrawerDefault />,
	Switch: (
		<>
			<SwitchDefault />
			<SwitchChecked />
		</>
	),
	Table: (
		<>
			<TableDefault />
			<TableFooter />
		</>
	),
	Tabs: (
		<>
			<TabsDefault />
			<TabsScrollable />
		</>
	),
	TextField: (
		<Stack spacing={1} direction="row">
			<TextFieldDefault />
			<TextFieldMultiline />
			<TextFieldIcon />
		</Stack>
	),
	ToggleButton: <ToggleButtonDefault />,
	Tooltip: <TooltipDefault />,
	Typography: <TypographyDefault />,
};

// ----------------------------------------------------------------------------

export default function Page() {
	const colorScheme = useColorScheme();
	const location = useLocation();
	const isWideScreen = useIsWideScreen();

	// Scroll to heading on page load only.
	React.useEffect(function scrollToHash() {
		if (window.location.hash) {
			const id = window.location.hash.slice(1);
			const element = document.getElementById(id);
			element?.scrollIntoView({ block: "start" });
		}
	}, []);

	const navigationItems = Object.keys(components).map((name) => {
		const id = name.toLowerCase().replace(" ", "-");
		return (
			<NavigationList.Anchor
				key={id}
				label={name}
				href={`#${id}`}
				active={location.hash === `#${id}`}
			/>
		);
	});

	return (
		<Root colorScheme={colorScheme} style={{ display: "contents" }}>
			<div className={styles.page}>
				{isWideScreen && (
					<aside className={styles.sidebar}>
						<Typography
							variant="body1"
							component="h2"
							sx={{ ml: 1, mb: 2, fontWeight: 500 }}
						>
							MUI components
						</Typography>
						<NavigationList.Root items={navigationItems} />
					</aside>
				)}

				<Container
					maxWidth="lg"
					component="main"
					className={styles.main}
					tabIndex={-1}
					id={React.use(SkipLinkContext)?.id}
				>
					<Typography variant="h4" component="h1" className={styles.h1}>
						StrataKit MUI theme
					</Typography>

					{Object.entries(components).map(([name, content]) => (
						<ComponentExamples key={name} name={name}>
							{content}
						</ComponentExamples>
					))}
				</Container>
			</div>
		</Root>
	);
}

// ----------------------------------------------------------------------------

interface ComponentExamplesProps {
	name: string;
	children?: React.ReactNode;
}

function ComponentExamples(props: ComponentExamplesProps) {
	const { name } = props;
	const id = name.toLowerCase().replace(" ", "-");
	const isTarget = useLocation().hash === `#${id}`;

	return (
		<div
			className={styles.exampleContainer}
			data-target={isTarget ? "true" : undefined}
		>
			<hgroup className={styles.exampleHeader}>
				<Typography
					variant="h5"
					component="h2"
					id={id}
					className={styles.exampleTitle}
					tabIndex={-1}
				>
					{name}
				</Typography>
				<IconButton
					id={`${id}-permalink`}
					aria-labelledby={`${id}-permalink ${id}`}
					className={styles.examplePermalink}
					href={`#${id}`}
				>
					<Icon href={svgLink} />
					<span style={visuallyHidden}>Permalink</span>
				</IconButton>
			</hgroup>

			<Stack spacing={2} alignItems="start" className={styles.exampleContent}>
				{props.children}
			</Stack>
		</div>
	);
}
