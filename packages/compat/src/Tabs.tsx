/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useControlledState } from "@stratakit/foundations/secret-internals";
import { Tabs as SkTabs } from "@stratakit/structures";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Tabs as IuiTabs } from "@itwin/itwinui-react";
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

/** @see https://itwinui.bentley.com/docs/tabs */
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

			if (React.isValidElement(label) && label.key) {
				return `${id}-${index}-${label.key}`;
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

	const activeId = activeIndex ? tabIds[activeIndex] : undefined;
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
							<SkTabs.Tab key={tabId} id={tabId}>
								{label}
							</SkTabs.Tab>
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
export const TabsWrapper = React.forwardRef((props, forwardedRef) => {
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

const TabsWrapperContext = React.createContext<{
	tone: SkTabListProps["tone"];
	tabsId: string;
}>({
	tone: undefined,
	tabsId: "",
});

// ----------------------------------------------------------------------------

type IuiTabListProps = React.ComponentProps<typeof IuiTabs.TabList>;

interface TabListProps extends Pick<IuiTabListProps, "children"> {}

/** @see https://itwinui.bentley.com/docs/tabs#composition-api */
export const TabList = React.forwardRef((props, forwardedRef) => {
	const { children, ...rest } = useCompatProps(props);

	const { tone } = React.useContext(TabsWrapperContext);
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
export const Tab = React.forwardRef((props, forwardedRef) => {
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
export const TabsPanel = React.forwardRef((props, forwardedRef) => {
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

export const Tabs = Object.assign(LegacyTabs, {
	/**
	 * A wrapper component for Tabs
	 */
	Wrapper: TabsWrapper,
	/**
	 * Tablist subcomponent which contains all of the tab subcomponents.
	 * @example
	 * <Tabs.TabList>
	 *   <Tabs.Tab value='tab1' label='Label 1' />
	 *   <Tabs.Tab value='tab2' label='Label 2' />
	 *   <Tabs.Tab value='tab3' label='Label 3' />
	 * </Tabs.TabList>
	 *
	 * @example
	 * <Tabs.TabList>
	 *   <Tabs.Tab value='tab1' label='Green Tab' />
	 * </Tabs.TabList>
	 *
	 * @example
	 * <Tabs.TabList focusActivationMode='manual'>
	 *   <Tabs.Tab value='tab1' label='Manual Focus Tab' />
	 * </Tabs.TabList>
	 */
	TabList: TabList,
	/**
	 * Tab subcomponent which is used for each of the tabs.
	 * @example
	 * <Tabs.Tab value='tab1' label='Label 1' />
	 *
	 * @example
	 * <Tabs.Tab value='sample'>
	 *   <Tabs.TabIcon>
	 *     <SvgPlaceholder />
	 *   </Tabs.TabIcon>
	 *   <Tabs.TabLabel>Sample Label</Tabs.TabLabel>
	 *   <Tabs.TabDescription>Sample Description</Tabs.TabDescription>
	 * </Tabs.Tab>
	 *
	 */
	Tab: Tab,
	/**
	 * Tab panel subcomponent which contains the tab's content.
	 * @example
	 * <Tabs.Panel value='tab1'>
	 *   Sample Panel
	 * </Tabs.Panel>
	 */
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
