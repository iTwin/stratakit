/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Tabs as SkTabs } from "@stratakit/structures";
import * as React from "react";
import { useCompatProps } from "./~utils.tsx";

import type { Tabs as IuiTabs } from "@itwin/itwinui-react";
import { useControlledState } from "@stratakit/foundations/secret-internals";
import type { PolymorphicForwardRefComponent } from "./~utils.tsx";

type SkTabsProps = React.ComponentProps<typeof SkTabs.Root>;

type IuiTabsLegacyProps = React.ComponentProps<typeof IuiTabs>;
type IuiTabsOrientation<T extends IuiTabsLegacyProps["orientation"]> = T;
type IuiTabsType<T extends IuiTabsLegacyProps["type"]> = T;

type TabsProps = Pick<
	IuiTabsLegacyProps,
	| "labels"
	| "onTabSelected"
	| "activeIndex"
	| "focusActivationMode"
	| "tabsClassName"
	| "contentClassName"
	| "wrapperClassName"
	| "children"
> & {
	/** NOT IMPLEMENTED. */
	actions?: IuiTabsLegacyProps["actions"];
	labels?: IuiTabsLegacyProps["labels"];
	onTabSelected?: IuiTabsLegacyProps["onTabSelected"];
	activeIndex?: IuiTabsLegacyProps["activeIndex"];
	focusActivationMode?: IuiTabsLegacyProps["focusActivationMode"];
	/**
	 * PARTIALLY IMPLEMENTED.
	 *
	 * - `blue` is mapped to the `neutral` tone of StrataKit.
	 * - `green` is mapped to the `accent` tone of StrataKit.
	 */
	color?: IuiTabsLegacyProps["color"];
	tabsClassName?: IuiTabsLegacyProps["tabsClassName"];
	contentClassName?: IuiTabsLegacyProps["contentClassName"];
	wrapperClassName?: IuiTabsLegacyProps["wrapperClassName"];
	children?: IuiTabsLegacyProps["children"];
	/**
	 * @deprecated Tabs will now overflow by default, so this prop does nothing.
	 */
	overflowOptions?: IuiTabsLegacyProps["overflowOptions"];
	defaultValue?: IuiTabsLegacyProps["defaultValue"];
	defaultChecked?: IuiTabsLegacyProps["defaultChecked"];
} & (
		| {
				/**
				 * Orientation of the tabs.
				 * @default 'horizontal'
				 */
				orientation?: IuiTabsOrientation<"horizontal">;
				/**
				 * Type of the tabs.
				 *
				 * If `orientation = 'vertical'`, `pill` is not applicable.
				 * @default 'default'
				 */
				type?: IuiTabsType<"default" | "borderless" | "pill">;
		  }
		| {
				orientation: IuiTabsOrientation<"vertical">;
				type?: IuiTabsType<"default" | "borderless">;
		  }
	);

/** @see https://itwinui.bentley.com/docs/tabs */
export const Tabs = React.forwardRef((props, forwardedRef) => {
	const {
		actions,
		labels,
		onTabSelected,
		activeIndex,
		focusActivationMode,
		color,
		tabsClassName,
		contentClassName,
		wrapperClassName,
		children,
		...rest
	} = useCompatProps(props);

	const id = React.useId();
	const tabIds = React.useMemo(() => {
		return labels.map((_, index) => `${id}-${index}`);
	}, [labels, id]);
	const handleSetSelectedId = React.useCallback(
		(newId: SkTabsProps["selectedId"]) => {
			const tabIndex = typeof newId === "string" ? tabIds.indexOf(newId) : -1;
			if (tabIndex === -1) return;
			onTabSelected?.(tabIndex);
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
			selectOnMove={focusActivationMode === "manual" ? false : undefined}
		>
			<div className={wrapperClassName} {...rest}>
				<SkTabs.TabList
					className={tabsClassName}
					ref={forwardedRef}
					tone={color === "green" ? "accent" : undefined}
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
}) as PolymorphicForwardRefComponent<"div", TabsProps>;
DEV: Tabs.displayName = "Tabs";
