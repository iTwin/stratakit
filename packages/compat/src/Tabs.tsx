/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
	useControlledState,
	useSafeContext,
} from "@stratakit/foundations/secret-internals";
import { Tabs as SkTabs } from "@stratakit/structures";
import cx from "classnames";
import { useCompatProps } from "./~utils.js";
import { Icon } from "./Icon.js";

import type { Tab as IuiTab, Tabs as IuiTabs } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.js";

type SkTabsProviderProps = React.ComponentProps<typeof SkTabs.Provider>;
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
		labels,
		onTabSelected,
		activeIndex: activeIndexProp,
		focusActivationMode,
		color,
		tabsClassName,
		contentClassName,
		wrapperClassName,
		children,
		overflowOptions: _overflowOptions, // ignored by iTwinUI
		defaultValue: _defaultValue, // ignored by iTwinUI
		defaultChecked: _defaultChecked, // ignored by iTwinUI

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		actions,
		orientation,
		type,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = useCompatProps(props);

	const [activeIndex, setActiveIndex] = useControlledState<number>(
		0,
		activeIndexProp,
		onTabSelected as React.Dispatch<React.SetStateAction<number>>,
	);

	const onValueChange = React.useCallback<
		NonNullable<WrapperProps["onValueChange"]>
	>(
		(newValue) => {
			const newActiveIndex = Number(newValue);
			setActiveIndex(newActiveIndex);
		},
		[setActiveIndex],
	);

	const value = `${activeIndex}`;
	return (
		<Wrapper
			{...rest}
			className={cx(wrapperClassName, props.className)}
			value={value}
			onValueChange={onValueChange}
			color={color}
			focusActivationMode={focusActivationMode}
		>
			<TabList className={tabsClassName} ref={forwardedRef}>
				{labels.map((label, index) => {
					const key = getLabelKey(label, index);
					const tabValue = `${index}`;
					return (
						<LegacyTabProvider key={key} tabValue={tabValue}>
							{typeof label === "string" ? <LegacyTab label={label} /> : label}
						</LegacyTabProvider>
					);
				})}
			</TabList>
			<Panel value={value} className={contentClassName}>
				{children}
			</Panel>
		</Wrapper>
	);
}) as PolymorphicForwardRefComponent<"div", LegacyTabsProps>;
DEV: LegacyTabs.displayName = "Tabs";

function getLabelKey(label: React.ReactNode, index: number) {
	if (typeof label === "string") {
		return `${index}-${label}`;
	}

	if (React.isValidElement<React.ComponentProps<typeof Tab>>(label)) {
		return `${index}-${label.key || ""}-${label.props.id || ""}`;
	}

	return `${index}`;
}

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
	children?: IuiTabLegacyProps["children"];
	/** NOT IMPLEMENTED. */
	value?: IuiTabLegacyProps["value"];
}

/** @see https://itwinui.bentley.com/docs/tabs#legacy-api */
const LegacyTab = React.forwardRef((props, forwardedRef) => {
	const {
		id: _id, // ignored by iTwinUI
		label,
		disabled,
		startIcon,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		sublabel,
		children,
		value,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = useCompatProps(props);

	const { tabValue } = useSafeContext(LegacyTabContext);
	return (
		<Tab {...rest} value={tabValue} disabled={disabled} ref={forwardedRef}>
			{startIcon ? <TabIcon>{startIcon}</TabIcon> : null}
			{label}
		</Tab>
	);
}) as PolymorphicForwardRefComponent<"button", LegacyTabProps>;
DEV: LegacyTab.displayName = "Tab";

// ----------------------------------------------------------------------------

const LegacyTabContext = React.createContext<
	| {
			tabValue: string;
	  }
	| undefined
>(undefined);

type LegacyTabContextType = React.ContextType<typeof LegacyTabContext>;

function LegacyTabProvider({
	children,
	tabValue,
}: React.PropsWithChildren<LegacyTabContextType>) {
	return (
		<LegacyTabContext.Provider
			value={React.useMemo(() => ({ tabValue }), [tabValue])}
		>
			{children}
		</LegacyTabContext.Provider>
	);
}

// ----------------------------------------------------------------------------

type IuiWrapperProps = React.ComponentProps<typeof IuiTabs.Wrapper>;

interface WrapperProps
	extends Pick<
		IuiWrapperProps,
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
	orientation?: IuiWrapperProps["orientation"];
	/** NOT IMPLEMENTED. */
	type?: IuiWrapperProps["type"];
}

/** @see https://itwinui.bentley.com/docs/tabs#composition-api */
const Wrapper = React.forwardRef((props, forwardedRef) => {
	const {
		children,
		color,
		focusActivationMode,
		defaultValue,
		value,
		onValueChange,
		defaultChecked: _defaultChecked, // ignored by iTwinUI

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		orientation,
		type,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = useCompatProps(props);
	const wrapperId = React.useId();
	const tone = color === "green" ? "accent" : undefined;

	const defaultSelectedId = defaultValue
		? toIdFromValue(defaultValue, wrapperId)
		: undefined;
	const selectedId = value ? toIdFromValue(value, wrapperId) : undefined;
	const setSelectedId = React.useCallback<
		NonNullable<SkTabsProviderProps["setSelectedId"]>
	>(
		(newSelectedId) => {
			if (!onValueChange || !newSelectedId) return;

			const newSelectedValue = toValueFromId(newSelectedId, wrapperId);
			if (!newSelectedValue) return;

			onValueChange?.(newSelectedValue);
		},
		[onValueChange, wrapperId],
	);
	return (
		<SkTabs.Provider
			defaultSelectedId={defaultSelectedId}
			selectedId={selectedId}
			selectOnMove={focusActivationMode !== "manual"}
			setSelectedId={setSelectedId}
		>
			<WrapperContext.Provider
				value={React.useMemo(() => ({ tone, wrapperId }), [tone, wrapperId])}
			>
				<div {...rest} ref={forwardedRef}>
					{children}
				</div>
			</WrapperContext.Provider>
		</SkTabs.Provider>
	);
}) as PolymorphicForwardRefComponent<"div", WrapperProps>;
DEV: Wrapper.displayName = "Tabs.Wrapper";

// ----------------------------------------------------------------------------

const WrapperContext = React.createContext<
	| {
			tone: SkTabListProps["tone"];
			wrapperId: string;
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

type IuiTabListProps = React.ComponentProps<typeof IuiTabs.TabList>;

interface TabListProps extends Pick<IuiTabListProps, "children"> {}

/** @see https://itwinui.bentley.com/docs/tabs#composition-api */
const TabList = React.forwardRef((props, forwardedRef) => {
	const { children, ...rest } = useCompatProps(props);
	const { tone } = useSafeContext(WrapperContext);

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
	const {
		children,
		value,
		label,
		id: _id, // ignored by iTwinUI
		...rest
	} = useCompatProps(props);
	const id = useIdFromValue(value);
	return (
		<SkTabs.Tab {...rest} id={id} ref={forwardedRef}>
			{label ?? children}
		</SkTabs.Tab>
	);
}) as PolymorphicForwardRefComponent<"button", TabProps>;
DEV: Tab.displayName = "Tabs.Tab";

// ----------------------------------------------------------------------------

type IuiPanelProps = React.ComponentProps<typeof IuiTabs.Panel>;

interface PanelProps extends Pick<IuiPanelProps, "value" | "id"> {}

/** @see https://itwinui.bentley.com/docs/tabs#composition-api */
const Panel = React.forwardRef((props, forwardedRef) => {
	const {
		children,
		value,
		id: _id, // ignored by iTwinUI
		...rest
	} = useCompatProps(props);
	const tabId = useIdFromValue(value);
	return (
		<SkTabs.TabPanel {...rest} tabId={tabId} ref={forwardedRef}>
			{children}
		</SkTabs.TabPanel>
	);
}) as PolymorphicForwardRefComponent<"div", PanelProps>;
DEV: Panel.displayName = "Tabs.Panel";

// ----------------------------------------------------------------------------

type IconProps = React.ComponentProps<typeof Icon>;

interface TabIconProps extends IconProps {}

/** @see https://itwinui.bentley.com/docs/tabs#composition-api */
const TabIcon = React.forwardRef((props, forwardedRef) => {
	return <Icon {...props} ref={forwardedRef} />;
}) as PolymorphicForwardRefComponent<"svg", TabIconProps>;
DEV: TabIcon.displayName = "Tabs.TabIcon";

// ----------------------------------------------------------------------------

/** NOT IMPLEMENTED. */
const TabLabel = React.forwardRef((_props, _forwardedRef) => {
	return null;
}) as PolymorphicForwardRefComponent<
	"span",
	React.ComponentProps<typeof IuiTabs.TabLabel>
>;

// ----------------------------------------------------------------------------

/** NOT IMPLEMENTED. */
const TabDescription = React.forwardRef((_props, _forwardedRef) => {
	return null;
}) as PolymorphicForwardRefComponent<
	"span",
	React.ComponentProps<typeof IuiTabs.TabDescription>
>;

// ----------------------------------------------------------------------------

/** NOT IMPLEMENTED. */
const Actions = React.forwardRef((_props, _forwardedRef) => {
	return null;
}) as PolymorphicForwardRefComponent<
	"div",
	React.ComponentProps<typeof IuiTabs.Actions>
>;

// ----------------------------------------------------------------------------

/** @see https://itwinui.bentley.com/docs/tabs */
const Tabs = Object.assign(LegacyTabs, {
	Wrapper,
	TabList,
	Tab,
	TabIcon,
	/** NOT IMPLEMENTED. */
	TabLabel,
	/** NOT IMPLEMENTED. */
	TabDescription,
	/** NOT IMPLEMENTED. */
	Actions,
	Panel,
});

// ----------------------------------------------------------------------------

function toIdFromValue(value: string, wrapperId: string) {
	return `${wrapperId}-${value}`;
}

function toValueFromId(id: string, wrapperId: string) {
	if (!id.startsWith(`${wrapperId}-`)) return undefined;
	return id.slice(wrapperId.length + 1); // +1 for the hyphen
}

function useIdFromValue(value: string) {
	const { wrapperId } = useSafeContext(WrapperContext);
	return toIdFromValue(value, wrapperId);
}

// ----------------------------------------------------------------------------

export { LegacyTab as Tab, Tabs };
