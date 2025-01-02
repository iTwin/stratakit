/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import * as Ariakit from "@ariakit/react";
import * as ListItem from "./ListItem.js";
import { Button } from "./Button.js";
import { Kbd } from "./Kbd.js";
import { DisclosureArrow } from "./Icon.js";
import { forwardRef, supportsPopover, type FocusableProps } from "./~utils.js";

// ----------------------------------------------------------------------------

interface DropdownMenuProps
	extends Pick<
		Ariakit.MenuProviderProps,
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
 *     <DropdownMenu.Item>Add</DropdownMenu.Item>
 *     <DropdownMenu.Item>Edit</DropdownMenu.Item>
 *     <DropdownMenu.Item>Delete</DropdownMenu.Item>
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

	const store = Ariakit.useMenuStore();
	const open = Ariakit.useStoreState(store, (state) => state.open);
	const popover = Ariakit.useStoreState(store, (state) => state.popoverElement);

	React.useEffect(
		function syncPopoverWithOpenState() {
			if (popover?.isConnected) {
				popover?.togglePopover?.(open);
			}
		},
		[open, popover],
	);

	return (
		<Ariakit.MenuProvider
			store={store}
			placement={placement}
			defaultOpen={defaultOpenProp}
			open={openProp}
			setOpen={setOpenProp}
		>
			{children}
		</Ariakit.MenuProvider>
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
		return (
			<Ariakit.Menu
				portal={!supportsPopover}
				unmountOnHide
				{...props}
				style={{ zIndex: supportsPopover ? undefined : 9999, ...props.style }}
				wrapperProps={{ popover: "manual" }}
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
			<Ariakit.MenuButton
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

interface DropdownMenuItemProps extends FocusableProps {
	/**
	 * A string defining the keyboard shortcut(s) associated with the menu item.
	 *
	 * ```tsx
	 * shortcuts="S" // A single key shortcut
	 * ```
	 *
	 * Multiple keys should be separated by the '+' character.
	 *
	 * ```tsx
	 * shortcuts="Ctrl+Shift+S" // A multi-key combination
	 * ```
	 */
	shortcuts?: string;
}

/**
 * A single menu item within the dropdown menu. Should be used as a child of `DropdownMenu.Content`.
 *
 * Example:
 * ```tsx
 * <DropdownMenu.Item>Add</DropdownMenu.Item>
 * <DropdownMenu.Item>Edit</DropdownMenu.Item>
 * ```
 */
const DropdownMenuItem = forwardRef<"div", DropdownMenuItemProps>(
	(props, forwardedRef) => {
		const { shortcuts, ...rest } = props;

		const shortcutKeys = React.useMemo(() => {
			return typeof shortcuts === "string"
				? shortcuts.split("+").map((key) => key.trim())
				: [];
		}, [shortcuts]);

		const hasShortcuts = shortcutKeys.length > 0;

		return (
			<Ariakit.MenuItem
				accessibleWhenDisabled
				{...rest}
				render={<ListItem.Root render={props.render} />}
				ref={forwardedRef}
			>
				<ListItem.Content>{props.children}</ListItem.Content>
				{hasShortcuts && (
					<span className={"🥝-dropdown-menu-item-shortcuts"}>
						{shortcutKeys.map((key, index) => (
							<Kbd variant="ghost" key={`${key + index}`}>
								{key}
							</Kbd>
						))}
					</span>
				)}
			</Ariakit.MenuItem>
		);
	},
);
DEV: DropdownMenuItem.displayName = "DropdownMenu.Item";

// ----------------------------------------------------------------------------

interface DropdownMenuItemCheckboxProps
	extends FocusableProps,
		Pick<Ariakit.MenuItemCheckboxProps, "checked"> {}

/**
 * A single menu item within the dropdown menu. Should be used as a child of `DropdownMenu.Content`.
 *
 * Example:
 * ```tsx
 * <DropdownMenu.ItemCheckbox>Add</DropdownMenu.Item>
 * <DropdownMenu.ItemCheckbox>Edit</DropdownMenu.Item>
 * ```
 */
const DropdownMenuItemCheckbox = forwardRef<
	"div",
	DropdownMenuItemCheckboxProps
>((props, forwardedRef) => {
	const name = React.useId();
	return (
		<Ariakit.MenuItemCheckbox
			accessibleWhenDisabled
			{...props}
			name={name}
			render={<ListItem.Root render={props.render} />}
			className={cx("🥝-dropdown-menu-item-checkbox", props.className)}
			ref={forwardedRef}
		>
			<ListItem.Content>{props.children}</ListItem.Content>
		</Ariakit.MenuItemCheckbox>
	);
});
DEV: DropdownMenuItemCheckbox.displayName = "DropdownMenu.ItemCheckbox";

// ----------------------------------------------------------------------------

export {
	DropdownMenu as Root,
	DropdownMenuButton as Button,
	DropdownMenuContent as Content,
	DropdownMenuItem as Item,
	DropdownMenuItemCheckbox as ItemCheckbox,
};
