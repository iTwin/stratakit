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
		defaultValue, // ignored by iTwinUI
		defaultChecked, // ignored by iTwinUI
		orientation, // NOT IMPLEMENTED
		type, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);

	const tabValues = React.useMemo(() => {
		return labels.map((label, index) => {
			if (typeof label === "string") {
				return `${index}-${label}`;
			}

			if (React.isValidElement<React.ComponentProps<typeof Tab>>(label)) {
				// Re-use `id` prop, if available.
				if (label.props.id) return label.props.id;
				if (label.key) return `${index}-${label.key}`;
			}

			return `${index}`;
		});
	}, [labels]);
	const handleSetValue = React.useCallback<
		NonNullable<WrapperProps["onValueChange"]>
	>(
		(newId) => {
			console.log("handleSetValue", newId);
			const indexOfTab =
				typeof newId === "string" ? tabValues.indexOf(newId) : -1;
			if (indexOfTab === -1) return;
			onTabSelected?.(indexOfTab);
		},
		[tabValues, onTabSelected],
	);

	const activeValue =
		activeIndex === undefined ? undefined : tabValues[activeIndex];
	const [value, setValue] = useControlledState<string>(
		"",
		activeValue,
		handleSetValue as React.Dispatch<React.SetStateAction<string>>,
	);

	return (
		<Wrapper
			{...rest}
			className={wrapperClassName}
			onValueChange={setValue}
			value={value}
			color={color}
			focusActivationMode={focusActivationMode}
		>
			<TabList className={tabsClassName} ref={forwardedRef}>
				{labels.map((label, index) => {
					const tabValue = tabValues[index];
					return (
						<LegacyTabContext.Provider key={tabValue} value={{ tabValue }}>
							{typeof label === "string" ? <LegacyTab label={label} /> : label}
						</LegacyTabContext.Provider>
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

/** @see https://itwinui.bentley.com/docs/tabs#legacy-api */
const LegacyTab = React.forwardRef((props, forwardedRef) => {
	const {
		label,
		sublabel, // NOT IMPLEMENTED
		startIcon, // NOT IMPLEMENTED
		disabled,
		children, // NOT IMPLEMENTED
		value: valueProp, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);

	const { tabValue } = useSafeContext(LegacyTabContext);
	return (
		<Tab {...rest} value={tabValue} disabled={disabled} ref={forwardedRef}>
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
		defaultChecked,
		orientation, // NOT IMPLEMENTED
		type, // NOT IMPLEMENTED
		...rest
	} = useCompatProps(props);
	const wrapperId = React.useId();
	const tone = color === "green" ? "accent" : undefined;
	const defaultSelectedId = defaultValue
		? toIdFromValue(defaultValue, wrapperId)
		: undefined;
	const selectedId = value ? toIdFromValue(value, wrapperId) : undefined;
	const setSelectedId = React.useCallback<
		NonNullable<SkTabsProps["setSelectedId"]>
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
		<SkTabs.Root
			defaultSelectedId={defaultSelectedId}
			selectedId={selectedId}
			selectOnMove={focusActivationMode === "manual" ? false : undefined}
			setSelectedId={setSelectedId}
		>
			<TabsWrapperContext.Provider value={{ tone, wrapperId }}>
				<div {...rest} ref={forwardedRef}>
					{children}
				</div>
			</TabsWrapperContext.Provider>
		</SkTabs.Root>
	);
}) as PolymorphicForwardRefComponent<"div", WrapperProps>;
DEV: Wrapper.displayName = "Tabs.Wrapper";

// ----------------------------------------------------------------------------

const TabsWrapperContext = React.createContext<
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
	const {
		children,
		value,
		label,
		id: idProp, // ignored by iTwinUI
		...rest
	} = useCompatProps(props);
	const { wrapperId } = useSafeContext(TabsWrapperContext);
	const id = toIdFromValue(value, wrapperId);
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
		id, // ignored by iTwinUI
		...rest
	} = useCompatProps(props);
	const { wrapperId } = useSafeContext(TabsWrapperContext);
	const tabId = toIdFromValue(value, wrapperId);
	return (
		<SkTabs.TabPanel {...rest} tabId={tabId} ref={forwardedRef}>
			{children}
		</SkTabs.TabPanel>
	);
}) as PolymorphicForwardRefComponent<"div", PanelProps>;
DEV: Panel.displayName = "Tabs.Panel";

// ----------------------------------------------------------------------------

/** NOT IMPLEMENTED. */
const TabIcon = React.forwardRef((_props, _forwardedRef) => {
	return null;
}) as PolymorphicForwardRefComponent<
	"span",
	React.ComponentProps<typeof IuiTabs.TabIcon>
>;

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
	/** NOT IMPLEMENTED. */
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

// ----------------------------------------------------------------------------

export { LegacyTab as Tab, Tabs };
