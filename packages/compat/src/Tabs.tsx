/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
	useControlledState,
	useSafeContext,
} from "@stratakit/foundations/secret-internals";
import { Tabs as SkTabs } from "@stratakit/structures";
import cx from "classnames";
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
		activeIndex: activeIndexProp,
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

	const valueToIdMap = React.useMemo(() => {
		const idMap = new Map<string, string>();
		for (let i = 0; i < labels.length; i++) {
			const label = labels[i];
			if (
				React.isValidElement<React.ComponentProps<typeof Tab>>(label) &&
				label.props.id
			) {
				// Re-use `id` prop, if available.
				idMap.set(`${i}`, label.props.id);
			}
		}
		return idMap;
	}, [labels]);

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
		<TabValueToIdContext.Provider value={valueToIdMap}>
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
							<LegacyTabContext.Provider key={key} value={{ tabValue }}>
								{typeof label === "string" ? (
									<LegacyTab label={label} />
								) : (
									label
								)}
							</LegacyTabContext.Provider>
						);
					})}
				</TabList>
				<Panel value={value} className={contentClassName}>
					{children}
				</Panel>
			</Wrapper>
		</TabValueToIdContext.Provider>
	);
}) as PolymorphicForwardRefComponent<"div", LegacyTabsProps>;
DEV: LegacyTabs.displayName = "Tabs";

function getLabelKey(label: React.ReactNode, index: number) {
	if (typeof label === "string") {
		return `${index}-${label}`;
	}

	if (React.isValidElement<React.ComponentProps<typeof Tab>>(label)) {
		if (label.props.id) {
			return label.props.id;
		}

		if (label.key) {
			return `${index}-${label.key}`;
		}
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
	startIcon?: IuiTabLegacyProps["startIcon"];
	/** NOT IMPLEMENTED. */
	children?: IuiTabLegacyProps["children"];
	/** NOT IMPLEMENTED. */
	value?: IuiTabLegacyProps["value"];
}

/** @see https://itwinui.bentley.com/docs/tabs#legacy-api */
const LegacyTab = React.forwardRef((props, forwardedRef) => {
	const {
		id,
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
	const valueToId = React.useContext(TabValueToIdContext);
	const wrapperId = React.useId();
	const tone = color === "green" ? "accent" : undefined;

	const defaultSelectedId = defaultValue
		? toIdFromValue(defaultValue, wrapperId, valueToId)
		: undefined;
	const selectedId = value
		? toIdFromValue(value, wrapperId, valueToId)
		: undefined;
	const setSelectedId = React.useCallback<
		NonNullable<SkTabsProps["setSelectedId"]>
	>(
		(newSelectedId) => {
			if (!onValueChange || !newSelectedId) return;

			const newSelectedValue = toValueFromId(
				newSelectedId,
				wrapperId,
				valueToId,
			);
			if (!newSelectedValue) return;

			onValueChange?.(newSelectedValue);
		},
		[onValueChange, wrapperId, valueToId],
	);
	return (
		<SkTabs.Root
			defaultSelectedId={defaultSelectedId}
			selectedId={selectedId}
			selectOnMove={focusActivationMode === "manual" ? false : undefined}
			setSelectedId={setSelectedId}
		>
			<WrapperContext.Provider
				value={React.useMemo(() => ({ tone, wrapperId }), [tone, wrapperId])}
			>
				<div {...rest} ref={forwardedRef}>
					{children}
				</div>
			</WrapperContext.Provider>
		</SkTabs.Root>
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
		id: idProp, // ignored by iTwinUI
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
		id, // ignored by iTwinUI
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

function toIdFromValue(
	value: string,
	wrapperId: string,
	valueToId: Map<string, string>,
) {
	const id = valueToId.get(value);
	if (id) return id;

	return `${wrapperId}-${value}`;
}

function toValueFromId(
	id: string,
	wrapperId: string,
	valueToId: Map<string, string>,
) {
	for (const [value, uniqueId] of valueToId.entries()) {
		if (id === uniqueId) {
			return value;
		}
	}

	if (!id.startsWith(`${wrapperId}-`)) return undefined;
	return id.slice(wrapperId.length + 1); // +1 for the hyphen
}

function useIdFromValue(value: string) {
	const { wrapperId } = useSafeContext(WrapperContext);
	const valueToId = React.useContext(TabValueToIdContext);
	return toIdFromValue(value, wrapperId, valueToId);
}

// ----------------------------------------------------------------------------

// Values that are mapped to unique IDs. This allows consumers to set custom IDs via `LegacyTab`.
const TabValueToIdContext = React.createContext(new Map<string, string>());

// ----------------------------------------------------------------------------

export { LegacyTab as Tab, Tabs };
