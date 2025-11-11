/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useStoreState } from "@ariakit/react/store";
import * as AkTab from "@ariakit/react/tab";
import {
	forwardRef,
	isBrowser,
	useUnreactiveCallback,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";

import type {
	BaseProps,
	FocusableProps,
} from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const supportsAnchorPositioning =
	isBrowser && CSS?.supports?.("anchor-name: --foo");

const prefersReducedMotion = () =>
	isBrowser && window.matchMedia("(prefers-reduced-motion)").matches;

// ----------------------------------------------------------------------------

interface TabsProviderProps
	extends Pick<
		AkTab.TabProviderProps,
		| "defaultSelectedId"
		| "selectedId"
		| "setSelectedId"
		| "selectOnMove"
		| "children"
	> {
	/** @default false */
	selectOnMove?: AkTab.TabProviderProps["selectOnMove"];
}

/**
 * A set of tabs that can be used to switch between different views.
 *
 * `Tabs` is a compound component with subcomponents exposed for different parts.
 *
 * Example:
 * ```tsx
 * <Tabs.Provider>
 *   <Tabs.TabList>
 *     <Tabs.Tab id="tab-1">Tab 1</Tabs.Tab>
 *     <Tabs.Tab id="tab-2">Tab 2</Tabs.Tab>
 *     <Tabs.Tab id="tab-3">Tab 3</Tabs.Tab>
 *   </Tabs.TabList>
 *
 *   <Tabs.TabPanel tabId="tab-1">Tab 1 content</Tabs.TabPanel>
 *   <Tabs.TabPanel tabId="tab-2">Tab 2 content</Tabs.TabPanel>
 *   <Tabs.TabPanel tabId="tab-3">Tab 3 content</Tabs.TabPanel>
 * </Tabs.Provider>
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
function TabsProvider(props: TabsProviderProps) {
	const {
		defaultSelectedId,
		selectedId,
		setSelectedId,
		selectOnMove = false,
		children,
	} = props;

	const store = AkTab.useTabStore({ defaultSelectedId });
	const tablist = useStoreState(store, "baseElement");
	const selectedIdFromStore = useStoreState(store, "selectedId");

	const flipAnimateStripe = (newSelectedId: string | null | undefined) => {
		// Bail if anchor positioning is not supported because the pseudo-element does not exist.
		if (!supportsAnchorPositioning) return;

		const rootNode = tablist?.getRootNode() as Document | ShadowRoot;
		if (!rootNode || !selectedIdFromStore || !newSelectedId) return;

		// Read layout of the previous ("First") and next ("Last") tabs
		const previousTabRect = rootNode
			.getElementById?.(selectedIdFromStore)
			?.getBoundingClientRect();
		const nextTabRect = rootNode
			.getElementById?.(newSelectedId)
			?.getBoundingClientRect();

		if (!previousTabRect || !nextTabRect) return;

		// Calculate deltas ("Invert")
		const deltaX = previousTabRect.left - nextTabRect.left;
		const deltaWidth = previousTabRect.width / nextTabRect.width;

		// Animate the active stripe pseudo-element's `transform` property. ("Play")
		tablist?.animate(
			[
				{ transform: `translateX(${deltaX}px) scaleX(${deltaWidth})` },
				{ transform: "none" },
			],
			{
				pseudoElement: "::after",
				duration: 150,
				easing: "ease-in-out",
			},
		);
	};

	return (
		<AkTab.TabProvider
			store={store}
			selectedId={selectedId}
			setSelectedId={useUnreactiveCallback(
				(newSelectedId: string | null | undefined) => {
					if (!prefersReducedMotion()) flipAnimateStripe(newSelectedId);
					setSelectedId?.(newSelectedId);
				},
			)}
			selectOnMove={selectOnMove}
		>
			{children}
		</AkTab.TabProvider>
	);
}
DEV: TabsProvider.displayName = "Tabs.Provider";

// ----------------------------------------------------------------------------

interface TabListProps extends BaseProps {
	/** @default "neutral" */
	tone?: "neutral" | "accent";
}

/**
 * A simple container for the tab buttons.
 * Should be used as a child of `Tabs.Provider` and consist of the individual `Tabs.Tab` components.
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
			data-_sk-tone={tone}
			className={cx("🥝TabList", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: TabList.displayName = "Tabs.TabList";

// ----------------------------------------------------------------------------

interface TabProps extends Omit<FocusableProps<"button">, "id"> {
	/**
	 * The globally unique id of the tab. This will be used to identify the tab
	 * and connect it to the corresponding `Tabs.TabPanel` via the `tabId`.
	 *
	 * The `selectedId` state of `Tabs.Provider` will also be based on this id.
	 */
	id: string;
}

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
 *
 * Start and end icons can be added by passing `Icon` as children.
 *
 * ```tsx
 * <Tabs.Tab id="tab-1">
 *   <Icon href={…} />
 *   Tab 1
 *   <Icon href={…} />
 * </Tabs.Tab>
 * ```
 */
const Tab = forwardRef<"button", TabProps>((props, forwardedRef) => {
	return (
		<AkTab.Tab
			accessibleWhenDisabled
			{...props}
			className={cx("🥝Tab", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: Tab.displayName = "Tabs.Tab";

// ----------------------------------------------------------------------------

interface TabPanelProps
	extends FocusableProps<"div">,
		Pick<AkTab.TabPanelProps, "unmountOnHide" | "focusable">,
		Required<Pick<AkTab.TabPanelProps, "tabId">> {}

/**
 * The actual content of a tab, shown when the tab is selected. Should be used as a child of `Tabs.Provider`.
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
			className={cx("🥝TabPanel", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: TabPanel.displayName = "Tabs.TabPanel";

// ----------------------------------------------------------------------------

export { TabsProvider as Provider, TabList, Tab, TabPanel };
