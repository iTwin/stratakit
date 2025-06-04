/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
	useControlledState,
	useSafeContext,
} from "@stratakit/foundations/secret-internals";
import { Tabs as SkTabs } from "@stratakit/structures";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Tab as IuiTab, Tabs as IuiTabs } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type SkTabsProps = React.ComponentProps<typeof SkTabs.Root>;
type SkTabListProps = React.ComponentProps<typeof SkTabs.TabList>;

type IuiTabsLegacyProps = React.ComponentProps<typeof IuiTabs>;

interface LegacyTabsProps
	extends Pick<
		IuiTabsLegacyProps,
		| "actions"
		| "labels"
		| "onTabSelected"
		| "activeIndex"
		| "focusActivationMode"
		| "color"
		| "tabsClassName"
		| "contentClassName"
		| "wrapperClassName"
		| "children"
		| "overflowOptions"
		| "defaultValue"
		| "defaultChecked"
		| "orientation"
		| "type"
	> {
	/** NOT IMPLEMENTED. */
	actions?: IuiTabsLegacyProps["actions"];
	/** NOT IMPLEMENTED. */
	orientation?: IuiTabsLegacyProps["orientation"];
	/** NOT IMPLEMENTED. */
	type?: IuiTabsLegacyProps["type"];
}

/** @see https://itwinui.bentley.com/docs/tabs#legacy-api */
const LegacyTabs = React.forwardRef((props, forwardedRef) => {
	const {
		actions, // NOT IMPLEMENTED
		labels,
		onTabSelected,
		activeIndex,
		focusActivationMode,
		color,
		tabsClassName,
		contentClassName,
		wrapperClassName,
		children,
		overflowOptions, // ignored by iTwinUI
		orientation, // NOT IMPLEMENTED
		type, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);

	const id = React.useId();

	const tabIds = React.useMemo(() => {
		return labels.map((label, index) => {
			if (typeof label === "string") {
				return `${id}-${index}-${label}`;
			}

			if (React.isValidElement<React.ComponentProps<typeof Tab>>(label)) {
				// Re-use `id` prop, if available.
				if (label.props.id) return label.props.id;
				if (label.key) return `${id}-${index}-${label.key}`;
			}

			return `${id}-${index}`;
		});
	}, [labels, id]);
	const handleSetSelectedId = React.useCallback(
		(newId: SkTabsProps["selectedId"]) => {
			const indexOfTab = typeof newId === "string" ? tabIds.indexOf(newId) : -1;
			if (indexOfTab === -1) return;
			onTabSelected?.(indexOfTab);
		},
		[tabIds, onTabSelected],
	);

	const activeId = activeIndex === undefined ? undefined : tabIds[activeIndex];
	const [selectedId, setSelectedId] = useControlledState<
		SkTabsProps["selectedId"]
	>(
		undefined,
		activeId,
		handleSetSelectedId as React.Dispatch<
			React.SetStateAction<SkTabsProps["selectedId"]>
		>,
	);
	return (
		<SkTabs.Root
			setSelectedId={setSelectedId}
			selectedId={selectedId}
			selectOnMove={toSelectOnMove(focusActivationMode)}
		>
			<div className={wrapperClassName} {...rest}>
				<SkTabs.TabList
					className={tabsClassName}
					ref={forwardedRef}
					tone={toTone(color)}
				>
					{labels.map((label, index) => {
						const tabId = tabIds[index];
						return (
							<TabContext.Provider key={tabId} value={{ id: tabId }}>
								{typeof label === "string" ? (
									<LegacyTab label={label} />
								) : (
									label
								)}
							</TabContext.Provider>
						);
					})}
				</SkTabs.TabList>
				<SkTabs.TabPanel tabId={selectedId} className={contentClassName}>
					{children}
				</SkTabs.TabPanel>
			</div>
		</SkTabs.Root>
	);
}) as PolymorphicForwardRefComponent<"div", LegacyTabsProps>;
DEV: LegacyTabs.displayName = "Tabs";

// ----------------------------------------------------------------------------

type IuiTabLegacyProps = React.ComponentProps<typeof IuiTab>;

interface LegacyTabProps
	extends Pick<
		IuiTabLegacyProps,
		"label" | "sublabel" | "startIcon" | "disabled" | "children" | "value"
	> {
	/** NOT IMPLEMENTED. */
	sublabel?: IuiTabLegacyProps["sublabel"];
	/** NOT IMPLEMENTED. */
	startIcon?: IuiTabLegacyProps["startIcon"];
	/** NOT IMPLEMENTED. */
	children?: IuiTabLegacyProps["children"];
	/** NOT IMPLEMENTED. */
	value?: IuiTabLegacyProps["value"];
}

/** @see https://itwinui.bentley.com/docs/tabs */
const LegacyTab = React.forwardRef((props, forwardedRef) => {
	const {
		label,
		sublabel, // NOT IMPLEMENTED
		startIcon, // NOT IMPLEMENTED
		disabled,
		children, // NOT IMPLEMENTED
		value, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);

	const { id } = useSafeContext(TabContext);
	return (
		<SkTabs.Tab {...rest} id={id} disabled={disabled} ref={forwardedRef}>
			{label}
		</SkTabs.Tab>
	);
}) as PolymorphicForwardRefComponent<"button", LegacyTabProps>;
DEV: LegacyTab.displayName = "Tab";

export { LegacyTab as Tab };

// ----------------------------------------------------------------------------

const TabContext = React.createContext<
	| {
			id: string;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

type IuiTabsWrapperProps = React.ComponentProps<typeof IuiTabs.Wrapper>;

interface TabsWrapperProps
	extends Pick<
		IuiTabsWrapperProps,
		| "color"
		| "focusActivationMode"
		| "defaultValue"
		| "value"
		| "onValueChange"
		| "defaultChecked"
		| "orientation"
		| "type"
	> {
	/** NOT IMPLEMENTED. */
	orientation?: IuiTabsWrapperProps["orientation"];
	/** NOT IMPLEMENTED. */
	type?: IuiTabsWrapperProps["type"];
}

/** @see https://itwinui.bentley.com/docs/tabs#composition-api */
const TabsWrapper = React.forwardRef((props, forwardedRef) => {
	const {
		children,
		color,
		focusActivationMode,
		defaultValue,
		value,
		onValueChange,
		defaultChecked,
		orientation, // NOT IMPLEMENTED
		type, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);
	const tabsId = React.useId();
	const tone = toTone(color);
	defaultValue;
	value;
	onValueChange;
	return (
		<SkTabs.Root selectOnMove={toSelectOnMove(focusActivationMode)}>
			<TabsWrapperContext.Provider value={{ tone, tabsId }}>
				<div {...rest} ref={forwardedRef}>
					{children}
				</div>
			</TabsWrapperContext.Provider>
		</SkTabs.Root>
	);
}) as PolymorphicForwardRefComponent<"div", TabsWrapperProps>;
DEV: TabsWrapper.displayName = "Tabs.Wrapper";

// ----------------------------------------------------------------------------

const TabsWrapperContext = React.createContext<
	| {
			tone: SkTabListProps["tone"];
			tabsId: string;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

type IuiTabListProps = React.ComponentProps<typeof IuiTabs.TabList>;

interface TabListProps extends Pick<IuiTabListProps, "children"> {}

/** @see https://itwinui.bentley.com/docs/tabs#composition-api */
const TabList = React.forwardRef((props, forwardedRef) => {
	const { children, ...rest } = useCompatProps(props);
	const { tone } = useSafeContext(TabsWrapperContext);

	return (
		<SkTabs.TabList {...rest} tone={tone} ref={forwardedRef}>
			{children}
		</SkTabs.TabList>
	);
}) as PolymorphicForwardRefComponent<"div", TabListProps>;
DEV: TabList.displayName = "Tabs.TabList";

// ----------------------------------------------------------------------------

type IuiTabProps = React.ComponentProps<typeof IuiTabs.Tab>;

interface TabProps extends Pick<IuiTabProps, "value" | "label" | "id"> {}

/** @see https://itwinui.bentley.com/docs/tabs#composition-api */
const Tab = React.forwardRef((props, forwardedRef) => {
	const { children, value, label, id, ...rest } = useCompatProps(props);

	id;
	value;
	return (
		<SkTabs.Tab {...rest} id={value} ref={forwardedRef}>
			{label ?? children}
		</SkTabs.Tab>
	);
}) as PolymorphicForwardRefComponent<"button", TabProps>;
DEV: Tab.displayName = "Tabs.Tab";

// ----------------------------------------------------------------------------

type IuiTabsPanelProps = React.ComponentProps<typeof IuiTabs.Panel>;

interface TabsPanelProps extends Pick<IuiTabsPanelProps, "value" | "id"> {}

/** @see https://itwinui.bentley.com/docs/tabs#composition-api */
const TabsPanel = React.forwardRef((props, forwardedRef) => {
	const { children, value, id, ...rest } = useCompatProps(props);

	id;
	value;
	return (
		<SkTabs.TabPanel {...rest} tabId={value} id={id} ref={forwardedRef}>
			{children}
		</SkTabs.TabPanel>
	);
}) as PolymorphicForwardRefComponent<"div", TabsPanelProps>;
DEV: TabsPanel.displayName = "Tabs.Panel";

// ----------------------------------------------------------------------------

/** @see https://itwinui.bentley.com/docs/tabs */
export const Tabs = Object.assign(LegacyTabs, {
	Wrapper: TabsWrapper,
	TabList: TabList,
	Tab: Tab,
	// TabIcon,
	// TabLabel,
	// TabDescription,
	// Actions,
	Panel: TabsPanel,
});

// ----------------------------------------------------------------------------

function toTone(color: IuiTabsLegacyProps["color"]): SkTabListProps["tone"] {
	return color === "green" ? "accent" : undefined;
}

function toSelectOnMove(
	focusActivationMode: IuiTabsLegacyProps["focusActivationMode"],
): SkTabsProps["selectOnMove"] {
	return focusActivationMode === "manual" ? false : undefined;
}
