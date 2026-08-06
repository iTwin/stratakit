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
	useEventHandlers,
	useMergedRefs,
	useSafeContext,
	useStableCallback,
} from "@stratakit/internal-utils/hooks";
import { forwardRef } from "@stratakit/internal-utils/react";
import cx from "classnames";
import { createStore, useStore } from "zustand";
import { combine } from "zustand/middleware";
import { useWarnOnInteractiveDescendants } from "./~hooks.js";
import { useInit } from "./~utils.useInit.js";

import type {
	BaseProps,
	FocusableProps,
} from "@stratakit/internal-utils/props";

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
	const { defaultExpanded, expanded, setExpanded: setExpandedProp } = props;

	DEV: {
		if (expanded !== undefined && !setExpandedProp) {
			throw new Error(
				"If you provide the `expanded` prop, you must also provide the `setExpanded` prop.",
			);
		}
	}

	const [store] = React.useState(() =>
		createNavigationRailStore({ expanded: expanded ?? defaultExpanded }),
	);

	const setExpanded = useStableCallback(setExpandedProp ?? (() => {}));

	React.useEffect(
		function synchronizeWithProps() {
			if (expanded === undefined) return; // Uncontrolled
			store.setState({ expanded, setExpanded }); // Controlled
		},
		[store, expanded, setExpanded],
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
 *     <IconButton label="Home" render={<a href="/" />}>
 *       <Icon href={applicationIcon} />
 *     </IconButton>
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
		useInit();

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
				data-_sk-expanded={expanded ? "true" : undefined}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: NavigationRailRootInner.displayName = "NavigationRailRootInner";

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
				data-_sk-expanded={expanded ? "true" : undefined}
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
			aria-pressed={expanded ? "true" : "false"}
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
 * Multiple `NavigationRail.List` elements can be used together and be separated by a [`Divider`](https://stratakit.bentley.com/docs/components/divider/).
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
DEV: NavigationRailListItem.displayName = "NavigationRail.ListItem";

// ----------------------------------------------------------------------------

type NavigationRailItemActionState = {
	label: React.ReactNode;
	setLabel: (label: React.ReactNode) => void;
	suffix: React.ReactNode;
	setSuffix: (suffix: React.ReactNode) => void;
};

function createNavigationRailItemActionStore() {
	return createStore<NavigationRailItemActionState>((set) => ({
		label: undefined,
		setLabel: (label: React.ReactNode) => set({ label }),
		suffix: undefined,
		setSuffix: (suffix: React.ReactNode) => set({ suffix }),
	}));
}

const NavigationRailItemActionContext = React.createContext<
	ReturnType<typeof createNavigationRailItemActionStore> | undefined
>(undefined);

function NavigationRailItemActionProvider(props: React.PropsWithChildren) {
	const [store] = React.useState(() => createNavigationRailItemActionStore());

	return (
		<NavigationRailItemActionContext.Provider value={store}>
			{props.children}
		</NavigationRailItemActionContext.Provider>
	);
}

function useNavigationRailItemActionState<P>(
	selectorFn: (state: NavigationRailItemActionState) => P,
): P {
	const store = useSafeContext(NavigationRailItemActionContext);
	return useStore(store, selectorFn);
}

// ----------------------------------------------------------------------------

interface NavigationRailItemActionRootInnerProps extends FocusableProps {}

interface NavigationRailItemActionRootProps
	extends NavigationRailItemActionRootInnerProps {}

/** @private */
const NavigationRailItemActionRoot = forwardRef<
	"div",
	NavigationRailItemActionRootProps
>((props, forwardedRef) => {
	return (
		<NavigationRailItemActionProvider>
			<NavigationRailItemActionRootInner {...props} ref={forwardedRef} />
		</NavigationRailItemActionProvider>
	);
});
DEV: NavigationRailItemActionRoot.displayName = "NavigationRailItemActionRoot";

/** @private */
const NavigationRailItemActionRootInner = forwardRef<
	"div",
	NavigationRailItemActionRootInnerProps
>((props, forwardedRef) => {
	const expanded = useNavigationRailState((state) => state.expanded);
	const label = useNavigationRailItemActionState((state) => state.label);
	const suffix = useNavigationRailItemActionState((state) => state.suffix);

	const action = (
		<Role
			{...props}
			className={cx("🥝NavigationRailItemAction", props.className)}
			ref={forwardedRef}
		/>
	);

	if (expanded) return action;
	return (
		<Tooltip
			content={
				<>
					{label}
					{suffix}
				</>
			}
			placement="right"
			type="none"
		>
			{action}
		</Tooltip>
	);
});
DEV: NavigationRailItemActionRootInner.displayName =
	"NavigationRailItemActionRootInner";

// ----------------------------------------------------------------------------

interface NavigationRailItemActionOwnProps {
	/**
	 * Label for the navigation item action.
	 *
	 * Exposed as a tooltip when the navigation rail is collapsed.
	 */
	label: string;
	/**
	 * Icon for the navigation item action.
	 *
	 * Can be a URL of an SVG from the `@stratakit/icons` package,
	 * or a custom JSX icon.
	 */
	icon: string | React.JSX.Element;
	/**
	 * Additional non-interactive content displayed at the end of the navigation item action.
	 *
	 * Displayed in a tooltip when the navigation rail is collapsed.
	 *
	 * The suffix is included in the accessible name of the item action.
	 */
	suffix?: React.ReactNode;
}

/**
 * This is the base for `NavigationRail.Anchor` and `NavigationRail.Button`.
 * @private
 */
const NavigationRailItemAction = forwardRef<
	"div",
	NavigationRailItemActionOwnProps & FocusableProps
>((props, forwardedRef) => {
	const { label, icon, suffix, ...rest } = props;
	DEV: if (!label || !icon) throw new Error("label and icon are required");

	return (
		<NavigationRailItemActionRoot {...rest} ref={forwardedRef}>
			<NavigationRailItemActionIcon icon={icon} />
			<NavigationRailItemActionLabel>{label}</NavigationRailItemActionLabel>

			{suffix && (
				<NavigationRailItemActionSuffix>
					{suffix}
				</NavigationRailItemActionSuffix>
			)}
		</NavigationRailItemActionRoot>
	);
});
DEV: NavigationRailItemAction.displayName = "NavigationRailItemAction";

// ----------------------------------------------------------------------------

interface NavigationRailItemActionIconProps extends BaseProps<"svg"> {
	icon: string | React.JSX.Element;
}

/** @private */
const NavigationRailItemActionIcon = forwardRef<
	"svg",
	NavigationRailItemActionIconProps
>((props, forwardedRef) => {
	const { icon, ...rest } = props;

	return (
		<Icon
			size="large"
			href={typeof icon === "string" ? icon : undefined}
			render={React.isValidElement(icon) ? icon : undefined}
			{...rest}
			className={cx("🥝NavigationRailItemActionIcon", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: NavigationRailItemActionIcon.displayName = "NavigationRailItemActionIcon";

// ----------------------------------------------------------------------------

interface NavigationRailItemActionLabelProps extends BaseProps<"span"> {}

/** @private */
const NavigationRailItemActionLabel = forwardRef<
	"span",
	NavigationRailItemActionLabelProps
>((props, forwardedRef) => {
	const expanded = useNavigationRailState((state) => state.expanded);
	const setLabel = useNavigationRailItemActionState((state) => state.setLabel);

	React.useEffect(() => {
		setLabel(props.children);
	}, [props.children, setLabel]);

	return (
		<Role.span
			{...props}
			className={cx("🥝NavigationRailItemActionLabel", props.className)}
			render={
				expanded ? props.render : <VisuallyHidden render={props.render} />
			}
			ref={forwardedRef}
		/>
	);
});
DEV: NavigationRailItemActionLabel.displayName =
	"NavigationRailItemActionLabel";

// ----------------------------------------------------------------------------

interface NavigationRailItemActionSuffixProps extends BaseProps<"span"> {}

/** @private */
const NavigationRailItemActionSuffix = forwardRef<
	"span",
	NavigationRailItemActionSuffixProps
>((props, forwardedRef) => {
	const expanded = useNavigationRailState((state) => state.expanded);
	const setSuffix = useNavigationRailItemActionState(
		(state) => state.setSuffix,
	);

	React.useEffect(() => {
		setSuffix(props.children);
	}, [props.children, setSuffix]);

	const ref = React.useRef<HTMLElement>(undefined);
	DEV: useWarnOnInteractiveDescendants(
		ref,
		`NavigationRail: interactive elements (e.g. buttons or links) should not be used in the "suffix" prop of "NavigationRail.Anchor" and "NavigationRail.Button". If you have a use case for trailing actions, please open an issue: https://github.com/iTwin/stratakit/issues`,
	);

	return (
		<Role.span
			{...props}
			className={cx("🥝NavigationRailItemActionSuffix", props.className)}
			render={
				expanded ? props.render : <VisuallyHidden render={props.render} />
			}
			ref={useMergedRefs(forwardedRef, ref)}
		/>
	);
});
DEV: NavigationRailItemActionSuffix.displayName =
	"NavigationRailItemActionSuffix";

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
		const { label, icon, suffix, active, ...rest } = props;

		return (
			<NavigationRailItemAction
				label={label}
				icon={icon}
				suffix={suffix}
				aria-current={active ? "true" : undefined}
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
		const { label, icon, suffix, ...rest } = props;

		return (
			<NavigationRailItemAction
				label={label}
				icon={icon}
				suffix={suffix}
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
	NavigationRailAnchor as Anchor,
	NavigationRailButton as Button,
	NavigationRailContent as Content,
	NavigationRailFooter as Footer,
	NavigationRailHeader as Header,
	NavigationRailList as List,
	NavigationRailListItem as ListItem,
	NavigationRailRoot as Root,
	NavigationRailToggleButton as ToggleButton,
};
