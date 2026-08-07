/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { type MetaFunction, useLocation } from "react-router";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import deepmerge from "@mui/utils/deepmerge";
import { Icon } from "@stratakit/mui";
import * as NavigationList from "@stratakit/structures/unstable_NavigationList";
import {
	ExamplesShowcase,
	KnobControlEntrypoint,
	KnobsProvider,
	useKnobs,
} from "~/~examples.tsx";
import { SkipLinkContext } from "~/~navigation.tsx";
import { useIsWideScreen } from "~/~utils.tsx";

import type { ComponentsProps, Theme } from "@mui/material/styles";
import type { Knob } from "~/~utils.tsx";

import svgScript from "@stratakit/icons/script.svg";
import styles from "./mui.module.css";

// ----------------------------------------------------------------------------

export const meta: MetaFunction = () => {
	return [{ title: "StrataKit MUI theme" }];
};

const repoBaseUrl = "https://github.com/iTwin/stratakit";

// ----------------------------------------------------------------------------

const components = {
	Accordion: processExamples(() => import("./Accordion.showcase.tsx")),
	Alert: processExamples(() => import("./Alert.showcase.tsx")),
	AppBar: processExamples(() => import("./AppBar.showcase.tsx")),
	Autocomplete: processExamples(() => import("./Autocomplete.showcase.tsx")),
	Avatar: processExamples(() => import("./Avatar.showcase.tsx")),
	AvatarGroup: processExamples(() => import("./AvatarGroup.showcase.tsx")),
	Backdrop: processExamples(() => import("./Backdrop.showcase.tsx")),
	Badge: processExamples(() => import("./Badge.showcase.tsx")),
	BottomNavigation: processExamples(
		() => import("./BottomNavigation.showcase.tsx"),
	),
	Breadcrumbs: processExamples(() => import("./Breadcrumbs.showcase.tsx")),
	Button: processExamples(() => import("./Button.showcase.tsx")),
	ButtonGroup: processExamples(() => import("./ButtonGroup.showcase.tsx")),
	Card: processExamples(() => import("./Card.showcase.tsx")),
	Checkbox: processExamples(() => import("./Checkbox.showcase.tsx")),
	Chip: processExamples(() => import("./Chip.showcase.tsx")),
	CircularProgress: processExamples(
		() => import("./CircularProgress.showcase.tsx"),
	),
	DatePicker: processExamples(() => import("./DatePicker.showcase.tsx")),
	Dialog: processExamples(() => import("./Dialog.showcase.tsx")),
	Divider: processExamples(() => import("./Divider.showcase.tsx")),
	Drawer: processExamples(() => import("./Drawer.showcase.tsx")),
	Fab: processExamples(() => import("./Fab.showcase.tsx")),
	IconButton: processExamples(() => import("./IconButton.showcase.tsx")),
	LinearProgress: processExamples(
		() => import("./LinearProgress.showcase.tsx"),
	),
	Link: processExamples(() => import("./Link.showcase.tsx")),
	List: processExamples(() => import("./List.showcase.tsx")),
	Menu: processExamples(() => import("./Menu.showcase.tsx")),
	MobileStepper: processExamples(() => import("./MobileStepper.showcase.tsx")),
	NativeSelect: processExamples(() => import("./NativeSelect.showcase.tsx")),
	Pagination: processExamples(() => import("./Pagination.showcase.tsx")),
	Paper: processExamples(() => import("./Paper.showcase.tsx")),
	Popover: processExamples(() => import("./Popover.showcase.tsx")),
	RadioGroup: processExamples(() => import("./RadioGroup.showcase.tsx")),
	Rating: processExamples(() => import("./Rating.showcase.tsx")),
	Select: processExamples(() => import("./Select.showcase.tsx")),
	Skeleton: processExamples(() => import("./Skeleton.showcase.tsx")),
	Slider: processExamples(() => import("./Slider.showcase.tsx")),
	Snackbar: processExamples(() => import("./Snackbar.showcase.tsx")),
	SpeedDial: processExamples(() => import("./SpeedDial.showcase.tsx")),
	Stepper: processExamples(() => import("./Stepper.showcase.tsx")),
	SwipeableDrawer: processExamples(
		() => import("./SwipeableDrawer.showcase.tsx"),
	),
	Switch: processExamples(() => import("./Switch.showcase.tsx")),
	Table: processExamples(() => import("./Table.showcase.tsx")),
	Tabs: processExamples(() => import("./Tabs.showcase.tsx")),
	TextField: processExamples(() => import("./TextField.showcase.tsx")),
	ToggleButton: processExamples(() => import("./ToggleButton.showcase.tsx")),
	Tooltip: processExamples(() => import("./Tooltip.showcase.tsx")),
	Typography: processExamples(() => import("./Typography.showcase.tsx")),
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
				<Typography variant="headline-lg" render={<h1 />} className={styles.h1}>
					StrataKit MUI theme
				</Typography>

				{Object.entries(components).map(
					([name, { default: Component, knobs }]) => (
						<React.Suspense key={name}>
							<KnobsProvider knobs={knobs}>
								<ComponentExamples name={name}>
									<Component />
								</ComponentExamples>
							</KnobsProvider>
						</React.Suspense>
					),
				)}
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
	const { children, name } = props;
	const id = name.toLowerCase().replace(" ", "-");

	const isTarget = useLocation().hash === `#${id}`;
	const sourceCodeUrl = `${repoBaseUrl}/blob/main/apps/test-app/app/mui/${name}.showcase.tsx`;

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

	const { knobs, enabled: enabledKnobs } = useKnobs();

	/** All enabled default props to be passed to the ThemeProvider */
	const knobProps = Object.entries(enabledKnobs).reduce(
		(result, [knobName, enabled]) => {
			if (!enabled) return result;
			const knob = knobs.get(knobName);
			if (!knob?.props) return result;
			return deepmerge(result, knob.props);
		},
		{} as ComponentsProps,
	);

	return (
		<ExamplesShowcase
			name={name}
			id={id}
			highlight={isTarget}
			tools={
				<>
					<IconButton
						render={<a />}
						href={sourceCodeUrl}
						label="View source"
						size="small"
					>
						<Icon href={svgScript} />
					</IconButton>
					<KnobControlEntrypoint />
				</>
			}
		>
			<Stack spacing={4} sx={{ alignItems: "start" }}>
				<ThemeProvider
					theme={(outerTheme: Theme): Theme =>
						deepmerge(outerTheme, {
							components: Object.fromEntries(
								Object.entries(knobProps).map(
									([componentName, defaultProps]) => [
										componentName,
										{ defaultProps },
									],
								),
							),
						})
					}
				>
					{children}
				</ThemeProvider>
			</Stack>
		</ExamplesShowcase>
	);
}

// ----------------------------------------------------------------------------

type Knobs = Record<string, Knob>;

interface ExamplesModule {
	default: React.FC;
	knobs?: Knobs;
}

/** Wrapper over `React.lazy` that also extracts other imports from the file (e.g. `knobs`). */
function processExamples(importFunc: () => Promise<ExamplesModule>) {
	const modulePromise = importFunc();
	const LazyComponent = React.lazy(async () => {
		const { default: Component } = await modulePromise;
		return { default: Component };
	});

	return {
		default: LazyComponent,
		knobs: modulePromise.then((module) => module.knobs ?? {}),
	};
}
