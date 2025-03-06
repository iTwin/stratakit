/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as ListItem from "./ListItem.js";
import { Button } from "./Button.js";
import { Kbd } from "./Kbd.js";
import { Checkmark, DisclosureArrow } from "./Icon.js";
import {
	forwardRef,
	type AnyString,
	type BaseProps,
	type FocusableProps,
} from "./~utils.js";
import { usePopoverApi } from "./~hooks.js";
import {
	MenuProvider,
	useMenuContext,
	Menu,
	MenuButton,
	MenuItem,
	MenuItemCheckbox,
	type MenuItemCheckboxProps,
	type MenuProviderProps,
} from "@ariakit/react/menu";
import { predefinedSymbols, type PredefinedSymbol } from "./Kbd.internal.js";

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
 * <DropdownMenu.Root>
 *   <DropdownMenu.Button>Actions</DropdownMenu.Button>
 *
 *   <DropdownMenu.Content>
 *     <DropdownMenu.Item label="Add" />
 *     <DropdownMenu.Item label="Edit" />
 *     <DropdownMenu.Item label="Delete" />
 *   </DropdownMenu.Content>
 * </DropdownMenu.Root>
 * ```
 *
 * **Note**: `DropdownMenu` should not be used for navigation; it is only intended for actions.
 */
function DropdownMenu(props: DropdownMenuProps) {
	const {
		children,
		placement,
		open: openProp,
		setOpen: setOpenProp,
		defaultOpen: defaultOpenProp,
	} = props;

	return (
		<MenuProvider
			placement={placement}
			defaultOpen={defaultOpenProp}
			open={openProp}
			setOpen={setOpenProp}
		>
			{children}
		</MenuProvider>
	);
}
DEV: DropdownMenu.displayName = "DropdownMenu.Root";

// ----------------------------------------------------------------------------

interface DropdownMenuContentProps extends FocusableProps {}

/**
 * The actual "menu" portion containing the items shown within the dropdown.
 *
 * Should be used as a child of `DropdownMenu.Root`.
 */
const DropdownMenuContent = forwardRef<"div", DropdownMenuContentProps>(
	(props, forwardedRef) => {
		const popover = usePopoverApi(useMenuContext());

		return (
			<Menu
				portal={popover.portal}
				unmountOnHide
				{...props}
				gutter={4}
				style={{ ...popover.style, ...props.style }}
				wrapperProps={popover.wrapperProps}
				className={cx("🥝-dropdown-menu", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DropdownMenuContent.displayName = "DropdownMenu.Content";

// ----------------------------------------------------------------------------

interface DropdownMenuButtonProps extends FocusableProps<"button"> {}

/**
 * The button that triggers the dropdown menu to open.  Should be used as a child of `DropdownMenu.Root`.
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
 *   render={<IconButton variant="ghost" label="More" icon={<Icon href={…} />}  />}
 * />
 * ```
 */
const DropdownMenuButton = forwardRef<"button", DropdownMenuButtonProps>(
	(props, forwardedRef) => {
		const { accessibleWhenDisabled = true, children, ...rest } = props;
		return (
			<MenuButton
				accessibleWhenDisabled
				render={
					<Button accessibleWhenDisabled={accessibleWhenDisabled}>
						{children}
						<DisclosureArrow />
					</Button>
				}
				{...rest}
				className={cx("🥝-dropdown-menu-button", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DropdownMenuButton.displayName = "DropdownMenu.Button";

// ----------------------------------------------------------------------------

interface DropdownMenuItemProps
	extends Omit<FocusableProps, "children">,
		Partial<Pick<DropdownMenuItemShortcutsProps, "shortcuts">> {
	/** The primary text label for the menu-item. */
	label: React.ReactNode;
}

/**
 * A single menu item within the dropdown menu. Should be used as a child of `DropdownMenu.Content`.
 *
 * Example:
 * ```tsx
 * <DropdownMenu.Item label="Add" />
 * <DropdownMenu.Item label="Edit" />
 * ```
 */
const DropdownMenuItem = forwardRef<"div", DropdownMenuItemProps>(
	(props, forwardedRef) => {
		const { label, shortcuts, ...rest } = props;

		return (
			<MenuItem
				accessibleWhenDisabled
				{...rest}
				render={<ListItem.Root render={props.render} />}
				className={cx("🥝-dropdown-menu-item", props.className)}
				ref={forwardedRef}
			>
				<ListItem.Content>{label}</ListItem.Content>
				{shortcuts ? <DropdownMenuItemShortcuts shortcuts={shortcuts} /> : null}
			</MenuItem>
		);
	},
);
DEV: DropdownMenuItem.displayName = "DropdownMenu.Item";

// ----------------------------------------------------------------------------

interface DropdownMenuItemShortcutsProps extends BaseProps {
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
	"div",
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
			{...rest}
			className={cx("🥝-dropdown-menu-item-shortcuts", props.className)}
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

interface DropdownMenuCheckboxItemProps
	extends Omit<FocusableProps, "onChange" | "children">,
		Pick<MenuItemCheckboxProps, "checked" | "onChange" | "name" | "value"> {
	/** The primary text label for the menu-item. */
	label: React.ReactNode;
}

/**
 * A single menu item within the dropdown menu. Should be used as a child of `DropdownMenu.Content`.
 *
 * Example:
 * ```tsx
 * <DropdownMenu.CheckboxItem name="add" label="Add" />
 * <DropdownMenu.CheckboxItem name="edit" label="Edit" />
 * ```
 */
const DropdownMenuCheckboxItem = forwardRef<
	"div",
	DropdownMenuCheckboxItemProps
>((props, forwardedRef) => {
	const { label, ...rest } = props;

	return (
		<MenuItemCheckbox
			accessibleWhenDisabled
			value={props.defaultChecked ? "on" : undefined} // For defaultChecked to work
			{...rest}
			render={<ListItem.Root render={props.render} />}
			className={cx("🥝-dropdown-menu-item", props.className)}
			ref={forwardedRef}
		>
			<ListItem.Content>{label}</ListItem.Content>
			<ListItem.Decoration
				render={<Checkmark className="🥝-dropdown-menu-checkmark" />}
			/>
		</MenuItemCheckbox>
	);
});
DEV: DropdownMenuCheckboxItem.displayName = "DropdownMenu.CheckboxItem";

// ----------------------------------------------------------------------------

export {
	DropdownMenu as Root,
	DropdownMenuButton as Button,
	DropdownMenuContent as Content,
	DropdownMenuItem as Item,
	DropdownMenuCheckboxItem as CheckboxItem,
};
