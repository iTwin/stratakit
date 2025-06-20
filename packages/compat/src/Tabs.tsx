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

import { useCompatProps } from "./~utils.tsx";

import type { Tab as IuiTab, Tabs as IuiTabs } from "@itwin/itwinui-react";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type SkTabsProps = React.ComponentProps<typeof SkTabs.Root>;
type IuiTabsLegacyProps = React.ComponentProps<typeof IuiTabs>;

interface TabsProps
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
export const Tabs = React.forwardRef((props, forwardedRef) => {
	const {
		labels,
		onTabSelected,
		activeIndex,
		focusActivationMode,
		color,
		tabsClassName,
		contentClassName,
		wrapperClassName,
		children,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		actions,
		overflowOptions, // ignored by iTwinUI
		orientation,
		type,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

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
			selectOnMove={focusActivationMode === "manual" ? false : undefined}
		>
			<div {...rest} className={cx(wrapperClassName, props.className)}>
				<SkTabs.TabList
					className={tabsClassName}
					ref={forwardedRef}
					tone={color === "green" ? "accent" : undefined}
				>
					{labels.map((label, index) => {
						const tabId = tabIds[index];
						return (
							<TabContext.Provider key={tabId} value={{ id: tabId }}>
								{typeof label === "string" ? <Tab label={label} /> : label}
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
}) as PolymorphicForwardRefComponent<"div", TabsProps>;
DEV: Tabs.displayName = "Tabs";

// ----------------------------------------------------------------------------

type IuiTabLegacyProps = React.ComponentProps<typeof IuiTab>;

interface TabProps
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
export const Tab = React.forwardRef((props, forwardedRef) => {
	const {
		label,
		disabled,

		// biome-ignore-start lint/correctness/noUnusedVariables: NOT IMPLEMENTED
		sublabel,
		startIcon,
		children,
		value,
		// biome-ignore-end lint/correctness/noUnusedVariables: NOT IMPLEMENTED

		...rest
	} = useCompatProps(props);

	const { id } = useSafeContext(TabContext);
	return (
		<SkTabs.Tab {...rest} id={id} disabled={disabled} ref={forwardedRef}>
			{label}
		</SkTabs.Tab>
	);
}) as PolymorphicForwardRefComponent<"button", TabProps>;
DEV: Tab.displayName = "Tab";

// ----------------------------------------------------------------------------

const TabContext = React.createContext<
	| {
			id: string;
	  }
	| undefined
>(undefined);
