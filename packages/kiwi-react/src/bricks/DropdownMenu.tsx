/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as ListItem from "./~utils.ListItem.js";
import { Button } from "./Button.js";
import { Button as ButtonAk } from "@ariakit/react/button";
import { Kbd } from "./Kbd.js";
import { Checkmark, DisclosureArrow, Icon } from "./Icon.js";
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
import { useStoreState } from "@ariakit/react/store";
import { predefinedSymbols, type PredefinedSymbol } from "./Kbd.internal.js";
import { DropdownMenuContentContext } from "./DropdownMenu.internal.js";
import { usePopoverContext } from "@ariakit/react/popover";

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
function DropdownMenuRoot(props: DropdownMenuProps) {
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
			popover={usePopoverContext()}
		>
			{children}
		</MenuProvider>
	);
}
DEV: DropdownMenuRoot.displayName = "DropdownMenu.Root";

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
			<DropdownMenuContentContext.Provider value={true}>
				<Menu
					portal
					unmountOnHide
					{...props}
					gutter={4}
					style={{ ...popover.style, ...props.style }}
					wrapperProps={popover.wrapperProps}
					className={cx("🥝-dropdown-menu", props.className)}
					ref={forwardedRef}
				/>
			</DropdownMenuContentContext.Provider>
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

		const open = useStoreState(useMenuContext(), (state) => state?.open);

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
const DropdownMenuItem = forwardRef<"button", DropdownMenuItemProps>(
	(props, forwardedRef) => {
		const { label, shortcuts, icon, ...rest } = props;

		return (
			<MenuItem
				accessibleWhenDisabled
				render={
					<ListItem.Root
						render={
							<ButtonAk
								accessibleWhenDisabled
								{...rest}
								className={cx("🥝-dropdown-menu-item", props.className)}
								ref={forwardedRef}
							/>
						}
					/>
				}
			>
				{icon ? <DropdownMenuIcon icon={icon} /> : null}
				<ListItem.Content render={<span />}>{label}</ListItem.Content>
				{shortcuts ? <DropdownMenuItemShortcuts shortcuts={shortcuts} /> : null}
			</MenuItem>
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

interface DropdownMenuIconProps extends BaseProps<"svg"> {
	/**
	 * An optional icon displayed before the menu-item label.
	 *
	 * Can be a URL of an SVG from the `@itwin/itwinui-icons` package,
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
 * A single menu item within the dropdown menu. Should be used as a child of `DropdownMenu.Content`.
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
							className={cx("🥝-dropdown-menu-item", props.className)}
							ref={forwardedRef}
						/>
					}
				/>
			}
		>
			{icon ? <DropdownMenuIcon icon={icon} /> : null}
			<ListItem.Content render={<span />}>{label}</ListItem.Content>
			<ListItem.Decoration
				render={<Checkmark className="🥝-dropdown-menu-checkmark" />}
			/>
		</MenuItemCheckbox>
	);
});
DEV: DropdownMenuCheckboxItem.displayName = "DropdownMenu.CheckboxItem";

// ----------------------------------------------------------------------------

export {
	DropdownMenuRoot as Root,
	DropdownMenuButton as Button,
	DropdownMenuContent as Content,
	DropdownMenuItem as Item,
	DropdownMenuCheckboxItem as CheckboxItem,
};
