/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Button as ButtonAk } from "@ariakit/react/button";
import {
	Menu,
	MenuButton,
	MenuGroup,
	MenuGroupLabel,
	MenuItem,
	MenuItemCheckbox,
	MenuProvider,
	useMenuContext,
	useMenuStore,
} from "@ariakit/react/menu";
import { useStoreState } from "@ariakit/react/store";
import { Button, Kbd, Text } from "@stratakit/bricks";
import {
	DisclosureArrow,
	Dot,
	predefinedSymbols,
} from "@stratakit/bricks/secret-internals";
import { Icon } from "@stratakit/foundations";
import {
	forwardRef,
	usePopoverApi,
	useSafeContext,
	useUnreactiveCallback,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { Checkmark, ChevronRight } from "./~utils.icons.js";
import * as ListItem from "./~utils.ListItem.js";
import { useInit } from "./~utils.useInit.js";

import type {
	MenuItemCheckboxProps,
	MenuProviderProps,
	MenuStore,
} from "@ariakit/react/menu";
import type { PredefinedSymbol } from "@stratakit/bricks/secret-internals";
import type {
	AnyString,
	BaseProps,
	FocusableProps,
} from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface DropdownMenuProps
	extends Pick<
		MenuProviderProps,
		"children" | "placement" | "open" | "setOpen" | "defaultOpen"
	> {}

/**
 * A dropdown menu displays a list of actions or commands when the menu button is clicked.
 *
 * `DropdownMenu` is a compound component with subcomponents exposed for different parts.
 *
 * Example:
 * ```tsx
 * <DropdownMenu.Provider>
 *   <DropdownMenu.Button>Actions</DropdownMenu.Button>
 *
 *   <DropdownMenu.Content>
 *     <DropdownMenu.Item label="Add" />
 *     <DropdownMenu.Item label="Edit" />
 *     <DropdownMenu.Item label="Delete" />
 *   </DropdownMenu.Content>
 * </DropdownMenu.Provider>
 * ```
 *
 * **Note**: `DropdownMenu` should not be used for navigation; it is only intended for actions.
 */
function DropdownMenuProvider(props: DropdownMenuProps) {
	useInit();

	const { children, placement, open, setOpen, defaultOpen } = props;

	return (
		<MenuProvider
			defaultOpen={defaultOpen}
			open={open}
			placement={placement}
			setOpen={setOpen}
		>
			{children}
		</MenuProvider>
	);
}
DEV: DropdownMenuProvider.displayName = "DropdownMenu.Provider";

// ----------------------------------------------------------------------------

interface DropdownMenuContentProps extends FocusableProps {}

/**
 * The actual "menu" portion containing the items shown within the dropdown.
 *
 * Should be used as a child of `DropdownMenu.Provider`.
 *
 * Should include one or more of `DropdownMenu.Item`, `DropdownMenu.CheckboxItem` and `DropdownMenu.Group` as direct descendants.
 */
const DropdownMenuContent = forwardRef<"div", DropdownMenuContentProps>(
	(props, forwardedRef) => {
		const context = useMenuContext();
		const open = useStoreState(context, "open");
		const popoverElement = useStoreState(context, "popoverElement");
		const setOpen = useUnreactiveCallback(context?.setOpen);

		const popoverProps = usePopoverApi({
			element: popoverElement,
			open,
			setOpen,
		});

		return (
			<Menu
				portal
				unmountOnHide
				{...props}
				gutter={4}
				style={{ ...popoverProps.style, ...props.style }}
				wrapperProps={{ popover: popoverProps.popover }}
				className={cx("🥝DropdownMenu", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DropdownMenuContent.displayName = "DropdownMenu.Content";

// ----------------------------------------------------------------------------

interface DropdownMenuButtonProps extends FocusableProps<"button"> {}

/**
 * The button that triggers the dropdown menu to open. Should be used as a child of `DropdownMenu.Provider`.
 *
 * Example:
 * ```tsx
 * <DropdownMenu.Button>Actions</DropdownMenu.Button>
 * ```
 *
 * By default it will render a solid `Button` with a disclosure arrow. This can be
 * customized by passing a `render` prop.
 *
 * ```tsx
 * <DropdownMenu.Button
 *   render={<IconButton variant="ghost" label="More" icon={<Icon href={…} />} />}
 * />
 * ```
 */
const DropdownMenuButton = forwardRef<"button", DropdownMenuButtonProps>(
	(props, forwardedRef) => {
		const { accessibleWhenDisabled = true, children, ...rest } = props;

		const open = useStoreState(useMenuContext(), "open");

		return (
			<MenuButton
				accessibleWhenDisabled
				{...rest}
				render={
					props.render ?? (
						<Button accessibleWhenDisabled={accessibleWhenDisabled}>
							{children}
							<DisclosureArrow />
						</Button>
					)
				}
				className={cx("🥝DropdownMenuButton", props.className)}
				data-has-popover-open={open || undefined}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DropdownMenuButton.displayName = "DropdownMenu.Button";

// ----------------------------------------------------------------------------

interface DropdownMenuItemProps
	extends Omit<FocusableProps<"button">, "children">,
		Partial<
			Pick<DropdownMenuItemShortcutsProps, "shortcuts"> &
				Pick<DropdownMenuIconProps, "icon">
		> {
	/** The primary text label for the menu-item. */
	label: React.ReactNode;

	/** Dot shown on the right end of the menu-item. Value will be used as accessible description. */
	unstable_dot?: string;

	/**
	 * The submenu to display when the item is activated. Must be a `DropdownMenu.Submenu` component.
	 */
	submenu?: React.ReactNode;
}

/**
 * A single menu item within the dropdown menu. Should be used as a child of `DropdownMenu.Content` and `DropdownMenu.Submenu`.
 *
 * Example:
 * ```tsx
 * <DropdownMenu.Item label="Add" />
 * <DropdownMenu.Item label="Edit" />
 * ```
 *
 * Use the `submenu` prop to display a submenu.
 *
 * Example:
 * ```tsx
 * <DropdownMenu.Item
 *   label="More"
 *   submenu={
 *     <DropdownMenu.Submenu>
 *       <DropdownMenu.Item label="Add" />
 *       <DropdownMenu.Item label="Edit" />
 *     </DropdownMenu.Submenu>
 *   }
 * />
 * ```
 */
const DropdownMenuItem = forwardRef<"button", DropdownMenuItemProps>(
	(props, forwardedRef) => {
		const { label, shortcuts, icon, unstable_dot, submenu, ...rest } = props;

		const dotId = React.useId();

		const defaultSubmenuStore = useMenuStore();
		const [submenuStore, setSubmenuStore] = React.useState<MenuStore>();
		const store = submenuStore ?? defaultSubmenuStore;
		const open = useStoreState(store, "open");

		return (
			<>
				<MenuItem
					accessibleWhenDisabled
					render={
						<ListItem.Root
							render={
								<ButtonAk
									accessibleWhenDisabled
									aria-describedby={dotId}
									{...rest}
									render={
										submenu ? (
											<MenuButton
												render={props.render ?? <button />}
												store={store}
											/>
										) : (
											props.render
										)
									}
									className={cx("🥝DropdownMenuItem", props.className)}
									data-has-popover-open={open || undefined}
									ref={forwardedRef}
								/>
							}
						/>
					}
				>
					{icon ? <DropdownMenuIcon icon={icon} /> : null}
					<ListItem.Content render={<span />}>{label}</ListItem.Content>
					{shortcuts ? (
						<DropdownMenuItemShortcuts shortcuts={shortcuts} />
					) : null}
					{unstable_dot ? (
						<ListItem.Decoration
							render={
								<Dot id={dotId} className="🥝DropdownMenuItemDot">
									{unstable_dot}
								</Dot>
							}
						/>
					) : null}
					{submenu ? (
						<ListItem.Decoration
							className="🥝DropdownMenuItemChevron"
							render={<ChevronRight />}
						/>
					) : null}
				</MenuItem>
				<DropdownMenuSubmenuContext.Provider
					value={React.useMemo(() => ({ setStore: setSubmenuStore }), [])}
				>
					{submenu}
				</DropdownMenuSubmenuContext.Provider>
			</>
		);
	},
);
DEV: DropdownMenuItem.displayName = "DropdownMenu.Item";

// ----------------------------------------------------------------------------

interface DropdownMenuItemShortcutsProps
	extends Omit<BaseProps<"span">, "children"> {
	/**
	 * A string defining the keyboard shortcut(s) associated with the menu item.
	 *
	 * ```tsx
	 * shortcuts="S" // A single key shortcut
	 * ```
	 *
	 * Multiple keys should be separated by the `+` character. If one of the keys is
	 * recognized as a symbol name or a modifier key, it will be displayed as a symbol.
	 *
	 * ```tsx
	 * shortcuts="Control+Enter" // A multi-key shortcut, displayed as "Ctrl ⏎"
	 * ```
	 */
	shortcuts: AnyString | `${PredefinedSymbol}+${AnyString}`;
}

const DropdownMenuItemShortcuts = forwardRef<
	"span",
	DropdownMenuItemShortcutsProps
>((props, forwardedRef) => {
	const { shortcuts, ...rest } = props;

	const shortcutKeys = React.useMemo(() => {
		return shortcuts.split("+").map((key) => ({
			key: key.trim(),
			isSymbol: key in predefinedSymbols,
		}));
	}, [shortcuts]);

	return (
		<ListItem.Decoration
			render={<span />}
			{...rest}
			className={cx("🥝DropdownMenuItemShortcuts", props.className)}
			ref={forwardedRef}
		>
			{shortcutKeys.map(({ key, isSymbol }, index) => {
				if (isSymbol) {
					return (
						<Kbd
							variant="ghost"
							key={`${key + index}`}
							symbol={key as PredefinedSymbol}
						/>
					);
				}

				return (
					<Kbd variant="ghost" key={`${key + index}`}>
						{key}
					</Kbd>
				);
			})}
		</ListItem.Decoration>
	);
});
DEV: DropdownMenuItemShortcuts.displayName = "DropdownMenuItemShortcuts";

// ----------------------------------------------------------------------------

interface DropdownMenuIconProps extends BaseProps<"svg"> {
	/**
	 * An optional icon displayed before the menu-item label.
	 *
	 * Can be a URL of an SVG from the `@stratakit/icons` package,
	 * or a custom JSX icon.
	 */
	icon?: string | React.JSX.Element;
}

const DropdownMenuIcon = forwardRef<"svg", DropdownMenuIconProps>(
	(props, forwardedRef) => {
		const { icon, ...rest } = props;

		return (
			<ListItem.Decoration
				render={
					<Icon
						href={typeof icon === "string" ? icon : undefined}
						render={React.isValidElement(icon) ? icon : undefined}
						{...rest}
						ref={forwardedRef}
					/>
				}
			/>
		);
	},
);
DEV: DropdownMenuIcon.displayName = "DropdownMenuIcon";

// ----------------------------------------------------------------------------

interface DropdownMenuCheckboxItemProps
	extends Omit<FocusableProps<"button">, "onChange" | "children" | "name">,
		Pick<
			MenuItemCheckboxProps,
			"defaultChecked" | "checked" | "onChange" | "name" | "value"
		>,
		Pick<DropdownMenuItemProps, "label" | "icon"> {}

/**
 * A single checkbox menu item within the dropdown menu. Should be used as a child of `DropdownMenu.Content` and `DropdownMenu.Submenu`.
 *
 * Example:
 * ```tsx
 * <DropdownMenu.CheckboxItem name="add" label="Add" />
 * <DropdownMenu.CheckboxItem name="edit" label="Edit" />
 * ```
 */
const DropdownMenuCheckboxItem = forwardRef<
	"button",
	DropdownMenuCheckboxItemProps
>((props, forwardedRef) => {
	const {
		label,
		icon,
		defaultChecked,
		checked,
		onChange,
		name,
		value = defaultChecked ? "on" : undefined, // For defaultChecked to work
		...rest
	} = props;

	return (
		<MenuItemCheckbox
			accessibleWhenDisabled
			defaultChecked={defaultChecked}
			checked={checked}
			name={name}
			value={value}
			onChange={onChange}
			render={
				<ListItem.Root
					render={
						<ButtonAk
							accessibleWhenDisabled
							{...rest}
							className={cx("🥝DropdownMenuItem", props.className)}
							ref={forwardedRef}
						/>
					}
				/>
			}
		>
			{icon ? <DropdownMenuIcon icon={icon} /> : null}
			<ListItem.Content render={<span />}>{label}</ListItem.Content>
			<ListItem.Decoration
				render={<Checkmark className="🥝DropdownMenuCheckmark" />}
			/>
		</MenuItemCheckbox>
	);
});
DEV: DropdownMenuCheckboxItem.displayName = "DropdownMenu.CheckboxItem";

// ----------------------------------------------------------------------------

const DropdownMenuSubmenuContext = React.createContext<
	| {
			setStore: (store: MenuStore | undefined) => void;
	  }
	| undefined
>(undefined);

interface DropdownMenuSubmenuProps extends FocusableProps {}

/**
 * The submenu portion containing the nested submenu items.
 *
 * Should be passed into the `submenu` prop of `DropdownMenu.Item`.
 *
 * Should include one or more of `DropdownMenu.Item`, `DropdownMenu.CheckboxItem` and `DropdownMenu.Group` as direct descendants.
 */
const DropdownMenuSubmenu = forwardRef<"div", DropdownMenuSubmenuProps>(
	(props, forwardedRef) => {
		const { setStore } = useSafeContext(DropdownMenuSubmenuContext);

		// Synchronize the submenu store with the submenu item.
		const store = useMenuStore();
		React.useEffect(() => {
			setStore(store);
			return () => setStore(undefined);
		}, [store, setStore]);

		const parent = useMenuContext();
		const popoverElement = useStoreState(parent, "popoverElement");
		const portalElement = React.useCallback(() => {
			if (!popoverElement?.isConnected) return null;
			return popoverElement;
		}, [popoverElement]);

		return (
			<MenuProvider store={store}>
				<Menu
					store={store}
					portal
					portalElement={portalElement}
					preserveTabOrder={false}
					{...props}
					gutter={2}
					shift={-4}
					className={cx("🥝DropdownMenu", props.className)}
					ref={forwardedRef}
				/>
			</MenuProvider>
		);
	},
);
DEV: DropdownMenuSubmenu.displayName = "DropdownMenu.Submenu";

// ----------------------------------------------------------------------------

interface DropdownMenuGroupProps extends Omit<BaseProps, "children"> {
	/** The text label for the menu-group. */
	label: string;
	/**
	 * The menu items within the group.
	 *
	 * Should be an array of `DropdownMenu.Item` and/or `DropdownMenu.CheckboxItem` elements.
	 */
	items: React.JSX.Element[];
}

/**
 * A group of menu items within the dropdown menu. Should be used as a child of `DropdownMenu.Content` and `DropdownMenu.Submenu`.
 *
 * Example:
 * ```tsx
 * <DropdownMenu.Group
 * 	label="Manage"
 * 	items={[
 *   <DropdownMenu.Item key="add" label="Add" />,
 *   <DropdownMenu.Item key="edit" label="Edit" />
 * 	]}
 * />
 * ```
 */
const DropdownMenuGroup = forwardRef<"div", DropdownMenuGroupProps>(
	(props, forwardedRef) => {
		const { label, items, ...rest } = props;
		return (
			<MenuGroup
				{...rest}
				className={cx("🥝DropdownMenuGroup", props.className)}
				ref={forwardedRef}
			>
				<MenuGroupLabel
					className="🥝DropdownMenuGroupLabel"
					render={<Text variant="body-sm" />}
				>
					{label}
				</MenuGroupLabel>
				{items}
			</MenuGroup>
		);
	},
);
DEV: DropdownMenuGroup.displayName = "DropdownMenu.Group";

// ----------------------------------------------------------------------------

export {
	DropdownMenuProvider as Provider,
	DropdownMenuButton as Button,
	DropdownMenuContent as Content,
	DropdownMenuItem as Item,
	DropdownMenuCheckboxItem as CheckboxItem,
	DropdownMenuSubmenu as Submenu,
	DropdownMenuGroup as Group,
};
