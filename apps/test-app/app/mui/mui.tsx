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
	Accordion: React.lazy(() => import("./Accordion.showcase.tsx")),
	Alert: React.lazy(() => import("./Alert.showcase.tsx")),
	AppBar: React.lazy(() => import("./AppBar.showcase.tsx")),
	Autocomplete: React.lazy(() => import("./Autocomplete.showcase.tsx")),
	Avatar: React.lazy(() => import("./Avatar.showcase.tsx")),
	AvatarGroup: React.lazy(() => import("./AvatarGroup.showcase.tsx")),
	Backdrop: React.lazy(() => import("./Backdrop.showcase.tsx")),
	Badge: React.lazy(() => import("./Badge.showcase.tsx")),
	BottomNavigation: React.lazy(() => import("./BottomNavigation.showcase.tsx")),
	Breadcrumbs: React.lazy(() => import("./Breadcrumbs.showcase.tsx")),
	Button: React.lazy(() => import("./Button.showcase.tsx")),
	ButtonGroup: React.lazy(() => import("./ButtonGroup.showcase.tsx")),
	Card: React.lazy(() => import("./Card.showcase.tsx")),
	Checkbox: React.lazy(() => import("./Checkbox.showcase.tsx")),
	Chip: React.lazy(() => import("./Chip.showcase.tsx")),
	CircularProgress: React.lazy(() => import("./CircularProgress.showcase.tsx")),
	Dialog: React.lazy(() => import("./Dialog.showcase.tsx")),
	Divider: React.lazy(() => import("./Divider.showcase.tsx")),
	Drawer: React.lazy(() => import("./Drawer.showcase.tsx")),
	Fab: React.lazy(() => import("./Fab.showcase.tsx")),
	IconButton: React.lazy(() => import("./IconButton.showcase.tsx")),
	LinearProgress: React.lazy(() => import("./LinearProgress.showcase.tsx")),
	Link: React.lazy(() => import("./Link.showcase.tsx")),
	List: React.lazy(() => import("./List.showcase.tsx")),
	Menu: React.lazy(() => import("./Menu.showcase.tsx")),
	MobileStepper: React.lazy(() => import("./MobileStepper.showcase.tsx")),
	NativeSelect: React.lazy(() => import("./NativeSelect.showcase.tsx")),
	Pagination: React.lazy(() => import("./Pagination.showcase.tsx")),
	Paper: React.lazy(() => import("./Paper.showcase.tsx")),
	Popover: React.lazy(() => import("./Popover.showcase.tsx")),
	RadioGroup: React.lazy(() => import("./RadioGroup.showcase.tsx")),
	Rating: React.lazy(() => import("./Rating.showcase.tsx")),
	Select: React.lazy(() => import("./Select.showcase.tsx")),
	Skeleton: React.lazy(() => import("./Skeleton.showcase.tsx")),
	Slider: React.lazy(() => import("./Slider.showcase.tsx")),
	Snackbar: React.lazy(() => import("./Snackbar.showcase.tsx")),
	SpeedDial: React.lazy(() => import("./SpeedDial.showcase.tsx")),
	Stepper: React.lazy(() => import("./Stepper.showcase.tsx")),
	SwipeableDrawer: React.lazy(() => import("./SwipeableDrawer.showcase.tsx")),
	Switch: React.lazy(() => import("./Switch.showcase.tsx")),
	Table: React.lazy(() => import("./Table.showcase.tsx")),
	Tabs: React.lazy(() => import("./Tabs.showcase.tsx")),
	TextField: React.lazy(() => import("./TextField.showcase.tsx")),
	ToggleButton: React.lazy(() => import("./ToggleButton.showcase.tsx")),
	Tooltip: React.lazy(() => import("./Tooltip.showcase.tsx")),
	Typography: React.lazy(() => import("./Typography.showcase.tsx")),
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
