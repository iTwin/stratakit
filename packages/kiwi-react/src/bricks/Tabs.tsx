/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as ReactDOM from "react-dom";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import { useControlledState } from "./~hooks.js";

// ----------------------------------------------------------------------------

interface TabsProps
	extends Pick<
		Ariakit.TabProviderProps,
		| "defaultSelectedId"
		| "selectedId"
		| "setSelectedId"
		| "selectOnMove"
		| "children"
	> {}

function Tabs(props: TabsProps) {
	const { defaultSelectedId, selectOnMove, children } = props;

	const [selectedId, setSelectedId] = useControlledState(
		defaultSelectedId,
		props.selectedId,
		props.setSelectedId,
	);

	return (
		<Ariakit.TabProvider
			defaultSelectedId={defaultSelectedId}
			selectedId={selectedId}
			setSelectedId={(id) => {
				if (document.startViewTransition) {
					document.startViewTransition(() => {
						ReactDOM.flushSync(() => {
							setSelectedId(id);
						});
					});
				} else {
					setSelectedId(id);
				}
			}}
			selectOnMove={selectOnMove}
		>
			{children}
		</Ariakit.TabProvider>
	);
}

// ----------------------------------------------------------------------------

interface TabListProps extends Ariakit.RoleProps<"div"> {
	/** @default "neutral" */
	tone?: "neutral" | "accent";
}

const TabList = React.forwardRef<
	React.ElementRef<typeof Ariakit.TabList>,
	TabListProps
>((props, forwardedRef) => {
	const { tone = "neutral", ...rest } = props;

	const id = React.useId().replaceAll(":", "_");
	const viewTransitionName = `kiwi-tabs-active-tab-${id}`;

	return (
		<Ariakit.TabList
			data-kiwi-tone={tone}
			{...rest}
			className={cx("🥝-tab-list", props.className)}
			style={
				{
					"--kiwi-tabs-active-tab-view-transition-name": viewTransitionName,
				} as React.CSSProperties
			}
			ref={forwardedRef}
		/>
	);
});

// ----------------------------------------------------------------------------

interface TabProps
	extends Ariakit.FocusableProps<"button">,
		Pick<Ariakit.TabProps, "id"> {}

const Tab = React.forwardRef<React.ElementRef<typeof Ariakit.Tab>, TabProps>(
	(props, forwardedRef) => {
		return (
			<Ariakit.Tab
				accessibleWhenDisabled
				{...props}
				className={cx("🥝-tab", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);

// ----------------------------------------------------------------------------

interface TabPanelProps
	extends Ariakit.RoleProps<"div">,
		Pick<Ariakit.TabPanelProps, "tabId" | "unmountOnHide"> {}

const TabPanel = React.forwardRef<
	React.ElementRef<typeof Ariakit.TabPanel>,
	TabPanelProps
>((props, forwardedRef) => {
	return (
		<Ariakit.TabPanel
			{...props}
			className={cx("🥝-tab-panel", props.className)}
			ref={forwardedRef}
		/>
	);
});

// ----------------------------------------------------------------------------

export { Tabs as Root, TabList, Tab, TabPanel };
