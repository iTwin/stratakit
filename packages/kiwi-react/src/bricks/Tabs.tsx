/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from "classnames";
import * as AkTab from "@ariakit/react/tab";
import { type FocusableProps, type BaseProps, forwardRef } from "./~utils.js";

// ----------------------------------------------------------------------------

interface TabsProps
	extends Pick<
		AkTab.TabProviderProps,
		| "defaultSelectedId"
		| "selectedId"
		| "setSelectedId"
		| "selectOnMove"
		| "children"
	> {}

/**
 * A set of tabs that can be used to switch between different views.
 *
 * `Tabs` is a compound component with subcomponents exposed for different parts.
 *
 * Example:
 * ```tsx
 * <Tabs.Root>
 *   <Tabs.TabList>
 *     <Tabs.Tab id="tab-1">Tab 1</Tabs.Tab>
 *     <Tabs.Tab id="tab-2">Tab 2</Tabs.Tab>
 *     <Tabs.Tab id="tab-3">Tab 3</Tabs.Tab>
 *   </Tabs.TabList>
 *
 *   <Tabs.TabPanel tabId="tab-1">Tab 1 content</Tabs.TabPanel>
 *   <Tabs.TabPanel tabId="tab-2">Tab 2 content</Tabs.TabPanel>
 *   <Tabs.TabPanel tabId="tab-3">Tab 3 content</Tabs.TabPanel>
 * </Tabs.Root>
 * ```
 *
 * The tabs and their panels are connected by matching the `id` prop on the `Tabs.Tab` component with
 * the `tabId` prop on the `Tabs.TabPanel` component.
 *
 * The `Tabs` component automatically manages the selected tab state. The initially selected tab can be set using `defaultSelectedId`.
 * To take full control the selected tab state, use the `selectedId` and `setSelectedId` props together.
 *
 * **Note**: `Tabs` should _not_ be used for navigation; it is only intended for switching smaller views within an existing page.
 */
function Tabs(props: TabsProps) {
	const {
		defaultSelectedId,
		selectedId,
		setSelectedId,
		selectOnMove,
		children,
	} = props;

	return (
		<AkTab.TabProvider
			defaultSelectedId={defaultSelectedId}
			selectedId={selectedId}
			setSelectedId={setSelectedId}
			selectOnMove={selectOnMove}
		>
			{children}
		</AkTab.TabProvider>
	);
}
DEV: Tabs.displayName = "Tabs.Root";

// ----------------------------------------------------------------------------

interface TabListProps extends BaseProps {
	/** @default "neutral" */
	tone?: "neutral" | "accent";
}

/**
 * A simple container for the tab buttons.
 * Should be used as a child of `Tabs.Root` and consist of the individual `Tabs.Tab` components.
 *
 * Example:
 * ```tsx
 * <Tabs.TabList>
 *   <Tabs.Tab id="tab-1">Tab 1</Tabs.Tab>
 *   <Tabs.Tab id="tab-2">Tab 2</Tabs.Tab>
 *   <Tabs.Tab id="tab-3">Tab 3</Tabs.Tab>
 * </Tabs.TabList>
 * ```
 */
const TabList = forwardRef<"div", TabListProps>((props, forwardedRef) => {
	const { tone = "neutral", ...rest } = props;

	return (
		<AkTab.TabList
			{...rest}
			data-kiwi-tone={tone}
			className={cx("🥝-tab-list", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: TabList.displayName = "Tabs.TabList";

// ----------------------------------------------------------------------------

interface TabProps
	extends FocusableProps<"button">,
		Pick<AkTab.TabProps, "id"> {}

/**
 * An individual tab button that switches the selected tab panel when clicked.
 *
 * Should be used as a child of `Tabs.TabList` and be paired with a `Tabs.TabPanel`,
 * connected using an id.
 *
 * Example:
 * ```tsx
 * <Tabs.Tab id="tab-1">Tab 1</Tabs.Tab>
 * ```
 */
const Tab = forwardRef<"button", TabProps>((props, forwardedRef) => {
	return (
		<AkTab.Tab
			accessibleWhenDisabled
			{...props}
			className={cx("🥝-tab", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: Tab.displayName = "Tabs.Tab";

// ----------------------------------------------------------------------------

interface TabPanelProps
	extends FocusableProps<"div">,
		Pick<AkTab.TabPanelProps, "tabId" | "unmountOnHide" | "focusable"> {}

/**
 * The actual content of a tab, shown when the tab is selected. Should be used as a child of `Tabs.Root`.
 * The `tabId` prop should match the `id` prop of the corresponding `Tabs.Tab` component.
 *
 * Example:
 * ```tsx
 * <Tabs.TabPanel tabId="tab-1">Tab 1 content</Tabs.TabPanel>
 * ```
 */
const TabPanel = forwardRef<"div", TabPanelProps>((props, forwardedRef) => {
	return (
		<AkTab.TabPanel
			{...props}
			className={cx("🥝-tab-panel", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: TabPanel.displayName = "Tabs.TabPanel";

// ----------------------------------------------------------------------------

export { Tabs as Root, TabList, Tab, TabPanel };
