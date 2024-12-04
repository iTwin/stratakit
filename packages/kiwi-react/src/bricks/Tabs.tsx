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
	const {
		defaultSelectedId,
		selectedId: selectedIdProp,
		setSelectedId: setSelectedIdProp,
		selectOnMove,
		children,
	} = props;

	const [selectedId, setSelectedId] = useControlledState(
		defaultSelectedId,
		selectedIdProp,
		setSelectedIdProp,
	);

	return (
		<Ariakit.TabProvider
			selectedId={selectedId}
			setSelectedId={React.useCallback(
				(id: Ariakit.TabStoreState["selectedId"]) => {
					if (document.startViewTransition) {
						document.startViewTransition(() => {
							ReactDOM.flushSync(() => {
								setSelectedId(id);
							});
						});
					} else {
						setSelectedId(id);
					}
				},
				[setSelectedId],
			)}
			selectOnMove={selectOnMove}
		>
			{children}
		</Ariakit.TabProvider>
	);
}
DEV: Tabs.displayName = "Tabs.Root";

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
	const viewTransitionName = `🥝active-stripe-${React.useId().replaceAll(":", "_")}`;

	return (
		<Ariakit.TabList
			data-kiwi-tone={tone}
			{...rest}
			className={cx("🥝-tab-list", props.className)}
			style={
				{
					"--🥝tab-active-stripe-view-transition-name": viewTransitionName,
					...props.style,
				} as React.CSSProperties
			}
			ref={forwardedRef}
		/>
	);
});
DEV: TabList.displayName = "Tabs.TabList";

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
DEV: Tab.displayName = "Tabs.Tab";

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
DEV: TabPanel.displayName = "Tabs.TabPanel";

// ----------------------------------------------------------------------------

export { Tabs as Root, TabList, Tab, TabPanel };
