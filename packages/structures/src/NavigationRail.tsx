/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Button } from "@ariakit/react/button";
import { Role } from "@ariakit/react/role";
import { Tooltip, VisuallyHidden } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import {
	forwardRef,
	useEventHandlers,
	useSafeContext,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { createStore, useStore } from "zustand";
import { combine } from "zustand/middleware";

import type {
	BaseProps,
	FocusableProps,
} from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

type NavigationRailState = {
	expanded: boolean;
	setExpanded: (expanded: boolean) => void;
};

function createNavigationRailStore(
	initialState: Pick<NavigationRailState, "expanded">,
) {
	return createStore(
		combine(initialState, (set) => ({
			setExpanded: (expanded: boolean) => set({ expanded }),
		})),
	);
}

const NavigationRailContext = React.createContext<
	ReturnType<typeof createNavigationRailStore> | undefined
>(undefined);

type NavigationRailProviderProps = React.PropsWithChildren<
	Required<Pick<NavigationRailRootProps, "defaultExpanded">> &
		Pick<NavigationRailRootProps, "expanded" | "setExpanded">
>;

function NavigationRailProvider(props: NavigationRailProviderProps) {
	const { defaultExpanded, expanded, setExpanded } = props;

	DEV: {
		if (expanded !== undefined && !setExpanded) {
			throw new Error(
				"If you provide the `expanded` prop, you must also provide the `setExpanded` prop.",
			);
		}
	}

	const [store] = React.useState(() =>
		createNavigationRailStore({ expanded: expanded ?? defaultExpanded }),
	);

	React.useEffect(
		function synchronizeWithProps() {
			if (expanded !== undefined) {
				store.setState({ expanded });
			}
		},
		[store, expanded],
	);

	return (
		<NavigationRailContext.Provider value={store}>
			{props.children}
		</NavigationRailContext.Provider>
	);
}

function useNavigationRailState<P>(
	selectorFn: (state: NavigationRailState) => P,
): P {
	const store = useSafeContext(NavigationRailContext);
	return useStore(store, selectorFn);
}

// ----------------------------------------------------------------------------

interface NavigationRailRootInnerProps extends BaseProps<"nav"> {}

interface NavigationRailRootProps extends NavigationRailRootInnerProps {
	/**
	 * The initial expanded state of the `NavigationRail` when it is first rendered.
	 *
	 * This prop is recommended over `expanded` when you don't need to fully control the expanded
	 * state from the outside.
	 *
	 * This prop will be ignored if the `expanded` prop is provided.
	 *
	 * @default false
	 */
	defaultExpanded?: boolean;

	/**
	 * Control whether the `NavigationRail` is expanded or collapsed.
	 *
	 * When `true`, the `NavigationRail` shows both icons and labels for its items.
	 * When `false`, it shows only icons, with labels available as tooltips.
	 *
	 * This prop is optional; if not provided, the `NavigationRail` will manage its own state internally.
	 *
	 * This should be used in conjunction with the `setExpanded` prop to reflect internal state changes.
	 */
	expanded?: boolean;

	/**
	 * Callback that is called when the expanded state of the `NavigationRail` changes.
	 *
	 * This is useful for syncing the internal state of the `NavigationRail` with external state.
	 */
	setExpanded?: (expanded: boolean) => void;
}

/**
 * The `NavigationRail` presents top-level navigation items in a vertical orientation.
 *
 * Example:
 * ```tsx
 * <NavigationRail.Root>
 *   <NavigationRail.Header>
 *     <IconButton label="Home" icon={applicationIcon} href="/" />
 *     <NavigationRail.ToggleButton />
 *   </NavigationRail.Header>
 *
 *   <NavigationRail.Content>
 *     <NavigationRail.List>
 *       <NavigationRail.ListItem>
 *         <NavigationRail.Anchor label="Dashboard" icon={dashboardIcon} href="/dashboard" />
 *       </NavigationRail.ListItem>
 *       <NavigationRail.ListItem>
 *         <NavigationRail.Anchor label="Projects" icon={projectsIcon} href="/projects" />
 *       </NavigationRail.ListItem>
 *       <NavigationRail.ListItem>
 *         <NavigationRail.Anchor label="Reports" icon={reportsIcon} href="/reports" />
 *       </NavigationRail.ListItem>
 *     </NavigationRail.List>
 *
 *     <NavigationRail.Footer>
 *       <NavigationRail.List>
 *         <NavigationRail.ListItem>
 *           <NavigationRail.Button label="Help" icon={helpIcon} onClick={…} />
 *         </NavigationRail.ListItem>
 *         <NavigationRail.ListItem>
 *           <NavigationRail.Button label="Settings" icon={settingsIcon} onClick={…} />
 *         </NavigationRail.ListItem>
 *         <NavigationRail.ListItem>
 *           <NavigationRail.Button label="Profile" icon={userIcon} onClick={…} />
 *         </NavigationRail.ListItem>
 *       </NavigationRail.List>
 *    </NavigationRail.Footer>
 *   </NavigationRail.Content>
 * </NavigationRail.Root>
 * ```
 */
const NavigationRailRoot = forwardRef<"nav", NavigationRailRootProps>(
	(props, forwardedRef) => {
		const { defaultExpanded = false, expanded, setExpanded, ...rest } = props;

		return (
			<NavigationRailProvider
				defaultExpanded={defaultExpanded}
				expanded={expanded}
				setExpanded={setExpanded}
			>
				<NavigationRailRootInner {...rest} ref={forwardedRef} />
			</NavigationRailProvider>
		);
	},
);
DEV: NavigationRailRoot.displayName = "NavigationRail.Root";

const NavigationRailRootInner = forwardRef<"nav", NavigationRailRootInnerProps>(
	(props, forwardedRef) => {
		const expanded = useNavigationRailState((state) => state.expanded);
		return (
			<Role.nav
				{...props}
				className={cx("🥝NavigationRail", props.className)}
				data-_sk-expanded={expanded ? "true" : "false"}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: NavigationRailRootInner.displayName = "NavigationRail.RootInner";

// ----------------------------------------------------------------------------

interface NavigationRailHeaderProps extends BaseProps<"header"> {}

/**
 * `NavigationRail.Header` represents the header (i.e. top) section of the `NavigationRail` and is
 * visually aligned with the page header next to it.
 *
 * Can contain a logo and a `NavigationRail.ToggleButton` to collapse/expand the `NavigationRail`.
 *
 * **Note**: This component is expected to hug the top edge of the page.
 */
const NavigationRailHeader = forwardRef<"nav", NavigationRailHeaderProps>(
	(props, forwardedRef) => {
		const expanded = useNavigationRailState((state) => state.expanded);
		return (
			<Role.header
				{...props}
				className={cx("🥝NavigationRailHeader", props.className)}
				data-_sk-collapsed={!expanded ? "true" : undefined}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: NavigationRailHeader.displayName = "NavigationRail.Header";

// ----------------------------------------------------------------------------

interface NavigationRailToggleButtonProps
	extends Omit<FocusableProps<"button">, "children"> {
	/**
	 * Customize the accessible label of the toggle button.
	 *
	 * @default "Expand navigation".
	 */
	label?: string;
}

/**
 * `NavigationRail.ToggleButton` toggles the expanded/collapsed state of the `NavigationRail`.
 * It is typically placed inside `NavigationRail.Header`, next to the logo.
 *
 * When this button is clicked, it toggles the internal expanded state of the `NavigationRail`,
 * and also calls the `setExpanded` callback prop if provided, to allow syncing with external state.
 */
const NavigationRailToggleButton = forwardRef<
	"button",
	NavigationRailToggleButtonProps
>((props, forwardedRef) => {
	const { label = "Expand navigation", ...rest } = props;

	const expanded = useNavigationRailState((state) => state.expanded);
	const setExpanded = useNavigationRailState((state) => state.setExpanded);

	return (
		<Button
			aria-expanded={expanded ? "true" : "false"}
			{...rest}
			className={cx("🥝NavigationRailToggleButton", props.className)}
			ref={forwardedRef}
			onClick={useEventHandlers(props.onClick, () => setExpanded(!expanded))}
		>
			<svg width="12" height="12" fill="none" aria-hidden="true">
				<path
					fill="currentColor"
					d="M5.405 2.845a.75.75 0 1 0-1.06 1.06L6.439 6 4.345 8.095a.75.75 0 0 0 1.06 1.06L8.03 6.53a.75.75 0 0 0 0-1.06L5.405 2.845Z"
				/>
			</svg>
			<VisuallyHidden>{label}</VisuallyHidden>
		</Button>
	);
});
DEV: NavigationRailToggleButton.displayName = "NavigationRail.ToggleButton";

// ----------------------------------------------------------------------------

interface NavigationRailContentProps extends BaseProps {}

/**
 * `NavigationRail.Content` is a wraps the main content of the `NavigationRail`, including
 * the primary navigation list and an optional footer.
 *
 * Example:
 * ```tsx
 * <NavigationRail.Content>
 *   <NavigationRail.List>…</NavigationRail.List>
 *
 *   <NavigationRail.Footer>
 *     <NavigationRail.List>…</NavigationRail.List>
 *   </NavigationRail.Footer>
 * </NavigationRail.Content>
 * ```
 */
const NavigationRailContent = forwardRef<"div", NavigationRailContentProps>(
	(props, forwardedRef) => {
		return (
			<Role.div
				{...props}
				className={cx("🥝NavigationRailContent", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: NavigationRailContent.displayName = "NavigationRail.Content";

// ----------------------------------------------------------------------------

interface NavigationRailListProps extends BaseProps<"div"> {}

/**
 * The `NavigationRail.List` represents a list of top-level navigation items.
 *
 * It should be used within `NavigationRail.Content` and should contain `NavigationRail.ListItem` elements,
 * which in turn can contain `NavigationRail.Anchor` or `NavigationRail.Button`.
 *
 * Example (with `NavigationRail.Anchor`):
 * ```tsx
 * <NavigationRail.List>
 *   <NavigationRail.ListItem>
 *     <NavigationRail.Anchor label="Home" icon={homeIcon} href="/" />
 *   </NavigationRail.ListItem>
 *   <NavigationRail.ListItem>
 *     <NavigationRail.Anchor label="Projects" icon={projectsIcon} href="/projects" />
 *   </NavigationRail.ListItem>
 * </NavigationRail.List>
 * ```
 *
 * Example (with `NavigationRail.Button`):
 * ```tsx
 * <NavigationRail.List>
 *   <NavigationRail.ListItem>
 *     <NavigationRail.Button label="Help" icon={helpIcon} onClick={…} />
 *   </NavigationRail.ListItem>
 *   <NavigationRail.ListItem>
 *     <NavigationRail.Button label="Settings" icon={settingsIcon} onClick={…}  />
 *   </NavigationRail.ListItem>
 * </NavigationRail.List>
 * ```
 *
 * Multiple `NavigationRail.List` elements can be used together and be separated by a `Divider`.
 */
const NavigationRailList = forwardRef<"div", NavigationRailListProps>(
	(props, forwardedRef) => {
		return (
			<Role
				role="list"
				{...props}
				className={cx("🥝NavigationRailList", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: NavigationRailList.displayName = "NavigationRail.List";

// ----------------------------------------------------------------------------

interface NavigationRailListItemProps extends BaseProps<"div"> {}

/**
 * The `NavigationRail.Item` represents a single navigation list item, which should contain
 * either a `NavigationRail.Anchor` or a `NavigationRail.Button`.
 *
 * Example:
 * ```tsx
 * <NavigationRail.ListItem>
 *   <NavigationRail.Anchor label="Home" icon={homeIcon} href="/" />
 * </NavigationRail.ListItem>
 * // or
 * <NavigationRail.ListItem>
 *   <NavigationRail.Button label="Settings" icon={settingsIcon} onClick={…} />
 * </NavigationRail.ListItem>
 * ```
 *
 * **Note:** This is a non-interactive wrapper element and should not directly handle user interactions.
 */
const NavigationRailListItem = forwardRef<"div", NavigationRailListItemProps>(
	(props, forwardedRef) => {
		return (
			<Role.div
				role="listitem"
				{...props}
				className={cx("🥝NavigationRailListItem", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: NavigationRailListItem.displayName = "NavigationRail.Item";

// ----------------------------------------------------------------------------

interface NavigationRailItemActionOwnProps {
	label: string;
	icon: string | React.JSX.Element;
}

/**
 * This is the base for `NavigationRail.Anchor` and `NavigationRail.Button`.
 * @private
 */
const NavigationRailItemAction = forwardRef<
	"div",
	NavigationRailItemActionOwnProps & FocusableProps
>((props, forwardedRef) => {
	const expanded = useNavigationRailState((state) => state.expanded);

	const { label, icon, ...rest } = props;
	DEV: if (!label || !icon) throw new Error("label and icon are required");

	const action = (
		<Role
			{...rest}
			className={cx("🥝NavigationRailItemAction", props.className)}
			ref={forwardedRef}
		>
			{typeof icon === "string" ? <Icon href={icon} /> : icon}
			<Role.span
				className="🥝NavigationRailItemActionLabel"
				render={!expanded ? <VisuallyHidden /> : undefined}
			>
				{label}
			</Role.span>
		</Role>
	);

	if (!expanded) {
		return (
			<Tooltip content={label} placement="right" type="none">
				{action}
			</Tooltip>
		);
	}

	return action;
});
DEV: NavigationRailItemAction.displayName = "NavigationRail.ItemAction";

// ----------------------------------------------------------------------------

interface NavigationRailAnchorProps
	extends Omit<BaseProps<"a">, "children">,
		NavigationRailItemActionOwnProps {
	/**
	 * Whether the anchor is currently active (i.e. represents the current page).
	 */
	active?: boolean;
}

/**
 * `NavigationRail.Anchor` is used for top-level navigation items that link to major pages.
 *
 * Should be used inside `NavigationRail.ListItem` and must have a short `label` and a recognizable `icon`.
 * The `label` will be shown as a tooltip when the `NavigationRail` is collapsed.
 *
 * Example:
 * ```tsx
 * <NavigationRail.ListItem>
 *   <NavigationRail.Anchor label="Home" icon={homeIcon} href="/" />
 * </NavigationRail.ListItem>
 * ```
 */
const NavigationRailAnchor = forwardRef<"a", NavigationRailAnchorProps>(
	(props, forwardedRef) => {
		const { label, icon, active, ...rest } = props;

		return (
			<NavigationRailItemAction
				label={label}
				icon={icon}
				aria-current={active ? "page" : undefined}
				render={<Role.a {...rest} ref={forwardedRef} />}
			/>
		);
	},
);
DEV: NavigationRailAnchor.displayName = "NavigationRail.Anchor";

// ----------------------------------------------------------------------------

interface NavigationRailButtonProps
	extends Omit<BaseProps<"button">, "children">,
		NavigationRailItemActionOwnProps {}

/**
 * `NavigationRail.Button` is used for actions that do not navigate to a new page, but rather perform
 * an in-page action, such as opening a dialog or menu.
 *
 * Should be used inside `NavigationRail.ListItem` and must have a short `label` and a recognizable `icon`.
 * The `label` will be shown as a tooltip when the `NavigationRail` is collapsed.
 *
 * Example:
 * ```tsx
 * <NavigationRail.ListItem>
 *   <NavigationRail.Button label="Notifications" icon={notificationsIcon} onClick={showNotificationsDialog} />
 * </NavigationRail.ListItem>
 * ```
 */
const NavigationRailButton = forwardRef<"button", NavigationRailButtonProps>(
	(props, forwardedRef) => {
		const { label, icon, ...rest } = props;

		return (
			<NavigationRailItemAction
				label={label}
				icon={icon}
				render={<Role.button {...rest} ref={forwardedRef} />}
			/>
		);
	},
);
DEV: NavigationRailButton.displayName = "NavigationRail.Button";

// ----------------------------------------------------------------------------

interface NavigationRailFooterProps extends BaseProps<"footer"> {}

/**
 * `NavigationRail.Footer` is typically used for grouping secondary actions list near the bottom
 * of the `NavigationRail`, away from the main navigation items.
 *
 * Example:
 * ```tsx
 * <NavigationRail.Content>
 *   <NavigationRail.List>…</NavigationRail.List>
 *
 *   <NavigationRail.Footer>
 *     <NavigationRail.List>…</NavigationRail.List>
 *   </NavigationRail.Footer>
 * </NavigationRail.Content>
 * ```
 */
const NavigationRailFooter = forwardRef<"footer", NavigationRailFooterProps>(
	(props, forwardedRef) => {
		return (
			<Role
				render={<footer />}
				{...props}
				className={cx("🥝NavigationRailFooter", props.className)}
				ref={forwardedRef as React.Ref<HTMLDivElement>}
			/>
		);
	},
);
DEV: NavigationRailFooter.displayName = "NavigationRail.Footer";

// ----------------------------------------------------------------------------

export {
	NavigationRailRoot as Root,
	NavigationRailHeader as Header,
	NavigationRailToggleButton as ToggleButton,
	NavigationRailContent as Content,
	NavigationRailList as List,
	NavigationRailListItem as ListItem,
	NavigationRailButton as Button,
	NavigationRailAnchor as Anchor,
	NavigationRailFooter as Footer,
};
