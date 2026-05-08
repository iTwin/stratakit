/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { type MetaFunction, useLocation } from "react-router";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Icon } from "@stratakit/mui";
import * as NavigationList from "@stratakit/structures/unstable_NavigationList";
import { ExamplesContainer } from "~/~examples.tsx";
import { SkipLinkContext } from "~/~navigation.tsx";
import { useIsWideScreen } from "~/~utils.tsx";

import svgScript from "@stratakit/icons/script.svg";
import styles from "./mui.module.css";

// ----------------------------------------------------------------------------

export const meta: MetaFunction = () => {
	return [{ title: "StrataKit MUI theme" }];
};

const repoBaseUrl = "https://github.com/iTwin/stratakit";

// ----------------------------------------------------------------------------

const components = {
	Accordion: React.lazy(() => import("./Accordion.tsx")),
	Alert: React.lazy(() => import("./Alert.tsx")),
	AppBar: React.lazy(() => import("./AppBar.tsx")),
	Autocomplete: React.lazy(() => import("./Autocomplete.tsx")),
	Avatar: React.lazy(() => import("./Avatar.tsx")),
	AvatarGroup: React.lazy(() => import("./AvatarGroup.tsx")),
	Backdrop: React.lazy(() => import("./Backdrop.tsx")),
	Badge: React.lazy(() => import("./Badge.tsx")),
	BottomNavigation: React.lazy(() => import("./BottomNavigation.tsx")),
	Breadcrumbs: React.lazy(() => import("./Breadcrumbs.tsx")),
	Button: React.lazy(() => import("./Button.tsx")),
	ButtonGroup: React.lazy(() => import("./ButtonGroup.tsx")),
	Card: React.lazy(() => import("./Card.tsx")),
	Checkbox: React.lazy(() => import("./Checkbox.tsx")),
	Chip: React.lazy(() => import("./Chip.tsx")),
	CircularProgress: React.lazy(() => import("./CircularProgress.tsx")),
	Dialog: React.lazy(() => import("./Dialog.tsx")),
	Divider: React.lazy(() => import("./Divider.tsx")),
	Drawer: React.lazy(() => import("./Drawer.tsx")),
	Fab: React.lazy(() => import("./Fab.tsx")),
	IconButton: React.lazy(() => import("./IconButton.tsx")),
	LinearProgress: React.lazy(() => import("./LinearProgress.tsx")),
	Link: React.lazy(() => import("./Link.tsx")),
	List: React.lazy(() => import("./List.tsx")),
	Menu: React.lazy(() => import("./Menu.tsx")),
	MobileStepper: React.lazy(() => import("./MobileStepper.tsx")),
	NativeSelect: React.lazy(() => import("./NativeSelect.tsx")),
	Pagination: React.lazy(() => import("./Pagination.tsx")),
	Paper: React.lazy(() => import("./Paper.tsx")),
	Popover: React.lazy(() => import("./Popover.tsx")),
	RadioGroup: React.lazy(() => import("./RadioGroup.tsx")),
	Rating: React.lazy(() => import("./Rating.tsx")),
	Select: React.lazy(() => import("./Select.tsx")),
	Skeleton: React.lazy(() => import("./Skeleton.tsx")),
	Slider: React.lazy(() => import("./Slider.tsx")),
	Snackbar: React.lazy(() => import("./Snackbar.tsx")),
	SpeedDial: React.lazy(() => import("./SpeedDial.tsx")),
	Stepper: React.lazy(() => import("./Stepper.tsx")),
	SwipeableDrawer: React.lazy(() => import("./SwipeableDrawer.tsx")),
	Switch: React.lazy(() => import("./Switch.tsx")),
	Table: React.lazy(() => import("./Table.tsx")),
	Tabs: React.lazy(() => import("./Tabs.tsx")),
	TextField: React.lazy(() => import("./TextField.tsx")),
	ToggleButton: React.lazy(() => import("./ToggleButton.tsx")),
	Tooltip: React.lazy(() => import("./Tooltip.tsx")),
	Typography: React.lazy(() => import("./Typography.tsx")),
};

// ----------------------------------------------------------------------------

export default function Page() {
	const location = useLocation();
	const isWideScreen = useIsWideScreen();

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
		<div className={styles.page}>
			{isWideScreen && (
				<aside className={styles.sidebar}>
					<Typography
						variant="body1"
						render={<h2 />}
						sx={{ ml: 1, mb: 2, fontWeight: 500 }}
					>
						MUI components
					</Typography>
					<NavigationList.Root items={navigationItems} />
				</aside>
			)}

			<Container
				maxWidth="md"
				render={<main />}
				className={styles.main}
				tabIndex={-1}
				id={React.use(SkipLinkContext)?.id}
			>
				<Typography variant="h4" render={<h1 />} className={styles.h1}>
					StrataKit MUI theme
				</Typography>

				{Object.entries(components).map(([name, Component]) => (
					<React.Suspense key={name}>
						<ComponentExamples name={name}>
							<Component />
						</ComponentExamples>
					</React.Suspense>
				))}
			</Container>
		</div>
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
	const sourceCodeUrl = `${repoBaseUrl}/blob/main/apps/test-app/app/mui/${name}.tsx`;

	// Scroll to heading on page load only.
	React.useEffect(
		function scrollToHash() {
			// Compute directly from window.location to avoid subscribing to useLocation changes.
			const isTarget = window.location.hash === `#${id}`;

			if (isTarget) {
				const element = document.getElementById(id);
				element?.scrollIntoView({ block: "start" });
			}
		},
		[id],
	);

	return (
		<ExamplesContainer
			name={name}
			id={id}
			highlight={isTarget}
			tools={
				<IconButton
					render={<a />}
					href={sourceCodeUrl}
					label="View source"
					size="small"
				>
					<Icon href={svgScript} />
				</IconButton>
			}
		>
			<Stack spacing={2} sx={{ alignItems: "start" }}>
				{props.children}
			</Stack>
		</ExamplesContainer>
	);
}
