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
import { supportsPopover } from "./~utils.js";

// ----------------------------------------------------------------------------

interface DropdownMenuProps
	extends Pick<
		Ariakit.MenuProviderProps,
		"children" | "placement" | "open" | "setOpen" | "defaultOpen"
	> {}

/**
 * Dropdown menu component displays a list of actions or commands.
 *
 * ```tsx
 * <DropdownMenu.Root>
 *		<DropdownMenu.Button>Actions</DropdownMenu.Button>
 *
 *		<DropdownMenu.Content>
 *			<DropdownMenu.Item>Add</DropdownMenu.Item>
 *			<DropdownMenu.Item>Edit</DropdownMenu.Item>
 *			<DropdownMenu.Item>Delete</DropdownMenu.Item>
 *		</DropdownMenu.Content>
 * </DropdownMenu.Root>
 * ```
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
	const open = Ariakit.useStoreState(store, (store) => store.open);
	const popover = Ariakit.useStoreState(store, (store) => store.popoverElement);

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

const DropdownMenuContent = React.forwardRef<
	React.ElementRef<typeof Ariakit.Menu>,
	Ariakit.MenuProps
>((props, forwardedRef) => {
	return (
		<Ariakit.Menu
			portal={!supportsPopover}
			unmountOnHide
			{...props}
			style={{ zIndex: supportsPopover ? undefined : 9999, ...props.style }}
			wrapperProps={{ popover: "manual" } as React.ComponentProps<"div">}
			className={cx("🥝-dropdown-menu", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: DropdownMenuContent.displayName = "DropdownMenu.Content";

// ----------------------------------------------------------------------------

const DropdownMenuButton = React.forwardRef<
	React.ElementRef<typeof Ariakit.MenuButton>,
	Ariakit.MenuButtonProps
>((props, forwardedRef) => {
	const { accessibleWhenDisabled = true, children, ...rest } = props;
	return (
		<Ariakit.MenuButton
			accessibleWhenDisabled={accessibleWhenDisabled}
			render={
				<Button accessibleWhenDisabled={accessibleWhenDisabled}>
					{children}
					<DisclosureArrow />
				</Button>
			}
			{...rest}
			className={cx("🥝-dropdown-menu-button", props.className)}
			ref={forwardedRef as Ariakit.MenuButtonProps["ref"]}
		/>
	);
});
DEV: DropdownMenuButton.displayName = "DropdownMenu.Button";

// ----------------------------------------------------------------------------

interface DropdownMenuItemProps extends Ariakit.MenuItemProps {
	/**
	 * A string defining the keyboard shortcut(s) associated with the menu item.
	 * Shortcuts should be formatted as a single string with keys separated by the '+' character.
	 * For example: "Ctrl+S" or "Alt+Enter".
	 *
	 * @example
	 * // A single shortcut:
	 * shortcuts: "Ctrl+S"
	 *
	 * @example
	 * // A multi-key combination:
	 * shortcuts: "Ctrl+Shift+S"
	 *
	 * @default undefined
	 */
	shortcuts?: string;
}

const DropdownMenuItem = React.forwardRef<
	React.ElementRef<typeof Ariakit.MenuItem>,
	DropdownMenuItemProps
>((props, forwardedRef) => {
	const { shortcuts, ...rest } = props;

	const shortcutKeys =
		typeof shortcuts === "string"
			? shortcuts.split("+").map((key) => key.trim())
			: [];

	const hasShortcuts =
		typeof shortcuts === "string" && shortcuts.trim().length > 0;

	const listItemWithShortCut = cx(props.className, {
		"data-has-shortcuts": hasShortcuts,
	});

	return (
		<Ariakit.MenuItem
			accessibleWhenDisabled
			{...rest}
			render={
				<ListItem.Root render={props.render} className={listItemWithShortCut}>
					<span>{props.children}</span>
					{hasShortcuts && (
						<ListItem.Content>
							{shortcutKeys.map((key, index) => (
								<Kbd variant="ghost" key={`shortcut-${index}-${key}`}>
									{key}
								</Kbd>
							))}
						</ListItem.Content>
					)}
				</ListItem.Root>
			}
			ref={forwardedRef}
		/>
	);
});
DEV: DropdownMenuItem.displayName = "DropdownMenu.Item";

// ----------------------------------------------------------------------------

export {
	DropdownMenu as Root,
	DropdownMenuButton as Button,
	DropdownMenuContent as Content,
	DropdownMenuItem as Item,
};
